var mongoose = require("mongoose");

var airlineSchema = new mongoose.Schema({
  name: String,
  leaveCity: String,
  arriveCity: String,
  leaveAirport: String,
  arriveAirport: String,
  date: String,
  leaveTime: String,
  arriveTime: String,
  capacity: String,
  price: String,
  bookSum: String
});

module.exports = mongoose.model("Airline", airlineSchema);