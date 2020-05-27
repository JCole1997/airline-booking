var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  idNumber: String,
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  airline: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airline",
    },
  },
});

module.exports = mongoose.model("Order", orderSchema);