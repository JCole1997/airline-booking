var express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose"),
  middleware = require("../middleware"),
  Airline = require("../models/airline");

router.get("/", middleware.isAdminLoggedIn, (req, res) => {
  Airline.find({}, (err, foundAirlines) => {
    if(err){
      console.log(err)
    } else {
      res.render("admin/admin", {
        Airlines: foundAirlines
      });
    }
  })
});

router.get("/new", middleware.isAdminLoggedIn, (req, res) => {
  res.render("admin/new")
});

router.post("/new", (req, res) => {
  Airline.create(req.body.airline, (err, newAirline) => {
    if(err) {
      console.log(req.body.airline)
      console.log(err)
    } else {
      res.redirect("/admin");
    }
  })
})

//EDIT ROUTE
router.get("/:id", middleware.isAdminLoggedIn, (req, res) => {
  Airline.findById(req.params.id, (err, foundAirline) => {
    if(err){
      console.log(err)
    } else {
      res.render("admin/edit", { Airline: foundAirline });
    }
  })
});

router.put("/:id", (req, res) => {
  Airline.findByIdAndUpdate(req.params.id, req.body.airline, (err, foundAirline) => {
    if(err){
      console.log(err)
    } else {
      res.redirect("/admin");
    }
  })
})

//DELETE ROUTE
router.delete("/", (req, res) => {
  var isChecked = req.body.check;
  var id = new Array();
 if(isArray(isChecked)){
  for (var i = 0; i < isChecked.length; i++) {
        id.push(mongoose.Types.ObjectId(isChecked[i]));
  }
    Airline.deleteMany({ _id: { $in: id } }, (err, foundAirline) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/admin");
      }
    });
 } else {
  Airline.findByIdAndRemove(mongoose.Types.ObjectId(isChecked), (err, foundAirline) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/admin");
    }
  });
 }
})

function isArray(o) {
  return Object.prototype.toString.call(o) == "[object Array]";
}
module.exports = router;