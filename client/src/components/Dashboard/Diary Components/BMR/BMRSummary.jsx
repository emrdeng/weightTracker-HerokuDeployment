import React from 'react';
// MATERIAL UI:
import Typography from '@mui/material/Typography';

function BMRSummary() {
  return (
    <Typography variant="body2">
        Your basal metabolic rate (BMR) is equivalent to the amount of energy (in the form of calories) that your body needs to function if it were to rest for 24 hours. We factor in your weight, height, age, and sex and use the Harris-Benedict Equation to apply an activity factor to determine your total daily energy expenditure (calories).
    </Typography>
  )
}

export default BMRSummary