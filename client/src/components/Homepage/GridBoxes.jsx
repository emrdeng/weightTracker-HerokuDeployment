import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

function GridBoxes(props) {
  return (
    <Grid xs={4} sx={{justifyContent:"center", textAlign: "center", paddingLeft: "5%", paddingRight: "5%"}}>
        <p style={{color:"orange"}}>{props.icon}&nbsp;&nbsp;&nbsp;{props.icon1}</p>
        <Typography 
          fontWeight="700"
          variant="h6"
          fontFamily="'Solway', serif"
          display="block"
          lineHeight="1.25"
        >
        {props.title}
        </Typography>
        <br></br>
        <Typography 
          variant="body1"
          fontFamily="'Solway', serif"
          display="block"
          lineHeight="1.25"
        >
        {props.explanation}
        </Typography>
    </Grid>
  )
}

export default GridBoxes;