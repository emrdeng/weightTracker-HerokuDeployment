import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MonitorWeightOutlinedIcon from '@mui/icons-material/MonitorWeightOutlined';

// REACT ROUTER DOM:
import { Link } from "react-router-dom";

function Navbar() {

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" elevation={0} style={{background: "#262a3b", color: "white"}}>
      <Toolbar>
      <MonitorWeightOutlinedIcon sx={{ 
        fontSize: 40, 
        color: "white" 
        }} 
      />
        <Typography 
          variant="h4" 
          paddingLeft="5px" 
          sx={{ 
            flexGrow: 1, 
            color:"white",
            textDecoration: "none", 
            "&:hover": {color: "white"} }} 
          component={Link} 
          to={"/"} 
        >
          WeightTracker
        </Typography>
        <Button 
          variant="outlined" 
          color="inherit" 
          component={Link} 
          to={"/Login"} 
          sx={{"&:hover": {color: "#ff6733"}}}
        >
        Login
        </Button>
      </Toolbar>
    </AppBar>
  </Box>
);
}

export default Navbar;