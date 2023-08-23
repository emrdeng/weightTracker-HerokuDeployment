import React, {useState} from 'react';
import axios from "axios";
// THEME PROVIDER:
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// MATERIAL UI:
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// MATERIAL UI BUTTONS:
import { Button } from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
// MATERIAL UI DIALOG:
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// MATERIAL UI TEXTFIELDS/SELECT:
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
// MATERIAL UI SORTABLE AND SELECTABLE TABLE:
import EnhancedExerciseTable from './APITables/EnhancedExerciseTable';
import EnhancedFoodTable from './APITables/EnhancedFoodTable';
// PAGES/COMPONENTS:
import DiaryTable from './DiaryTable';

function FoodDiaryContainer(props) {
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

  function onSelectionChanged(newSelected){
    props.seeingOneFoodSelection(newSelected);
  }

  // THIS OPENS AND CLOSES THE FOOD/EXERCISE SEARCH MODAL:
  const [foodModal, setFoodModal] = useState(false);
  const [exerciseModal, setExerciseModal] = useState(false);
  
  const openFoodModal = () => {
    setFoodModal(true)
  }

  const closeFoodModal = () => {
    setFoodModal(false)
  }

  const openExerciseModal = () => {
    setExerciseModal(true)
  }

  const closeExerciseModal = () => {
    setExerciseModal(false)
  }

  ////////////////////////// FOOD AND EXERCISE DIARY TABLE///////////////////////////
  // THESE ARE THE HEADERS OF THE TABLE THAT WILL SHOW UP IN THE FOOD/EXERCISE DIARY.
  const diaryHeadCells = [
    { id: 'type', label: 'Type', disablePadding: true, numeric: false },
    { id: 'description', label: 'Description', disablePadding: true, numeric: false },
    { id: 'servingsOrDuration', label: 'Servings/Duration', disablePadding: true, numeric: true },
    { id: 'metricOrTime', label: 'Metric', disablePadding: true, numeric: true },
    { id: 'calories', label: 'Calories', disablePadding: true, numeric: true },
  ];
  // WHEN USER CLICKS ON THE REMOVE FROM DIARY BUTTON, THIS BUTTON WILL HANDLE THE REMOVAL OF THE ITEM IN THE DIARY BY POSTING THE ITEM THAT NEEDS TO BE REMOVED TO THE BACKEND (WHICH WILL REMOVE FROM MONGOOSE).
  const handleDiaryItemRemove = async (selected) => {
    try {
        const response = await axios.post('http://localhost:5000/removeDiaryItem', { selected });
        console.log(response);
        console.log(response.data);
        props.diaryItemRemoved();
    } catch (error) {
        console.error(error);
    }
}

  ///////////////////////////// FOOD MODAL FORM SUBMIT/////////////////////////////
  // HANDLES BOTH THE POSTING OF INFORMATION TO BACKEND SERVER AND
  // RECEIVES THE INFORMATION FROM THE EXTERNAL API FROM BACKEND:
  const [foodFormData, setFoodFormData] = useState({});
  const [foodAPIResponse, setFoodAPIResponse] = useState({});

  // THIS WILL OPEN UP THE TABLE IN THE FOOD MODAL THAT SHOWS ALL THE SEARCH RESULTS FROM THE API.
  const [showFoodTable, setFoodShowTable] = useState(false);

  // THIS WILL HANDLE THE FOOD MODAL SEARCH SUBMIT BUTTON:
  const handleFoodFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const foodAPI = await axios.post("http://localhost:3000/foodModal/apiCall", foodFormData);
      setFoodAPIResponse(foodAPI.data);
      setFoodShowTable(true);
    } catch (error) {
      console.error(error);
    }
  }

  const foodHeadCells = [
    { id: 'description', label: 'Description', disablePadding: true, numeric: false },
    { id: 'servingSizeInGrams', label: 'Serving(g)', disablePadding: true, numeric: true },
    { id: 'calories', label: 'Calories', disablePadding: true, numeric: true },
  ];

  // THIS WILL HANDLE POSTING THE SELECTED FOOD API SEARCH RESULTS INTO THE DIARY IN THE BACKEND:
  const handleFoodDiarySubmit = async (selected) => {
    closeFoodModal();
    console.log(selected);
    const data = selected.map((eachFood) => {
      return {
        userID: props.userID,
        selectedCalendarDate: props.selectedCalendarDate,
        food: eachFood.name,
        servingAmount: eachFood.serving_size_g,
        calories: eachFood.calories,
        protein: eachFood.protein_g,
        carbs: eachFood.carbohydrates_total_g,
        fat: eachFood.fat_total_g
      }
    })
    console.log(data);
    try {
        const response = await axios.post('http://localhost:5000/foodModal/foodDiarySave', data);
        console.log(response);
        console.log(response.data);
        props.foodDiaryUpdated();
    } catch (error) {
        console.error(error);
    }
  }

  /////////////////////////// EXERCISE MODAL FORM SUBMIT////////////////////////////
  // HANDLES BOTH THE POSTING OF INFORMATION TO BACKEND SERVER AND
  // RECEIVES THE INFORMATION FROM THE EXTERNAL API FROM BACKEND:
  const [exerciseFormData, setExerciseFormData] = useState({});
  const [exerciseAPIResponse, setExerciseAPIResponse] = useState({});

  // THIS WILL OPEN UP THE TABLE IN THE EXERCISE MODAL THAT SHOWS ALL THE SEARCH RESULTS FROM THE API.
  const [showExerciseTable, setExerciseShowTable] = useState(false);

  // THIS WILL HANDLE THE EXERCISE MODAL SEARCH SUBMIT BUTTON:
  const handleExerciseFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const exerciseAPI = await axios.post("http://localhost:3000/exerciseModal/apiCall", exerciseFormData);
      setExerciseAPIResponse(exerciseAPI.data);
      setExerciseShowTable(true);
    } catch (error) {
      console.error(error);
    }
  }

  const exerciseHeadCells = [
    { id: 'description', label: 'Description', disablePadding: true, numeric: false },
    { id: 'minutes', label: 'Minutes', disablePadding: true, numeric: true },
    { id: 'calories', label: 'Calories', disablePadding: true, numeric: true },
  ];

  // THIS WILL HANDLE POSTING THE SELECTED EXERCISE API SEARCH RESULTS INTO THE DIARY IN THE BACKEND:
  const handleExerciseDiarySubmit = async (selected) => {
    closeExerciseModal();
    const data = selected.map((eachExercise) => {
      return {
        userID: props.userID,
        selectedCalendarDate: props.selectedCalendarDate,
        exercise: eachExercise.name,
        duration: eachExercise.duration_minutes,
        calories: eachExercise.total_calories
      }
    })
    try {
        const response = await axios.post('http://localhost:5000/exerciseModal/exerciseDiarySave', data);
        props.exerciseDiaryUpdated();
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <div>
    <ThemeProvider theme={VariousThemes}>
    <CssBaseline />
      <Box 
        className="FoodContainerBox"
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
        
          <Box
            className="FoodDiaryButtonsDiv"
            sx={{
              p: 2,
            }}
          >
          <Stack direction="row" pl={1} pt={2} spacing={2}>
            <Button 
              sx={{ borderRadius: 10 }}
              startIcon={<RestaurantIcon color="error" />}
              variant="outlined"
              color="error"
              onClick={openFoodModal}
            >
              Food
            </Button>
            <Button 
              sx={{ borderRadius: 10 }}
              startIcon={<DirectionsRunIcon />}
              variant="outlined"
              onClick={openExerciseModal}
            >
            Exercise
            </Button>
        </Stack>
        </Box> 
        
        {/* ///////////THIS IS THE DIALOG MODAL FOR THE FOOD DIARY///////////// */}
        <Dialog open={foodModal} onClose={closeFoodModal}
          maxWidth="md"
          fullWidth={true}
        >
          <DialogTitle>
            <Typography 
            variant="h5" 
            sx={{ 
              width: '70%', 
              flexShrink: 0, 
              fontWeight: "bold" 
            }}>
              Add Food to your Diary
            </Typography>
          </DialogTitle>
          <DialogContent>
          <form method="POST" action="http://localhost:3000/foodModal/apiCall" onSubmit={handleFoodFormSubmit}>
            <FormControl fullWidth={true}>
            <Stack direction="row" spacing={2} mt={1}>
              <TextField 
                className="foodSearchInput"
                name="foodQuery"
                label="Search for foods" 
                variant="outlined" 
                required
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{width: "50%"}}
                onChange={(e)=>{
                  setFoodFormData({...foodFormData, [e.target.name]: e.target.value})
                }}
                value={foodFormData.foodQuery}
              />
              <TextField 
                className="servingSizeAmount"
                name="servingAmount"
                label="Serving Size" 
                variant="outlined" 
                type="number"
                required
                sx={{width: "20%"}}
                onChange={(e)=>{
                  setFoodFormData({...foodFormData, [e.target.name]: e.target.value})
                }}
                value={foodFormData.servingAmount}
              />
              <TextField 
                className="servingSizeMetric"
                name="servingMetric"
                select
                label="Metric" 
                defaultValue="g"
                variant="outlined" 
                required
                sx={{width: "15%"}}
                onChange={(e)=>{
                  setFoodFormData({...foodFormData, [e.target.name]: e.target.value})
                }}
                value={foodFormData.servingMetric}
              >
                <MenuItem value="g">g</MenuItem>
                <MenuItem value="cup">cup</MenuItem>
                <MenuItem value="lb">lb</MenuItem>
              </TextField>
              <Button variant="contained" type="submit" onSubmit={handleFoodFormSubmit}>Search</Button>
            </Stack>
            </FormControl>
            </form>
          </DialogContent>
          
          {/* THIS PART IS THE SEARCH RESULTS TABLE THAT WILL ONLY SHOW UP ONCE THE FOOD SEARCH SUBMIT BUTTON IS CLICKED WHICH TRIGGERS THE HANDLE FOODFORMSUBMIT BUTTON */}
          {showFoodTable ? (
            <>
            {foodAPIResponse.length===0 ? (
              <>
                <br/>
                <Typography variant="h6" ml={2.5} mb={2.5} sx={{fontWeight: "bold"}}>No search results found. Please try again.</Typography>
              </>
            ): (
              <DialogContent>
              <form method="POST" action="http://localhost:5000/foodModal/foodDiarySave" onSubmit={handleFoodDiarySubmit}>
                <EnhancedFoodTable 
                  rows={foodAPIResponse} 
                  headCells={foodHeadCells} 
                  selectedCalendarDate={props.selectedCalendarDate}
                  onSubmit={handleFoodDiarySubmit}
                />
              </form>
            </DialogContent>
            )}
            </>
          ) : null}
        </Dialog>


        {/* //////////////////////EXERCISE MODAL//////////////////////// */}
        <Dialog open={exerciseModal} onClose={closeExerciseModal}
          maxWidth="md"
          fullWidth={true}
        >
          <DialogTitle>
            <Typography 
            variant="h5" 
            sx={{ 
              width: '70%', 
              flexShrink: 0, 
              fontWeight: "bold" 
            }}>
              Add Exercise to your Diary
            </Typography>
          </DialogTitle>
          <DialogContent>
            <form method="POST" action="http://localhost:3000/exerciseModal/apiCall" onSubmit={handleExerciseFormSubmit}>
            <FormControl fullWidth={true}>
            <Stack direction="row" spacing={2} mt={1}>
              <TextField 
                className="exerciseSearchInput"
                name="exerciseQuery"
                label="Search all exercises" 
                variant="outlined" 
                required
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{width: "60%"}}
                onChange={(e)=>{
                  setExerciseFormData({...exerciseFormData, [e.target.name]: e.target.value, weight: props.userLatestWeight})
                }}
                value={exerciseFormData.exerciseQuery}
              />
              <TextField 
                className="exerciseTimeInput"
                name="exerciseTime"
                label="Duration in minutes" 
                variant="outlined" 
                type="number"
                required
                sx={{width: "25%"}}
                onChange={(e)=>{
                  setExerciseFormData({...exerciseFormData, [e.target.name]: e.target.value, weight: props.userLatestWeight})
                }}
                value={exerciseFormData.exerciseTime}
              />
              <Button variant="contained" type="submit" onSubmit={handleExerciseFormSubmit}>Search</Button>
            </Stack>
            </FormControl>
            </form>
          </DialogContent>
          {/* THIS PART IS THE SEARCH RESULTS TABLE THAT WILL ONLY SHOW UP ONCE THE EXERCISE SEARCH SUBMIT BUTTON IS CLICKED WHICH TRIGGERS THE HANDLE EXERCISEFORMSUBMIT BUTTON */}
          {showExerciseTable ? (
            <>
            {exerciseAPIResponse.length===0 ? (
              <>
                <br/>
                <Typography variant="h6" ml={2.5} mb={2.5} sx={{fontWeight: "bold"}}>No search results found. Please try again.</Typography>
              </>
            ): (
              <DialogContent>
              <form method="POST" action="http://localhost:5000/exerciseModal/exerciseDiarySave" onSubmit={handleExerciseDiarySubmit}>
                <EnhancedExerciseTable 
                  rows={exerciseAPIResponse} 
                  headCells={exerciseHeadCells} 
                  selectedCalendarDate={props.selectedCalendarDate}
                  onSubmit={handleExerciseDiarySubmit}
                />
              </form>
            </DialogContent>
            )}
            </>
          ) : null}
        </Dialog>
        
        {/* THIS COVERS THE ACTUAL DIARY SECTION UPON DASHBOARD REFRESH (SO INCLLUDES BOTH THE FOOD AND EXERCISE ENTRIES PER DAY) */}
        {props.allDiaryEntries && props.allDiaryEntries.length != 0 ? (
          <Box
            className="DailyDiaryDiv"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 3,
                width: "100%",
                minHeight: 'calc(100% + 16px)',
                border: "none"
              },
            }}
          >
            <Paper 
              variant = "outlined"
              sx={{ borderRadius: "10px" }}
            >
              <form method="POST" action="http://localhost:5000/removeDiaryItem" onSubmit={handleDiaryItemRemove}>
                <DiaryTable 
                  rows={props.allDiaryEntries} 
                  headCells={diaryHeadCells} 
                  selectedCalendarDate={props.selectedCalendarDate}
                  onSubmit={handleDiaryItemRemove}
                  onSelectionChanged={onSelectionChanged}
                />
                </form>
            </Paper>
        </Box>
        ) : (
          <Box
            className="DailyDiaryDiv"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 3,
                width: "100%",
                height: "100px",
              },
            }}
          >
            <Paper 
              variant = "outlined"
              sx={{ borderRadius: "10px" }}
            >
            </Paper>
        </Box>
        )}
        
      {/* End of FoodContainerDiv */}
      </Box>
    </ThemeProvider>
    </div>
  )
}

export default FoodDiaryContainer