import React from 'react';
import { useState, useEffect } from 'react';
// MATERIAL UI:
import Grid from '@mui/material/Unstable_Grid2';
// MATERIAL UI (TEXTFIELD):
import TextField from '@mui/material/TextField';

function BMRTextField(props) {
  useEffect(() => {
    if (props.defaultValue) setCurrentValue(props.defaultValue)
  }, [props.defaultValue])
  
  const [currentValue, setCurrentValue] = useState(props.defaultValue || "");

  return (
    <Grid xs={8} className={props.className}>
    <TextField
        required
        disabled={props.disabled}
        id="outlined-number"
        label={props.label}
        type="number"
        name={props.name}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e)=>{
          props.onChange(e);
          setCurrentValue(e.target.value)
        }}
        value={currentValue}
        style={{
          backgroundColor: props.disabled ? 'rgba(0, 0, 0, 0.12)' : props.backgroundColor, 
          color: props.fontColor,
          opacity: props.disabled ? 0.5 : 1
        }}
    />
    </Grid>
  )
}

export default BMRTextField;