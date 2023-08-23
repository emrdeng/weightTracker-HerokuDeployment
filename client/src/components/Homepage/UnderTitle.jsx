import Typography from '@mui/material/Typography';
import React from 'react'

function UnderTitle(props) {
  return (
    <Typography 
        variant="h6"
        fontFamily="'Solway', serif"
        paddingTop="10px"
        paddingBottom="40px"
      >
        {props.title}
    </Typography>
  )
}

export default UnderTitle;