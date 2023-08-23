import React from 'react';
import Typography from '@mui/material/Typography';

function WelcomeTitle(props) {
  return (
    <Typography 
          fontWeight="700"
          variant="h4"
          fontFamily="'Solway', serif"
          display="block"
          lineHeight="1.25"
          marginBottom="40px"
        >
        {props.title}
        </Typography>
  )
}

export default WelcomeTitle