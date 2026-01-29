const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
    airlineName: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    takeOffDate: {
        type: Date,
        required: true
    },
    tripType: {
        type: String,
        required: true,
        enum: ['one-way', 'round-trip'],
        default: 'one-way'
    },
returnDate: {
  type: Date,
  required: false
},
    passengers: {
        adults:{
            type: Number, default: 1
        },
         kids:{
            type: Number, default: 0
        }
    }
});

const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight;
