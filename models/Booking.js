const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    passengerName:{
        type: String,
        required: true
    },
    passengerEmail:  {
     type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [
        /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
        "Email must contain only letters and numbers"
  ]
}
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
