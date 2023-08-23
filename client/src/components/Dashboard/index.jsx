import React from 'react';
import { useState, useEffect } from 'react';
// COMPONENTS:
import DashBoardLayout from './DashBoardLayout';
import BMRContainer from './Diary Components/BMR/BMRContainer';
import RightCalendar from './Diary Components/RightCalendar';
import EnergyContainer from './Diary Components/Energy Summary/EnergyContainer';
import FoodDiaryContainer from './Diary Components/Food Diary/FoodDiaryContainer';
// MATERIAL UI - CALENDAR:
import dayjs from 'dayjs';
import { DateTime } from 'luxon';
// MATERIAL UI:
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';

const DashBoard = () => {
  // CALENDAR SECTION
  const [date, setDate] = useState(dayjs(DateTime.local()));
  const [formattedDate, setFormattedDate] = useState(date.format('YYYY-MM-DD'))
  function calendarDateChange(newDate){
    setDate(newDate);
    const selectedDate = dayjs(newDate);
    setFormattedDate(selectedDate.format('YYYY-MM-DD'));
    fetchUserInfo();
    setOneSelectedFood([]);
  }

  // This particular useState stems from the DiaryTable. Essentially, if only 1 item in the Diary Table is selected, than a function will run to set it as a useState variable. This variable will then get pushed into the charts within the "Energy Summary" container to help generate a different chart for the 1 selected item.
  const [oneSelectedFood, setOneSelectedFood] = useState([]);

  function seeingOneFoodSelection(selectedItems){
    setOneSelectedFood(selectedItems);
  }
  // console.log(oneSelectedFood);
  // GATHER USER INFORMATION:
  const [userInfo, setUserID] = useState({})
  const [exerciseDataUpdated, setExerciseDataUpdated] = useState(false);
  const [foodDataUpdated, setFoodDataUpdated] = useState(false);
  const [diaryRemoved, setDiaryItemRemoved] = useState(false);
  const [BMRProfile, setBMRProfile] = useState(false);

  function fetchUserInfo(){
    fetch('http://localhost:5000/dashboard?date=' + formattedDate, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
          credentials: "include"
      })
      .then((response)=> response.json())
      .then(data => {
        const totalCaloriesConsumed = data.food.reduce((sum, food) => sum + food.calories, 0);

        const totalProtein = data.food.reduce((sum, food) => sum + food.protein, 0);
        const totalCarbs = data.food.reduce((sum, food) => sum + food.carbs, 0);
        const totalFat = data.food.reduce((sum, food) => sum + food.fat, 0);

        const totalCaloriesBurned = data.exercise.reduce((sum, exercise) => sum + exercise.caloriesBurned, 0);

          setUserID({
            userID: data._id,
            userName: data.username,
            weightArray: data.weight.length == [] ? "" : data.weight,
            latestWeight: data.weight.length == [] ? "" : data.weight[data.weight.length-1].weight,
            BMR: data.bmr,
            age: data.age,
            gender: data.gender,
            feet: data.feet,
            inches: data.inches,
            activityLevel: data.activityLevel,
            foodArray: data.food,
            exerciseArray: data.exercise,
            allDiaryEntries: [...data.food, ...data.exercise],
            totalCaloriesConsumed: totalCaloriesConsumed,
            totalCaloriesBurned: totalCaloriesBurned,
            totalProtein: totalProtein,
            totalCarbs: totalCarbs,
            totalFat: totalFat,
          });
          console.log(userInfo);
      })
      .catch(error => {
          console.log(error);
      })
  };

  useEffect(()=>{
    fetchUserInfo();
    if(exerciseDataUpdated){
      fetchUserInfo();
      setExerciseDataUpdated(false);
      setFoodDataUpdated(false);
      setDiaryItemRemoved(false);
    }
    if(foodDataUpdated){
      fetchUserInfo();
      setFoodDataUpdated(false);
    }
    if(diaryRemoved){
      fetchUserInfo();
      setDiaryItemRemoved(false);
    }
    if(BMRProfile){
      fetchUserInfo();
      setBMRProfile(false);
    }
  },[userInfo.BMR, BMRProfile, formattedDate, exerciseDataUpdated, foodDataUpdated, diaryRemoved, formattedDate]);

  function exerciseDiaryUpdated(){
    setExerciseDataUpdated(true);
  }

  function foodDiaryUpdated(){
    setFoodDataUpdated(true);
  }

  function diaryItemRemoved(){
    setDiaryItemRemoved(true);
  }

  function BMRProfileUpdated(){
    setBMRProfile(true);
  }

  return (
    <DashBoardLayout userEmail={userInfo.userName}>
    <Grid container >
      <Grid xs={9} md={9} lg={9} xl={9}>
        <Grid container >
          <Grid xs={12}>
            <Stack spacing={1}>
              <BMRContainer 
                userID={userInfo.userID} 
                userGender={userInfo.gender}
                userAge={userInfo.age}
                userFeet={userInfo.feet}
                userInches={userInfo.inches}
                userLatestWeight={userInfo.latestWeight}
                userActivityLevel={userInfo.activityLevel}
                userBMR={userInfo.BMR}
                onSubmit={fetchUserInfo}
                BMRProfileUpdated={BMRProfileUpdated}
              />
              <EnergyContainer 
                userID={userInfo.userID}
                selectedCalendarDate={formattedDate}
                exerciseDiary={userInfo.exerciseArray}
                foodDiary={userInfo.foodArray}
                userBMR={userInfo.BMR}
                oneSelectedFood={oneSelectedFood}
                totalCaloriesConsumed={userInfo.totalCaloriesConsumed}
                totalCaloriesBurned={userInfo.totalCaloriesBurned}
                totalProtein={userInfo.totalProtein}
                totalCarbs={userInfo.totalCarbs}
                totalFat={userInfo.totalFat}
              />
              <FoodDiaryContainer 
                userID={userInfo.userID} 
                selectedCalendarDate={date}
                userLatestWeight={userInfo.latestWeight}
                exerciseDiary={userInfo.exerciseArray}
                exerciseDiaryUpdated={exerciseDiaryUpdated}
                foodDiaryUpdated={foodDiaryUpdated}
                diaryItemRemoved={diaryItemRemoved}
                allDiaryEntries={userInfo.allDiaryEntries}
                seeingOneFoodSelection={seeingOneFoodSelection}
              />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={3} md={3} lg={3} xl={3}>
        <RightCalendar date={date} onChange={calendarDateChange} />
      </Grid>
    </Grid>
    </DashBoardLayout>
  )
}

export default DashBoard;