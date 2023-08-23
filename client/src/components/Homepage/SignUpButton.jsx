import Button from '@mui/material/Button';
import React from 'react';

function SignUpButton() {
  return (
    <Button 
    size="large" 
    variant="contained" 
    color="success"
    href="/login"
    sx={{
        display: "block",
        marginRight: "45%",
        borderRadius: "30px",
        fontWeight: 400,
        fontFamily: "'Solway', serif",
        textAlign: "center",
        "&:hover": {backgroundColor: "#ff6733", color: "white"}
    }}
    >
    Sign Up For Free!
    </Button>
  )
}

export default SignUpButton;