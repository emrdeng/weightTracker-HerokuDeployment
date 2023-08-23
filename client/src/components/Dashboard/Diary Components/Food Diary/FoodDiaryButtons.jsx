import React from 'react';
// MATERIAL UI:
import Stack from '@mui/material/Stack';
// MATERIAL UI BUTTONS:
import { Button } from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';


function FoodDiaryButtons() {
  return (
    <Stack direction="row" spacing={2}>
        <Button 
            sx={{ borderRadius: 10 }}
            startIcon={<RestaurantIcon color="error" />}
            variant="outlined"
            color="error"
        >
        Food
        </Button>
        <Button 
            sx={{ borderRadius: 10 }}
            startIcon={<DirectionsRunIcon />}
            variant="outlined"
        >
        Exercise
        </Button>

    </Stack>
  )
}

export default FoodDiaryButtons