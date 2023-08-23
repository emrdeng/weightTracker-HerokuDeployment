import React from 'react';
// MATERIAL UI:
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

function BMRFormTitles(props) {
  return (
    <Grid xs={4} className={props.className} sx={{mb:2}}>
        <Typography variant="h7">
          {props.inputLabel}
        </Typography>
      </Grid>
  )
}

export default BMRFormTitles