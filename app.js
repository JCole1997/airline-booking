var express = require("express");
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
passport = require("passport"),
LocalStrategy = require("passport-local"),
methodOverride = require("method-override"),
User = require("./models/user"),
Airline = require("./models/airline"),
seedDB = require("./seeds");

var indexRoute = require("./routes/index");
var ticketRoute = require("./routes/tickets");
var adminRoute = require("./routes/admin")

// CONFIG
mongoose.connect("mongodb://localhost:27017/airline", {
    useNewUrlParser: true,   
    useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use(require("express-session")({
    secret: "Anything",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// seedDB();

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

//ROUTE
app.use("/", indexRoute);
app.use("/tickets", ticketRoute);
app.use("/admin", adminRoute);

app.listen(3000);