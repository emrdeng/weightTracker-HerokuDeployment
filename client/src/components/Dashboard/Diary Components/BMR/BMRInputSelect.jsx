import React from 'react';
import { useState, useEffect } from 'react';
// MATERIAL UI:
import Grid from '@mui/material/Unstable_Grid2';
// MATERIAL UI (FORM, INPUT, AND SELECT):
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function BMRInputSelect(props) {
  useEffect(() => {
    if (props.defaultValue) setCurrentValue(props.defaultValue)
  }, [props.defaultValue])

  const [currentValue, setCurrentValue] = useState(props.defaultValue || "");

    let menuItemArray = props.menuItems;
    let menuItems = menuItemArray.map(eachMenuItem=>
        <MenuItem value={eachMenuItem}>{eachMenuItem}</MenuItem>
    )
  return (
    <Grid xs={props.gridSpacing} className={props.classNameGrid} sx={{mb:2}}>
        <FormControl required={true}>
        <InputLabel>{props.inputLabel}</InputLabel>
            <Select
              label={props.selectLabel}
              className={props.classNameSelect}
              disabled={props.disabled}
              name={props.name}
              sx={props.sx}
              onChange={(e)=>{
                props.onChange(e);
                setCurrentValue(e.target.value);
              }}
              value={currentValue}
              style={{
                backgroundColor: props.disabled ? 'rgba(0, 0, 0, 0.12)' : props.backgroundColor, 
                color: props.fontColor,
                opacity: props.disabled ? 0.5 : 1
              }}
            >
            {menuItems}
            </Select>
        </FormControl>
    </Grid>
  )
}

export default BMRInputSelect;