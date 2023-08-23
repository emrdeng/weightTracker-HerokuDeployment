import Typography from '@mui/material/Typography';
import React from 'react'

function Title(props) {
  return (
    <Typography 
        fontWeight="700"
        fontSize="64px"
        fontFamily="'Solway', serif"
        display="inline-block"
        lineHeight="1.25"
      >
        {props.title}
    </Typography>
  )
}

export default Title;