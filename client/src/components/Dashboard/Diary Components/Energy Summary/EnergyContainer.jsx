import React, {useEffect, useState} from 'react';
// THEME PROVIDER:
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// MATERIAL UI:
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
// MUI TABLE:
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// MUI ICONS:
import ErrorIcon from '@mui/icons-material/Error';
// REACT-CHARTJS:
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from 'react-chartjs-2';
import { TableRow, Typography } from '@mui/material';
// PAGES/COMPONENTS:
import ContainerTitles from '../../../../css-components/ContainerTitles';

ChartJS.register(ArcElement, Tooltip, Legend);

function EnergyContainer(props) {
  const VariousThemes = createTheme({
      palette: {
          boxWhiteColor: {
            main: "#fff"
          },
      },
      typography: {
        fontFamily: "Solway, serif"
      }
  });

  let green="rgba(107, 244, 54, 0.6)";
  let blue = "rgba(54, 162, 235, 0.6)";
  let red = "rgba(255, 99, 132, 0.6)";
  let yellow="rgba(255, 238, 102, 0.6)";
  let purple="rgba(153, 50, 204, 0.6)";
  let orange="rgba(255, 165, 0, 0.6)";
  let grey="rgba(128, 128, 128, 0.6)";
  let greylite="rgba(200, 200, 200, 0.6)";

  let [consumedData, setConsumedData] = useState({});
  let [consumedText, setConsumedText] = useState("");

  useEffect(()=>{
    consumedChart();
    burnedChart();
    sumsChart();
  }, [props.foodDiary, props.oneSelectedFood, props.selectedCalendarDate, props.userBMR, props.totalCaloriesBurned])

  function consumedChart() {
    if (!props.foodDiary) {
      setConsumedData({
        labels: ['0 cal consumed.'],
        datasets: [{
          data: [1],
          backgroundColor: [grey]
        }]
      });
      setConsumedText("0 cal");

    } else if (props.foodDiary && props.foodDiary.length === 0) {
      setConsumedData({
        labels: ['0 cal consumed.'],
        datasets: [{
          data: [1],
          backgroundColor: [grey]
        }]
      });
      setConsumedText("0 cal");
    } else if (props.foodDiary && props.foodDiary.length > 0 && !props.oneSelectedFood) {
      let totalSums = props.totalProtein + props.totalCarbs + props.totalFat;
      let totalOther = (props.totalCaloriesConsumed - (props.totalProtein*4) - (props.totalCarbs*4) - (props.totalFat*9));
      let dataArray=[];
  
      if(totalOther>=0){
        dataArray = [
          props.totalProtein*4, 
          props.totalCarbs*4, 
          props.totalFat*9, 
          totalOther
        ];
        setConsumedData({
          labels: ['Protein', 'Carbs', 'Fat', 'Other'],
          datasets: [{
            data: dataArray,
            backgroundColor: [green,blue,red,yellow]
          }]
        });
      } else{
        dataArray=[
          ((props.totalProtein*4)+((props.totalProtein/totalSums)*totalOther)),
          ((props.totalCarbs*4)+((props.totalCarbs/totalSums)*totalOther)),
          ((props.totalFat*9)+((props.totalFat/totalSums)*totalOther)),
        ];
        setConsumedData({
          labels: ['Protein', 'Carbs', 'Fat'],
          datasets: [{
            data: dataArray,
            backgroundColor: [green,blue,red]
          }]
        });
      }
  
      setConsumedText(`${Math.round(props.totalCaloriesConsumed).toLocaleString()} cal`);

    } else if (props.foodDiary && props.foodDiary.length > 0 && props.oneSelectedFood && props.oneSelectedFood.length === 0) {
      let totalSums = props.totalProtein + props.totalCarbs + props.totalFat;
      let totalOther = (props.totalCaloriesConsumed - (props.totalProtein*4) - (props.totalCarbs*4) - (props.totalFat*9));
      let dataArray=[];
  
      if(totalOther>=0){
        dataArray = [
          props.totalProtein*4, 
          props.totalCarbs*4, 
          props.totalFat*9, 
          totalOther
        ];
        setConsumedData({
          labels: ['Protein', 'Carbs', 'Fat', 'Other'],
          datasets: [{
            data: dataArray,
            backgroundColor: [green,blue,red,yellow]
          }]
        });
      } else{
        dataArray=[
          ((props.totalProtein*4)+((props.totalProtein/totalSums)*totalOther)),
          ((props.totalCarbs*4)+((props.totalCarbs/totalSums)*totalOther)),
          ((props.totalFat*9)+((props.totalFat/totalSums)*totalOther)),
        ];
        setConsumedData({
          labels: ['Protein', 'Carbs', 'Fat'],
          datasets: [{
            data: dataArray,
            backgroundColor: [green,blue,red]
          }]
        });
      }
  
      setConsumedText(`${Math.round(props.totalCaloriesConsumed).toLocaleString()} cal`);

    } else if (props.foodDiary && props.foodDiary.length > 0 && props.oneSelectedFood && props.oneSelectedFood.length === 1 && props.oneSelectedFood[0].category === "Food") {
      let firstFoodItemProtein = (props.oneSelectedFood[0].protein*4);
      let firstFoodItemCarbs = props.oneSelectedFood[0].carbs*4;
      let firstFoodItemFat = props.oneSelectedFood[0].fat*9;
      let firstFoodItemOther = (props.oneSelectedFood[0].calories - (props.oneSelectedFood[0].protein*4) - (props.oneSelectedFood[0].carbs*4) - (props.oneSelectedFood[0].fat*9));
      let firstFoodItemSums = firstFoodItemProtein+firstFoodItemCarbs+firstFoodItemFat;
      let dataArray=[];
  
      if(firstFoodItemOther>=0){
        dataArray=[firstFoodItemProtein, firstFoodItemCarbs, firstFoodItemFat, firstFoodItemOther];
        setConsumedData({
          labels: ['Protein', 'Carbs', 'Fat','Other'],
          datasets: [{
            data: dataArray,
            backgroundColor: [green,blue,red,yellow]
          }]
        });
      } else{
        dataArray=[
          firstFoodItemProtein+((firstFoodItemProtein/firstFoodItemSums)*firstFoodItemOther),
          firstFoodItemCarbs+((firstFoodItemCarbs/firstFoodItemSums)*firstFoodItemOther),
          firstFoodItemFat+((firstFoodItemFat/firstFoodItemSums)*firstFoodItemOther),
        ];
        setConsumedData({
          labels: ['Protein', 'Carbs', 'Fat'],
          datasets: [{
            data: dataArray,
            backgroundColor: [green,blue,red]
          }]
        });
      }

      setConsumedText(`${Math.round(props.oneSelectedFood[0].calories).toLocaleString()} cal`);

    } else if (props.foodDiary && props.foodDiary.length > 0 && props.oneSelectedFood && props.oneSelectedFood.length === 1 && props.oneSelectedFood[0].category !== "Food") {
      let totalSums = props.totalProtein + props.totalCarbs + props.totalFat;
      let totalOther = (props.totalCaloriesConsumed - (props.totalProtein*4) - (props.totalCarbs*4) - (props.totalFat*9));
      let dataArray=[];
  
      if(totalOther>=0){
        dataArray = [
          props.totalProtein*4, 
          props.totalCarbs*4, 
          props.totalFat*9, 
          totalOther
        ];
        setConsumedData({
          labels: ['Protein', 'Carbs', 'Fat', 'Other'],
          datasets: [{
            data: dataArray,
            backgroundColor: [green,blue,red,yellow]
          }]
        });
      } else{
        dataArray=[
          ((props.totalProtein*4)+((props.totalProtein/totalSums)*totalOther)),
          ((props.totalCarbs*4)+((props.totalCarbs/totalSums)*totalOther)),
          ((props.totalFat*9)+((props.totalFat/totalSums)*totalOther)),
        ];
        setConsumedData({
          labels: ['Protein', 'Carbs', 'Fat'],
          datasets: [{
            data: dataArray,
            backgroundColor: [green,blue,red]
          }]
        });
      }
  
      setConsumedText(`${Math.round(props.totalCaloriesConsumed).toLocaleString()} cal`);

    } else if (props.foodDiary && props.foodDiary.length > 0 && props.oneSelectedFood && props.oneSelectedFood.length > 1) {
      let totalSums = props.totalProtein + props.totalCarbs + props.totalFat;
      let totalOther = (props.totalCaloriesConsumed - (props.totalProtein*4) - (props.totalCarbs*4) - (props.totalFat*9));
      let dataArray=[];
  
      if(totalOther>=0){
        dataArray = [
          props.totalProtein*4, 
          props.totalCarbs*4, 
          props.totalFat*9, 
          totalOther
        ];
        setConsumedData({
          labels: ['Protein', 'Carbs', 'Fat', 'Other'],
          datasets: [{
            data: dataArray,
            backgroundColor: [green,blue,red,yellow]
          }]
        });
      } else{
        dataArray=[
          ((props.totalProtein*4)+((props.totalProtein/totalSums)*totalOther)),
          ((props.totalCarbs*4)+((props.totalCarbs/totalSums)*totalOther)),
          ((props.totalFat*9)+((props.totalFat/totalSums)*totalOther)),
        ];
        setConsumedData({
          labels: ['Protein', 'Carbs', 'Fat'],
          datasets: [{
            data: dataArray,
            backgroundColor: [green,blue,red]
          }]
        });
      }
  
      setConsumedText(`${Math.round(props.totalCaloriesConsumed).toLocaleString()} cal`);
    }
  }

  // ///////////////////CALORIES BURNED CHART /////////////////////////////////

  let [burnedData, setBurnedData] = useState({});
  let [burnedText, setBurnedText] = useState("");

  function burnedChart(){
    if((props.userBMR===undefined && props.totalCaloriesBurned===undefined)){
      setBurnedData({
        labels: ['0 cal burned'],
        datasets: [{
          data: [1],
          backgroundColor: [grey]
        }]
      });
      setBurnedText("0 cal");
    } else if(isNaN(props.userBMR + props.totalCaloriesBurned)){
      setBurnedData({
        labels: ['0 cal burned'],
        datasets: [{
          data: [1],
          backgroundColor: [grey]
        }]
      });
      setBurnedText("0 cal");

    } else if(typeof props.userBMR === "number" && props.totalCaloriesBurned === undefined){
      setBurnedData({
        labels: ['BMR'],
        datasets: [{
          data: [props.userBMR],
          backgroundColor: [purple]
        }]
      });
      setBurnedText(`${Math.round(props.userBMR).toLocaleString()} cal`);

    } else if(typeof props.totalCaloriesBurned === "number" && props.userBMR === undefined){
      setBurnedData({
        labels: ['Exercise'],
        datasets: [{
          data: [props.totalCaloriesBurned],
          backgroundColor: [orange]
        }]
      });
      setBurnedText(`${Math.round(props.totalCaloriesBurned).toLocaleString()} cal`);

    } else if(typeof (props.userBMR + props.totalCaloriesBurned) === "number"){
      setBurnedData({
        labels: ['BMR', 'Exercise'],
        datasets: [{
          data: [props.userBMR, props.totalCaloriesBurned],
          backgroundColor: [purple, orange]
        }]
      });
      setBurnedText(`${Math.round(props.userBMR + props.totalCaloriesBurned).toLocaleString()} cal`);
    }
  }

  // //////////////////////////////// SUMS PIE CHART //////////////////////////////////////////
  let [sumsData, setSumsData] = useState({});
  let [sumsCal, setSumsCal] = useState("");
  let [sumsText, setSumsText] = useState("");

  function sumsChart(){
    if(props.userBMR === undefined && props.totalCaloriesBurned === undefined && props.totalCaloriesConsumed === undefined){
      setSumsData({
        labels: ['0 cal'],
        datasets: [{
          data: [1],
          backgroundColor: [grey]
        }]
      });
      setSumsCal("0 cal");
      setSumsText("Remaining");

    } else if(((props.totalCaloriesBurned + props.userBMR) - props.totalCaloriesConsumed) <= 0){
      setSumsData({
        labels: ['Calories over'],
        datasets: [{
          data: [Math.abs((props.totalCaloriesBurned + props.userBMR) - props.totalCaloriesConsumed)],
          backgroundColor: [grey]
        }]
      });
      setSumsCal(`${Math.round(Math.abs((props.totalCaloriesBurned + props.userBMR) - props.totalCaloriesConsumed))} cal`);
      setSumsText("Over");

    } else if(((props.totalCaloriesBurned + props.userBMR) - props.totalCaloriesConsumed) > 0){
      setSumsData({
        labels: ['Cal consumed', 'Cal remaining'],
        datasets: [{
          data: [props.totalCaloriesConsumed, ((props.totalCaloriesBurned + props.userBMR) - props.totalCaloriesConsumed)],
          backgroundColor: [grey, greylite]
        }]
      });
      setSumsCal(`${Math.round((props.totalCaloriesBurned + props.userBMR) - props.totalCaloriesConsumed)} cal`);
      setSumsText("Remaining");
    }
  }

  // ///////////////////////// SUMMARIZATION TABLE //////////////////////////////////////
  function createData(name, calories, percent) {
    return {name, calories, percent};
  }

  let finalBurned = () => {
    if(props.userBMR ===undefined && props.totalCaloriesBurned===undefined){
      return 0;
    } else if(props.userBMR ===undefined && props.totalCaloriesBurned!==undefined){
      return Math.round(props.totalCaloriesBurned).toLocaleString();
    } else if(props.userBMR !==undefined && props.totalCaloriesBurned===undefined){
      return Math.round(props.userBMR).toLocaleString();
    } else {
      return Math.round(props.userBMR + props.totalCaloriesBurned).toLocaleString();
    }
  }
  
  const rows = [
    createData(
      'BMR', 
      (props.userBMR===undefined ? 0 : Math.round(props.userBMR).toLocaleString()), 
      ((props.userBMR=== undefined || props.userBMR===0) ? "0%" :`${Math.round((props.userBMR/(props.userBMR + props.totalCaloriesBurned))*100)}%`)
    ),
    createData(
      'Exercise', 
      Math.round(props.totalCaloriesBurned).toLocaleString(), 
      ((props.totalCaloriesBurned=== undefined || props.totalCaloriesBurned===0) ? "0%" :`${Math.round((props.totalCaloriesBurned/(props.userBMR + props.totalCaloriesBurned))*100)}%`)
    ),
    createData(
      'Calories Burned', 
      finalBurned(),
      ""
    ),
    createData(
      'Protein', 
      Math.round(props.totalProtein*4).toLocaleString(), 
      ((props.totalProtein=== undefined || props.totalProtein===0) ? "0%" :`${Math.round(((props.totalProtein*4)/props.totalCaloriesConsumed)*100)}%`)
    ),
    createData(
      'Carbs', 
      Math.round(props.totalCarbs*4).toLocaleString(), 
      ((props.totalCarbs=== undefined || props.totalCarbs===0) ? "0%" :`${Math.round(((props.totalCarbs*4)/props.totalCaloriesConsumed)*100)}%`)
    ),
    createData(
      'Fat', 
      Math.round(props.totalFat*9).toLocaleString(), 
      ((props.totalFat=== undefined || props.totalFat===0) ? "0%" :`${Math.round(((props.totalFat*9)/props.totalCaloriesConsumed)*100)}%`)
    ),
    createData(
      'Other', 
      (props.totalCaloriesConsumed - (props.totalProtein*4) - (props.totalCarbs*4) - (props.totalFat*9))>=0 ? Math.round(props.totalCaloriesConsumed - (props.totalProtein*4) - (props.totalCarbs*4) - (props.totalFat*9)).toLocaleString() : 0, 
      ((props.totalCaloriesConsumed - (props.totalProtein*4) - (props.totalCarbs*4) - (props.totalFat*9))===undefined || (props.totalCaloriesConsumed - (props.totalProtein*4) - (props.totalCarbs*4) - (props.totalFat*9))===0 || (props.totalCaloriesConsumed - (props.totalProtein*4) - (props.totalCarbs*4) - (props.totalFat*9))<=0) ? "0%" : `${Math.round(((props.totalCaloriesConsumed - (props.totalProtein*4) - (props.totalCarbs*4) - (props.totalFat*9))/props.totalCaloriesConsumed)*100)}%`
    ),
    createData(
      'Calories Consumed', 
      Math.round(props.totalCaloriesConsumed).toLocaleString(), 
      ""
    ),
    createData(
      'Remaining/(Over)',
      ((isNaN(props.userBMR + props.totalCaloriesBurned - props.totalCaloriesConsumed)) ? 0 : ((props.userBMR + props.totalCaloriesBurned - props.totalCaloriesConsumed)>=0) ? (Math.round(props.userBMR + props.totalCaloriesBurned - props.totalCaloriesConsumed).toLocaleString()) : `(${Math.abs(Math.round(props.userBMR + props.totalCaloriesBurned - props.totalCaloriesConsumed)).toLocaleString()})`),    
      ""
    ),
  ];

  return (
    <div>
        <ThemeProvider theme={VariousThemes}>
        <CssBaseline />
        <Box 
            className="EnergyContainerBox"
            sx={{
                backgroundColor: "boxWhiteColor.main",
                marginLeft: "0px",
                width: "95%",
                height: "45%",
                m: 2,
                boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
                borderRadius: "4px"
            }}
        >
          <ContainerTitles title="Energy Summary" boxClassName="EnergyDiv" />
          {props.userBMR === undefined ? (
            <> 
            <Box sx={{
              marginLeft: "16px",
              marginBottom: "30px"
            }}>
              <ErrorIcon sx={{mr: 1, color: "red"}} /> Fill out your BMR Profile for more accurate data.
            </Box>
            </>
          ) : null}
          <Box
            className="EnergyDiv"
            sx={{
              p: 1,
            }}
          >
          <Stack direction="row" spacing={5}>
            {/* CALORIES CONSUMED CHART */}
            <Paper sx={{width:"175px", height:"175px", border: "none", elevation: "none", boxShadow: "none", marginBottom: "75px", marginLeft: "16px"}}>
              <Stack spacing={1} sx={{display: "flex", justifyContent:"center", alignItems: "center"}}>
                <Typography sx={{fontWeight:"bold"}}>{consumedText}</Typography>
                  {typeof props.foodDiary !== "undefined" && typeof props.oneSelectedFood !== "undefined" ? (
                    <>
                    <Pie data={consumedData} options={{
                      title: {
                        display: true,
                        text: consumedText,
                      },
                      plugins: {
                        legend: {
                          display: false
                        }
                      }
                    }} 
                    />
                    </>
                  ) : null}
                <Typography>Consumed</Typography>
              </Stack>
            </Paper>

            {/* CALORIES BURNED CHART */}
            <Paper sx={{width:"175px", height:"175px", border: "none", elevation: "none", boxShadow: "none", marginBottom: "75px", marginLeft: "16px"}}>
              <Stack spacing={1} sx={{display: "flex", justifyContent:"center", alignItems: "center"}}>
                <Typography sx={{fontWeight:"bold"}}>{burnedText}</Typography>
                  {props.totalCaloriesBurned!==undefined ? (
                    <Pie data={burnedData} options={{
                      title: {
                        display: true,
                        text: burnedText,
                      },
                      plugins: {
                        legend: {
                          display: false
                        }
                      }
                    }} 
                    />
                  ) : null}
                <Typography>Burned</Typography>
              </Stack>
            </Paper>

            {/* CALORIES SUMMATION CHART - OVER/UNDER CHART */}
            <Paper sx={{width:"175px", height:"175px", border: "none", elevation: "none", boxShadow: "none", marginBottom: "75px", marginLeft: "16px"}}>
              <Stack spacing={1} sx={{display: "flex", justifyContent:"center", alignItems: "center"}}>
                <Typography sx={{fontWeight:"bold"}}>{sumsCal}</Typography>
                  {props.totalCaloriesBurned!==undefined ? (
                    <>
                    <Pie data={sumsData} options={{
                      title: {
                        display: true,
                        text: consumedText,
                      },
                      plugins: {
                        legend: {
                          display: false
                        }
                      }
                    }} 
                    />
                    </>
                  ) : null}
                <Typography>{sumsText}</Typography>
              </Stack>
            </Paper>

            {/* SUMMARY TABLE FOR EASY UNDERSTANDING */}
            <TableContainer component={Paper} style={{marginRight:"17px", marginBottom:"20px"}}>
              <Table size="small" aria-label="a dense table">
                <TableRow>
                  <TableCell sx={{color:"rgba(153, 50, 204)", fontWeight:"bold"}}>{rows[0].name}</TableCell>
                  <TableCell align="right">{rows[0].calories}</TableCell>
                  <TableCell align="left" sx={{fontStyle: "italic"}}>{rows[0].percent}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{color:"rgba(255, 165, 0)", fontWeight:"bold"}}>{rows[1].name}</TableCell>
                  <TableCell align="right">{rows[1].calories}</TableCell>
                  <TableCell align="left" sx={{fontStyle: "italic"}}>{rows[1].percent}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{fontWeight: "bold"}}>{rows[2].name}</TableCell>
                  <TableCell sx={{fontWeight: "bold"}} align="right">{rows[2].calories}</TableCell>
                  <TableCell align="left" sx={{fontStyle: "italic"}}>{rows[2].percent}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{color:"rgba(51, 211, 25)", fontWeight:"bold"}}>{rows[3].name}</TableCell>
                  <TableCell align="right">{rows[3].calories}</TableCell>
                  <TableCell align="left" sx={{fontStyle: "italic"}}>{rows[3].percent}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{color:"rgba(54, 162, 235)", fontWeight:"bold"}}>{rows[4].name}</TableCell>
                  <TableCell align="right">{rows[4].calories}</TableCell>
                  <TableCell align="left" sx={{fontStyle: "italic"}}>{rows[4].percent}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{color:"rgba(255, 99, 132)", fontWeight:"bold"}}>{rows[5].name}</TableCell>
                  <TableCell align="right">{rows[5].calories}</TableCell>
                  <TableCell align="left" sx={{fontStyle: "italic"}}>{rows[5].percent}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{color:"rgba(203, 194, 18)", fontWeight:"bold"}}>{rows[6].name}</TableCell>
                  <TableCell align="right">{rows[6].calories}</TableCell>
                  <TableCell align="left" sx={{fontStyle: "italic"}}>{rows[6].percent}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{fontWeight: "bold"}}>{rows[7].name}</TableCell>
                  <TableCell sx={{fontWeight: "bold"}} align="right">{rows[7].calories}</TableCell>
                  <TableCell align="left" sx={{fontStyle: "italic"}}>{rows[7].percent}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{fontWeight: "bold"}}>{rows[8].name}</TableCell>
                  <TableCell sx={{fontWeight: "bold"}} align="right">{rows[8].calories}</TableCell>
                  <TableCell align="left" sx={{fontStyle: "italic"}}>{rows[8].percent}</TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </Stack>
          </Box>
        </Box>
        </ThemeProvider>
    </div>
  )
}

export default EnergyContainer;