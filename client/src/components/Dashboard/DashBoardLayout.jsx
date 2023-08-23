import React from 'react';
// MATERIAL UI:
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Container } from '@mui/material';
// REACT ROUTER DOM:
import { Link } from "react-router-dom";
// ICONS:
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import InsertChartOutlinedTwoToneIcon from '@mui/icons-material/InsertChartOutlinedTwoTone';
import MonitorWeightOutlinedIcon from '@mui/icons-material/MonitorWeightOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
// MENU:
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
// THEME PROVIDER:
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// PAGES IMPORTS:
import HomePage from '../Homepage';

const drawerWidth = 240;

function DashBoardLayout(props) {
    const appBarTheme = createTheme({
      palette: {
        appBarBackgroundColor: {
          main: "#E6E7E5"
        },
      },
      typography: {
        appBarWelcome:{
          fontSize: 45,
          fontFamily: "'Solway', serif",
        }
      },
    });

    // FOR THE DRAWER:
    const menuItems=[
        {
            text: "Diary",
            icon: <EventNoteOutlinedIcon />,
            path: "/dashboard"
        },
        {
            text: "Trends",
            icon: <InsertChartOutlinedTwoToneIcon />,
            path: "/dashboard/trends"
        },
    ]

    // FOR THE APPBAR LOGOUT/ACCOUNT DROWDOWN:
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const logout = () => {
      window.open("http://localhost:5000/auth/logout", "_self");
    };

  return (
    <>
    <ThemeProvider theme={appBarTheme}>
      <CssBaseline />
      
      {/* PERMANENT APPBAR */}
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth,
          backgroundColor: "appBarBackgroundColor.main",
          color: "black",
        }}
      >
        <Toolbar sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <Typography 
              variant="appBarWelcome"
            >
              Welcome!
              <ArrowDropDownIcon fontSize="large" />
            </Typography>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem style={{ backgroundColor: 'transparent', cursor: 'auto' }} nowrap>
              <Avatar sx={{ bgcolor: deepOrange[500], width: "30px", height: "30px" }} >
                <EmojiEmotionsIcon />
              </Avatar>
              <Typography
                sx={{ml:1, fontWeight:"bold"}}
              >
                {props.userEmail}
              </Typography>
            </MenuItem>
            <MenuItem onClick={()=>{handleClose(); logout()}}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar />
    {/* PERMANENT DRAWER */}
    <Drawer
        sx={{
          width: drawerWidth,
          }}
        PaperProps={{
          sx:{
            backgroundColor: "rgba(39, 42, 58, 1)",
            color: "white",
            borderRadius: "0px 10px 10px 0px",
            width: `calc(0.5% + ${drawerWidth}px)`,
            }
        }}
        variant="permanent"
        anchor="left"
    >
        <div>
            <Typography
                variant="h5"
                sx={{
                  width: drawerWidth, 
                  margin: "16px 16px", 
                  color:"white", 
                  textDecoration: "none",
                  boxShadow: "none",
                  "&:hover": {color: "white"}
                }}
                component={Link}
                to={HomePage}
            >
                <MonitorWeightOutlinedIcon sx={{color:"#ff6733", fontSize:"36px"}} /> WeightTracker
            </Typography>
        </div>
        <List>
            {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              
            >
            <ListItemButton component={Link} to={item.path} sx={{color:"white", "&:hover": {color: "#ff6733"}}}>
              <ListItemIcon sx={{color:"white", "&:hover": {color: "#ff6733"}}}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{fontSize:"42"}} />
            </ListItemButton>
            </ListItem>
          ))}
        </List>
    </Drawer>
    </ThemeProvider>

    {/* main content */}
    <Container maxWidth={false} sx={{
            bgcolor:"#FDF6EC", 
            marginLeft: `${drawerWidth}px`,
            width: `calc(100% - ${drawerWidth}px)`, 
            height: "100vh",
            padding: 0,
        }}>
    <div className="contentContainer">
        <div className="contentDiv"></div>
        { props.children }
    </div>
    </Container>
  </>
  )
}

export default DashBoardLayout