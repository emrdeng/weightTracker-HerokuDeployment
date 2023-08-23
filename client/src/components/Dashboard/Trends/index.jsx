import React from 'react';
import { useState, useEffect } from 'react';
// PAGES/COMPONENTS:
import DashBoardLayout from '../DashBoardLayout';
// REACT CHART JS:
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// MATERIAL UI - CALENDAR/DATE:
import dayjs from 'dayjs';
import moment from 'moment';
// MATERIAL UI:
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
// THEME PROVIDER:
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { DateTime } from 'luxon';

function Trends() {
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

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  // GATHER USER AND CHART INFORMATION:
  const [userInfo, setUserInfo] = useState({});
  const [range, setRange] = useState(6);
  const [subtitleDate, setSubtitleDate] = useState(moment().subtract(6,"days").format("MMM DD, YYYY"));

  // const [consumedData, setConsumedData] = useState([]);
  // const [burnedData, setBurnedData] = useState([]);

  const [startDate, setStartDate] = useState(moment().subtract(6, 'days').format('YYYY-MM-DD'));

  const [finalData, setFinalData] = useState([]);
  const endDate = moment().format('YYYY-MM-DD');
  const allDates = [];

  useEffect(()=>{
    if(range===6){
      setStartDate(moment().subtract(6, 'days').format('YYYY-MM-DD'));
    } else if(range===1) {
      setStartDate(moment().subtract(1, 'months').format('YYYY-MM-DD'));
    }
    fetchData();
    graphData();
  }, [range, startDate, userInfo.startDate])

  function fetchData(){
    let date = dayjs(DateTime.local());
    let formattedDate = date.format('YYYY-MM-DD');

    fetch('http://localhost:5000/trends?date=' + formattedDate + '&range=' + range, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      credentials: "include"
    })
      .then((response)=> response.json())
      .then(data => {
        setUserInfo({
          userID: data._id,
          userName: data.username,
          BMR: data.bmr,
          startDate: data.startDate,
          totalCaloriesConsumed: data.foodSums.length == [] ? [] : [...data.foodSums],
          totalExercise: data.exerciseSums.length == [] ? [] : [...data.exerciseSums],
          totalCaloriesBurned: data.finalBurnedSums.length == [] ? [] : [...data.finalBurnedSums],
        })
      })   
  }

  function graphData(){
    let currentDate = startDate;
      let nextDate = moment(currentDate).add(1, "days").format("YYYY-MM-DD");
      while(currentDate <= endDate) {
        let currentDateFormatted = moment(currentDate).format("MMM DD");
        if(!allDates.includes(currentDateFormatted)){
          allDates.push(currentDateFormatted);
        }
        currentDate = nextDate;
        nextDate = moment(nextDate).add(1,"days").format("YYYY-MM-DD");
      }

    if(userInfo.totalCaloriesBurned !== undefined && userInfo.totalCaloriesConsumed !== undefined){
      const finalData = allDates.map(eachDate => {
        const data1 = userInfo.totalCaloriesBurned.find(eachBurned => eachBurned._id === moment(eachDate, 'MMM DD').format('YYYY-MM-DD'));
        const data2 = userInfo.totalCaloriesConsumed.find(eachConsumed => eachConsumed._id === moment(eachDate, 'MMM DD').format('YYYY-MM-DD'));
        return {
          eachDate,
          totalBurned: data1 ? data1.totalBurned : userInfo.BMR,
          caloriesConsumed: data2 ? data2.caloriesConsumed : 0,
          BMR: userInfo.BMR
        }
      });
      setFinalData(finalData);
    }
  }

  return (
    <DashBoardLayout userEmail={userInfo.userName}>
      <ThemeProvider theme={VariousThemes}>
      <CssBaseline />
      <br></br>
      <br></br>
        <Grid container>
          <Grid xs={12}>
            <Stack spacing={1}>
              <Box
                className="EnergyConsumedBurnedBox"
                sx={{
                  backgroundColor: "boxWhiteColor.main",
                  marginLeft: "5px",
                  width: "98%",
                  height: "45%",
                  m: 2,
                  boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
                  borderRadius: "10px"
                }}
              >
                <Box
                  m={4}
                >
                  <Grid container>
                    <Grid xs={9}>
                      <Typography variant="h5" sx={{fontWeight:"bold", marginBottom: "5px"}}>Energy Trend (cal)</Typography>
                      <Typography>From {subtitleDate} to {moment().format("MMM DD, YYYY")}</Typography>
                    </Grid>
                    <Grid xs={3} sx={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                      <Stack direction="row" spacing={4}>
                        <Button 
                          sx={{ borderRadius: 10 }}
                          variant="outlined"
                          onClick={() => {setRange(6); setSubtitleDate(moment().subtract(6,"d").format("MMM DD, YYYY"))}}
                        >
                        Last 7 Days
                        </Button>
                        <Button 
                          sx={{ borderRadius: 10 }}
                          variant="outlined"
                          onClick={() => {setRange(1); setSubtitleDate(moment().subtract(1,"months").format("MMM DD, YYYY"))}}
                        >
                        Last Month
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>

                <Box
                  m={4}
                >
                 {finalData !== undefined? (
                  <Line data={{
                  labels: finalData.map((eachDate) => eachDate.eachDate),
                  datasets: [
                    {
                      label: 'Calories Burned',
                      data: finalData.map((eachDate) => eachDate.totalBurned),
                      borderColor: 'rgba(54, 162, 235)',
                      backgroundColor: 'rgba(54, 162, 235, 0.6)',
                      fill: true
                    },
                    {
                      label: 'Calories Consumed',
                      data: finalData.map((eachDate) => eachDate.caloriesConsumed),
                      borderColor: 'rgba(255, 99, 132)',
                      backgroundColor: 'rgba(255, 99, 132, 0.6)',
                      fill: true
                    },
                    {
                      label: 'BMR',
                      data: finalData.map((eachDate) => eachDate.BMR),
                      borderColor: 'rgba(107, 244, 54)',
                      backgroundColor: 'rgba(107, 244, 54, 0.6)',
                      fill: false
                    },
                  ]
                 }} options={{ 
                      scales: { 
                        xAxes: [{ 
                          type: 'time', 
                          time: { 
                            unit: 'day', 
                            displayFormats: { day: 'MMM D' } 
                          } 
                        }] 
                      } 
                    }}
                 />
                 ) : null}
                 
                </Box>
                
              </Box>
              
            </Stack>
          </Grid>
        </Grid>
      </ThemeProvider>
    </DashBoardLayout>
  )
}

export default Trends