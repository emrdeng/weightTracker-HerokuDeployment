require('dotenv').config();
const express = require('express');
const router = require('express').Router();
const mongoose = require('mongoose');
var passport = require('passport');
const User = require('../models/weightSchema.js');

let app = express();

//////////////////////////////GOOGLE AUTHENTICATION ROUTES:////////////////////////////////
router.get('/google',
  passport.authenticate('google', { scope: ['profile','email', 'openid'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/Login',
    successRedirect: 'http://localhost:3000/dashboard'
  })
);

router.get("/login/success", (req, res) => {
  console.log("Login success route reached"); // Log when the /login/success route is reached
  console.log("Console.log req.user: " + JSON.stringify(req.user))
  console.log("Console.log req.isAuthenticated(): " + JSON.stringify(req.isAuthenticated()))
  
  if (req.user) {
    res.status(200).json({
      success: true,
      user: req.user,
      //   cookies: req.cookies
    });
  } else{
    res.status(403).json({error:true,});
  }
});

router.get("/login/failed", (req, res) => {
  {res.status(401).json({
    success: false,
  });
}
});

router.get("/logout", (req,res, next)=>{
  req.logout(function(err){
    if(err){return next(err)}
    res.redirect("http://localhost:3000/")
  });
})

module.exports = router;