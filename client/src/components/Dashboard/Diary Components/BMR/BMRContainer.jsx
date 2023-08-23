import React, {useState, useEffect} from 'react';
// THEME PROVIDER:
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// MATERIAL UI:
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
// MATERIAL UI (FORM, INPUT, AND SELECT):
import FormControl from '@mui/material/FormControl';
// MATERIAL UI (ACCORDION):
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// MATERIAL UI ICONS:
import ErrorIcon from '@mui/icons-material/Error';
// PAGES/COMPONENTS:
import BMRFormTitles from './BMRFormTitles';
import BMRSummary from './BMRSummary';
import BMRInputSelect from './BMRInputSelect';
import BMRTextField from './BMRTextField';
import BMRButtons from './BMRButtons';

function BMRContainer(props) {
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

    // ACCORDION FUNCTIONS:
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    // DISABLED/EDITABLE FORM FUNCTIONS AND FORM SUBMIT FUNCTIONS:
    // THIS WILL ALSO BE THE SECTION TO UPDATE BMR INTO MONGOOSE:

    // THIS IS THE USE STATE FOR THE FORM SELECT/INPUTS TO MAKE IT DISABLED:
    let [disabled, setDisableState] = useState(true)
    // THIS IS THE USE STATE FOR THE SUBMIT BUTTON TO MAKE IT ENABLED:
    let [submitButton, setSubmitButton] = useState(true)
    // THIS WILL MAKE THE FORM EDITABLE AND THE SUBMIT BUTTON NOT DISABLED:
    function changeEdit(){
      setDisableState(false);
      setSubmitButton(false)
    }
    // THIS WILL MAKE THE FORM UN-EDITABLE AGAIN AND THE SUBMIT BUTTON DISABLED:
    function cancelEdit(){
      setDisableState(true);
      setSubmitButton(true)
    }

    // THIS IS THE UPDATEBMR FUNCTION THAT WILL:
    // MAKE THE INPUT/SELECT BACK TO DISABLED.
    function updateBMR(){
      if(disabled===false){
        setDisableState(true);
      }
      if(submitButton===false){
        setSubmitButton(true)
      }
    }
    // THIS WILL PREVENT DEFAULT UPON FORM SUBMISSION AND
    // WILL POST THE FORM DATA TO BACKEND SERVER.
    function formSubmit(event){
      updateBMR()
      fetch('http://localhost:5000/addBMR', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(allBMRValues)
      })
      .then((response) => response.json())
      .then((result) => {
        props.onSubmit();
        setBMRValues({...allBMRValues, BMR: result.bmr})
      });
      event.preventDefault();
      fetchUpdatedBMR()
      props.BMRProfileUpdated();
    }

    function fetchUpdatedBMR(){
      fetch('http://localhost:5000/dashboard', {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
          credentials: "include"
      })
      .then((response)=> response.json())
      .then(data => {
          setBMRValues((prevValues)=>({
            ...prevValues,
            BMR: data.bmr
          }))
      })
      .catch(error => {
          console.log(error);
      })
    }
    // THE BELOW TWO ITEMS SET THE USESTATE OF FORM VALUES
    // AND WILL UPDATE THEM AS THE INPUT/SELECT VALUE CHANGES.
    const [allBMRValues, setBMRValues] = useState({
      genderInput: props.userGender,
      ageInput: props.userAge,
      ftInput: props.userFeet,
      inInput: props.userInches,
      weightInput: props.userLatestWeight,
      activityLevelInput: props.userActivityLevel,
      userID: props.userID,
      BMR: props.userBMR
    })

    useEffect(()=>{
      setBMRValues((prevValues)=>({
        ...prevValues,
        genderInput: props.userGender,
        ageInput: props.userAge,
        ftInput: props.userFeet,
        inInput: props.userInches,
        weightInput: props.userLatestWeight,
        activityLevelInput: props.userActivityLevel,
        userID: props.userID,
        BMR: props.userBMR
      }))
    },[props.userActivityLevel, props.userAge, props.userFeet, props.userGender, props.userInches, props.userLatestWeight, props.userID, props.userBMR])
    
    const handleFormChange = e => {
      setBMRValues({...allBMRValues, [e.target.name]: e.target.value, BMR: props.userBMR})
    }

  return (
    <div>
    <ThemeProvider theme={VariousThemes}>
    <CssBaseline />
    <br></br>
    <Box 
        className="BMRCalculatorBox"
        sx={{
            backgroundColor: "boxWhiteColor.main",
            marginLeft: "0px",
            width: "95%",
            height: "45%",
            m: 2,
            boxShadow: 1,
            borderRadius: 2
        }}
    >
      <Accordion expanded={expanded === 'panelBMR'} onChange={handleChange('panelBMR')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panelBMR-content"
          id="panelBMR-header"
          sx={{
            display:"flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Typography variant="h4" sx={{ width: '33%', flexShrink: 0 }}>
            BMR Profile
          </Typography>
          <Typography sx={{ color: 'text.secondary', flex: 1, display: "flex", alignItems:"center" }}>{allBMRValues.BMR ? `Your BMR is ${Math.round(allBMRValues.BMR).toLocaleString("en-US")} cal` : <> <ErrorIcon sx={{mr: 1, color: "red"}} /> Fill out your BMR Profile for further details.</>}</Typography>
          {/* <Typography sx={{ color: 'text.secondary', flex: 1, display: "flex", alignItems:"center" }}>{BMRText}</Typography> */}
        </AccordionSummary>
        <AccordionDetails>
            <Box
              className="BMRDiv"
              sx={{
                p: 2,
              }}
            >
            <BMRSummary />  
            <br />
          <form method="POST" action="http://localhost:5000/addBMR" onSubmit={event=>{formSubmit(event)}}>
            <FormControl fullWidth>      
              <Grid container className="fullBMRFormContainer">
                {/* GENDER SELECT */}
                <BMRFormTitles className="genderGrid" inputLabel="Gender" />
                <BMRInputSelect 
                  classNameGrid="genderGridInput"
                  classNameSelect = "genderInput"
                  name="genderInput"
                  inputLabel="Gender"
                  selectLabel="Gender"
                  menuItems={["Female", "Male"]}
                  gridSpacing = {8}
                  disabled={disabled}
                  defaultValue={allBMRValues.genderInput}
                  onChange={handleFormChange}
                  sx={{
                    width: "300px"
                  }}
                />

                {/* BIRTHDAY SELECT */}
                <BMRFormTitles className="ageGrid" inputLabel="Age" />
                <Grid xs={8} sx={{mb:2}}>
                  <BMRTextField 
                    state="required" 
                    name="ageInput" 
                    disabled={disabled} 
                    label="Age"
                    defaultValue={props.userAge}
                    onChange={handleFormChange}
                    value={allBMRValues.ageInput} 
                    sx={{mb:2}}
                  />
                </Grid>
                
                {/* HEIGHT SELECT */}
                <BMRFormTitles className="heightGrid" inputLabel="Height" />
                <BMRInputSelect 
                  classNameGrid="heightFeetGridInput"
                  classNameSelect = "heightFeetInput"
                  inputLabel="ft"
                  selectLabel="ft"
                  name="ftInput"
                  defaultValue={props.userFeet}
                  menuItems={[1,2,3,4,5,6,7,8]}
                  gridSpacing = {1}
                  disabled={disabled}
                  onChange={handleFormChange}
                  value={allBMRValues.ftInput} 
                  sx={{
                    width: "75px"
                  }}
                />
                <BMRInputSelect 
                  classNameGrid="heightInchesGridInput"
                  classNameSelect = "eightInchesInput"
                  inputLabel="in"
                  selectLabel="in"
                  name="inInput"
                  defaultValue={props.userInches}
                  menuItems={[0,1,2,3,4,5,6,7,8,9,10,11]}
                  disabled={disabled}
                  onChange={handleFormChange}
                  value={allBMRValues.inInput}
                  sx={{
                    width: "75px"
                  }}
                />
                <Grid xs={3}/>
                
                {/* WEIGHT INPUT */}
                  <BMRFormTitles className="weightGrid" inputLabel="Current Weight" />
                  <Grid xs={8} sx={{mb:2}}>
                    <BMRTextField 
                      name="weightInput" 
                      state="required" 
                      disabled={disabled} 
                      label="lbs." 
                      defaultValue={props.userLatestWeight}
                      sx={{mb:2}} 
                      onChange={handleFormChange}
                      value={allBMRValues.weightInput} 
                    />
                  </Grid>

                {/* ACTIVITY LEVEL INPUT */}
                  <BMRFormTitles className="activityGrid" inputLabel="Activity Level" />
                  <BMRInputSelect 
                    classNameGrid="activityLevelGridInput"
                    classNameSelect = "activityLevelInput"
                    inputLabel="Activity Level"
                    selectLabel="activityLabel"
                    name="activityLevelInput"
                    gridSpacing = {8}
                    defaultValue={props.userActivityLevel}
                    menuItems={[
                      "Little to no exercise: BMR x 1.2",
                      "Light exercise (1-3 days/week): BMR x 1.375",
                      "Moderate exercise (3-5 days/week): BMR x 1.55",
                      "Heavy exercise (6-7 days/week): BMR x 1.725",
                      "Very heavy exercise (twice per day, extra heavy workouts): BMR x 2"
                    ]}
                    disabled={disabled}
                    onChange={handleFormChange}
                    value={allBMRValues.activityLevelInput}
                    sx={{
                      width: "300px",
                    }}
                />

                {/* BMR RESULT */}
                {allBMRValues.BMR ? (
                  <>
                    <BMRFormTitles className="BMRResultGrid" inputLabel="BMR" />
                    <Grid xs={8}>
                      <Typography variant="body1" style={{ fontWeight: "bold" }}>
                        {Math.round(allBMRValues.BMR).toLocaleString("en-US") + " cal"}
                      </Typography>
                    </Grid>
                  </>
                ) : null}

              </Grid>
              {/* BUTTONS */}
              <Stack spacing={2} direction="row" sx={{m:2, justifyContent:"center"}}>
                <BMRButtons 
                  variant="outlined" 
                  className="editBMRButton"
                  label="Edit"
                  disabled={false}
                  onClick={changeEdit}
                />
                <BMRButtons 
                  variant="contained" 
                  className="cancelBMRButton"
                  label="Cancel"
                  disabled={submitButton}
                  onClick={cancelEdit}
                  backgroundColor="red"
                  fontColor="white"
                />
                <BMRButtons 
                  variant="contained" 
                  className="submitBMRInfo"
                  label="Update"
                  disabled={submitButton}
                  onSubmit={(event)=>{
                    formSubmit(event)
                  }}
                  type="submit"
                />
              </Stack>
            </FormControl>
          </form>
          </Box>
        </AccordionDetails>
      </Accordion>
      
    </Box>
    </ThemeProvider>
    </div>
  )
}

export default BMRContainer