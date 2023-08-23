import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function SecondContainerMainBox(props) {
  return (
    <Box sx={{display:"block", justifyContent:"center", textAlign: "center", width: "500px"}}>
        <Typography 
          fontWeight="700"
          variant="h3"
          fontFamily="'Solway', serif"
          display="block"
          lineHeight="1.25"
        >
        {props.title}
        </Typography>
        <br></br>
        <Typography 
          variant="body1"
          fontSize="18px"
          fontFamily="'Solway', serif"
          display="block"
          lineHeight="1.25"
        >
        {props.explanation}
        </Typography>
    </Box>
  )
}

export default SecondContainerMainBox;