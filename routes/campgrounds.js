var express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware");

router.get("/", function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campground/index", {
                campgrounds: campgrounds
            });
        }
    })
})

router.get("/new", function (req, res) {
    res.render("campground/new");
})

router.post("/", middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {
        name: name,
        image: image,
        description: description,
        author: author
    };
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
})

router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campground/show", {
                campground: foundCampground
            });
        }
    })
})

router.get("/:id/edit", middleware.checkCampgroundsOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campground/edit", {campground: foundCampground});
    })
})

router.put("/:id", middleware.checkCampgroundsOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

router.delete("/:id", middleware.checkCampgroundsOwnership, (req, res) => {
   Campground.findByIdAndRemove(req.params.id, (err) => {
       if(err){
           res.redirect("/campgrounds")
       } else {
           res.redirect("/campgrounds")
       }
   })
})


module.exports = router;