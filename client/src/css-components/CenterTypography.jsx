import React from 'react';
import Typography from '@mui/material/Typography';

function CenterTypography(props) {
  return (
    <Typography 
          variant="body1"
          fontFamily="'Solway', serif"
          display="block"
          lineHeight="1.25"
          margin="10px 10px"
        >
        {props.body}
    </Typography>
  )
}

export default CenterTypography