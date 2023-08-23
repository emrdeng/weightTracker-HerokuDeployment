import React from 'react';
// MATERIAL UI:
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

function ContainerTitles(props) {
  return (
    <Box
        className={props.boxClassName}
        sx={{
          p: 2,
        }}
    >
        <Typography variant="h4">
            {props.title}
        </Typography>
    </Box>
  )
}

export default ContainerTitles