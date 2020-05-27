var express = require("express"),
    router = express.Router(),
    middleware = require("../middleware"),
    Airline = require("../models/airline"),
    Order = require("../models/order"),
    User = require("../models/user");

router.get("/", function(req, res) {
    res.render("ticket/search");
})

router.get("/show", function(req, res) {
  if(req.query.trip === 'one-way') {
        Airline.find(
      {
        leaveCity: req.query.from,
        arriveCity: req.query.to,
        date: req.query.deparure,
      },
      function (err, foundAirlines) {
        if (err) {
          console.log(err);
        } else {
          res.render("ticket/oneWay", { Airlines: foundAirlines });
        }
      }
    );
  } else {
    res.render("ticket/round");
  }
})

router.get("/info", middleware.isLoggedIn, (req, res) => {
  Airline.findById(req.query.order, (err, foundAirline) => {
    if(err){
      console.log(err)
    }else {
      res.render("ticket/order", {Airline: foundAirline});
    }
  })
})

router.post("/info", (req, res) => {
  Airline.findById(req.body.Airline, (err, foundAirline) => {
    var sum = String(Number(foundAirline.bookSum) + 1);
    Airline.findByIdAndUpdate(
      req.body.Airline,
      { bookSum: sum },
      (err, foundAirline) => {}
    );
  })
  Order.create(req.body.order, (err, createdOrder) => {
    if(err){
      console.log(err)
    } else {
      createdOrder.airline.id = req.body.Airline;
      createdOrder.user.id = req.user._id;
      createdOrder.save();
      Airline.findById(req.body.Airline, (err, foundAirline) => {
        res.render("ticket/payment", {Airline: foundAirline,Order: createdOrder});
      })
    }
  })
})

module.exports = router;