module.exports = {
  ensureAutheticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Log in order to view the Dashboard.");
    req.redirect("users/login");
  },
};
