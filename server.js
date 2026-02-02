const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');

const authController = require("./controllers/auth.routes.js");
const indexController = require("./controllers/index.routes.js");
const bookingRoutes = require('./controllers/booking.routes');
const flightsRoutes = require('./controllers/flight.routes.js');

const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");

app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboardcat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passUserToView);

app.use('/auth', authController);
app.use('/', indexController);

app.use(isSignedIn);
app.use('/bookings', bookingRoutes);
app.use('/flights', flightsRoutes);

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error Occured", error);
  }
}
connectToDB();

app.listen(3000, () => {
  console.log('App is working');
});