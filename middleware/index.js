var middlewareObj = {};

middlewareObj.isAdminLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
      if (req.user.username == "admin"){
          return next();
      } else {
          res.redirect("/landing");
      }
  } else {
    res.redirect("/login");
  }
};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}

module.exports = middlewareObj