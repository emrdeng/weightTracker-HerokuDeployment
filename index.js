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

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
}));

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

app.listen(process.env.PORT,function(req,res){
    console.log(`Server is running on Port ${process.env.PORT}.`)
  });