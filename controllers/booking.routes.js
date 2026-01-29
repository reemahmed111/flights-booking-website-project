const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Flight = require("../models/Flight");

router.get("/", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/auth/sign-in");
    }

    const bookings = await Booking.find({
      user: req.session.user._id
    });

    res.render("bookings/index", { bookings });
  } catch (err) {
    console.log(err);
  }
});

router.get('/new/:flightId', async (req, res) => {
  const flight = await Flight.findById(req.params.flightId);
  res.render('bookings/new', { flight });
});


router.post("/", async (req, res) => {
  try {
    if (!req.session || !req.session.user) {
      return res.redirect("/auth/sign-in");
    }


    const flight = await Flight.findById(req.body.flightId);

    await Booking.create({
      flight: flight._id,
      flightSnapshot: {
        airlineName: flight.airlineName,
        origin: flight.origin,
        destination: flight.destination,
        takeOffDate: flight.takeOffDate,
        returnDate: flight.returnDate,
        tripType: flight.tripType
      },
      passengers: req.body.passengers,
      user: req.session.user._id,
    });

     req.session.message = "Booking confirmed ✅";

    res.redirect("/bookings");
  } catch (err) {
    console.log(err);
  }
});




module.exports = router;