import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import GridBoxes from './GridBoxes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faCarrot, faDumbbell, faChartBar, faPencil, faChartPie } from '@fortawesome/free-solid-svg-icons';

function LittleSummaryBoxes() {
  return (
    <>
        <Grid container spacing={10} sx={{flexGrow: 1, paddingLeft: "5%", paddingRight: "5%", display:"flex"}}>
            <GridBoxes 
                icon=<FontAwesomeIcon icon={faClipboardList} 
                size="3x"
                />
                icon1=<FontAwesomeIcon icon={faPencil} 
                    size="3x"
                />
                title="Track important nutrients and compounds"
                explanation="Keep track of your nutrients in your food diary including carbs, protein, and fat."
            />
            <GridBoxes 
                icon=<FontAwesomeIcon icon={faCarrot} 
                    size="3x"
                />
                icon1=<FontAwesomeIcon icon={faDumbbell} 
                    size="3x"
                />
                title="Log daily meals and exercise in your diary"
                explanation="Ensure you are meeting your caloric and nutritional goals against your weight and BMR."
            />
            <GridBoxes 
                icon=<FontAwesomeIcon icon={faChartBar} 
                    size="3x"
                />
                icon1=<FontAwesomeIcon icon={faChartPie} 
                    size="3x"
                />
                title="Visualize your goals being met"
                explanation="Our charts and reports will help correlate your nutrients and calories over time."
            />
        </Grid>
    </>
        
  )
}

export default LittleSummaryBoxes;