import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function FooterMiniBox() {
  return (
    <Box>
        <Typography 
          variant="body1"
          fontSize="11px"
          fontFamily="'Solway', serif"
          display="block"
          lineHeight=".5"
        >
        <p>Copyright © 2022</p>
        <p>All rights reserved.</p>
        </Typography>
    </Box>
  )
}

export default FooterMiniBox