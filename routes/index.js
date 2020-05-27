var express = require("express"),
  router = express.Router(),
  User = require("../models/user"),
  Order = require("../models/order"),
  Airline = require("../models/airline"),
passport =require("passport");

router.get("/", function (req, res) {
    res.render("landing");
})

router.get("/register", (req, res) => {
    res.render("register");
})

router.post("/register", (req, res) => {
    User.register(new User({
        username: req.body.username
    }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/");
        })
    })
})

router.get("/login", (req, res) => {
    res.render("login");
})

router.get("/loginSuccess", (req, res) => {
    res.render("success");
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/loginSuccess",
    failureRedirect: "login"
}), (req, res) => {})

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("back");
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

router.get("/user/:id", (req, res) => {
    Order.find({user: {id: req.user._id}}, (err, foundOrders) => {
        var id = [];
        foundOrders.forEach(function(order){
            id.push(order.airline.id);
        })
        Airline.find({ _id: { $in: id } }, (err, foundAirlines) => {
            res.render("user", {
              Airlines: foundAirlines,
              Orders: foundOrders,
            });
        });
    })
})

module.exports = router;