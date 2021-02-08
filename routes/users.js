const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

//User model
const User = require("../models/User");

//singup page
router.get("/signup", (req, res) => {
  res.render("signup");
});

//login page
router.get("/login", (req, res) => {
  res.render("login");
});

//Handle the SignUp(log form data)
router.post("/signup", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //check fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please ensure that all fields are filled." });
  }
  //check password matching
  if (password !== password2) {
    errors.push({ msg: "Please check that your password match." });
  }

  // Check if password is length
  if (password.length < 6) {
    errors.push({ msg: "Password must be greater than 6 characters." });
  }

  if (errors.length > 0) {
    res.render("signup", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    /// all validations pass
    User.findOne({
      email: email,
    }).then((user) => {
      if (user) {
        ///user is valid
        error.push({ msg: "Email is already signed up." });
        res.render("signup", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });
        // Hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //set password to hash --
            newUser.password = hash;
            //save user
            newUser
              .save()
              .then((user) => {
                req.flash("success_msg", "Successful Sign Up! Please log in.");
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

//handle the login

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

//handle logout

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Successfully logged out - See you next time!");
  res.redirect("/users/login");
});

module.exports = router;
