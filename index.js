require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const cors = require ("cors");

var authHandler = require('./routes/auth.js');
var routeHandler = require('./routes/handler.js');
require("./models/passport");

let app = express();

// ** MIDDLEWARE ** //
const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://shrouded-journey-38552.heroku...']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

// app.use(cors({
//   origin: "http://localhost:3000",
//   methods: "GET, POST, PUT, DELETE",
//   credentials: true,
// }));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      // maxAge: new Date(Date.now() + (1000*60*60*24))
      maxAge: 1000*60*60*24
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "sessions",
    })
  }));

app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
  console.log('Session data:', JSON.stringify(req.session));
  console.log('User data:', JSON.stringify(req.user));
  console.log('Cookie data:', JSON.stringify(req.cookies));
  next();
});

app.use("/auth", authHandler);
app.use("/", routeHandler);

const path = require('path');
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(process.env.PORT,function(req,res){
    console.log(`Server is running on Port ${process.env.PORT}.`)
  });