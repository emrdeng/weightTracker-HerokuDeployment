import React from 'react';
// THEME PROVIDER:
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// MATERIAL UI:
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';


function RightCalendar(props) {
  const VariousThemes = createTheme({
    palette: {
        boxWhiteColor: {
          main: "#fff"
        },
      },
});

  return (
    <ThemeProvider theme={VariousThemes}>
      <CssBaseline />
      <br></br>
      <Box 
        sx={{
            backgroundColor: "boxWhiteColor.main",
            marginLeft: "0px",
            width: "100%",
            height: "35%",
            mt: 2,
            boxShadow: 1,
            borderRadius: 2
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CalendarPicker 
            date={props.date} 
            onChange={(newDate)=>{props.onChange(newDate)}}
          />
        </LocalizationProvider>
      </Box>
    </ThemeProvider>
  )
}

export default RightCalendar