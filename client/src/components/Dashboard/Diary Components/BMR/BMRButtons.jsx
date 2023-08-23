import React from 'react';
// MATERIAL UI:
import Button from '@mui/material/Button';

function BMRButtons(props) {
    return (
        <Button 
            variant={props.variant} 
            className={props.className} 
            name={props.className}
            type={props.type}
            disabled={props.disabled}
            onClick={props.onClick ? ()=>{props.onClick()} : undefined}
            onSubmit={props.onSubmit ? ()=>{props.onSubmit()} : undefined}
            style={{backgroundColor: props.backgroundColor, color: props.fontColor}}
        >
        {props.label}
        </Button>
    );
}

export default BMRButtons;