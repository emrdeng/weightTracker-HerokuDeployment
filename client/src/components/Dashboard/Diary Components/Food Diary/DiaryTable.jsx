import React from 'react';
import { useState, useEffect } from 'react';
// MUI CALENDAR:
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
// MATERIAL UI TABLE:
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import TablePagination from '@mui/material/TablePagination';
// MATERIAL UI BUTTONS:
import { Button } from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
// PAGE IMPORT
import EnhancedTableHead from './APITables/enhancedTableHead';

export default function DiaryTable(props) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) {
            return order;
          }
          return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
    }
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        setSelected(props.rows);
        return;
      }
      setSelected([]);
    };

    dayjs.extend(utc)
    
    const handleClick = (event, id, date, row) => {
      if(dayjs(new Date(date)).utc().format('YYYY-MM-DD') !== props.selectedCalendarDate.format('YYYY-MM-DD')){
        setSelected([]);
        props.onSelectionChanged([]);
      } else {
          const selectedIndex = selected.findIndex((selectedRow) => (selectedRow._id === id) &&(selectedRow.date === date));

          let newSelected = [...selected];
        
          if (selectedIndex === -1) {
            newSelected.push(row);
          } else {
            newSelected.splice(selectedIndex, 1);
          }
        
          setSelected(newSelected);
          props.onSelectionChanged(newSelected);
      }
    };

    useEffect(() => {
      if(dayjs(new Date(props.rows[0].date)).utc().format('YYYY-MM-DD') !== props.selectedCalendarDate.format('YYYY-MM-DD')){
        setSelected([]);
      }
    }, [props.selectedCalendarDate]);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const isSelected = (id, date) => selected.findIndex((selectedRow) => (selectedRow._id === id) && (selectedRow.date === date)) !== -1;
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;
  
    return (
      <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer >
            <Table
              // sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size = "small"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={props.rows.length}
                headCells={props.headCells}
              />
              <TableBody>
                {stableSort(props.rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row._id, row.date);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row._id, row.date, row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        id={row._id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.category==="Exercise" ? (<DirectionsRunIcon sx={{color: "#1976d2"}} />) : (<RestaurantIcon color="error" />) }
                        </TableCell>
                        <TableCell align="left">{row.category==="Exercise" ? row.exerciseName : row.foodName}</TableCell>
                        <TableCell align="center">{row.category==="Exercise" ? Math.round(row.duration).toLocaleString() : Math.round(row.grams).toLocaleString()}</TableCell>
                        <TableCell align="center">{row.category==="Exercise" ? "minutes" : "grams"}</TableCell>
                        <TableCell align="center">{row.category==="Exercise" ? Math.round(row.caloriesBurned*-1).toLocaleString() : Math.round(row.calories).toLocaleString()}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 33 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={4} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={props.rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      {selected.length > 0 ? (
        <Box sx={{display:"flex", alignItems:"center", justifyContent: "center", border: "none"}}>
          <Button variant="contained" type="submit" onClick={(event) => { 
            event.preventDefault(); 
            props.onSubmit(selected);
          }}>
            Remove from Diary
          </Button>
        </Box>
      ) : null}
      </>
    );
  }