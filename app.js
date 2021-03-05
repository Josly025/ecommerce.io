const express = require("express");
const PORT = process.env.PORT || 8081;
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
//using flash method because we are redirecting and want to store it in the session
const flash = require("connect-flash");
const session = require("express-session");
const methodOverride = require("method-override");
require("./config/passport")(passport);
const cookieSession = require("cookie-session");
const app = express();

//Connect to DB
const db = require("./config/keys").MongoURI;
app.use(methodOverride("_method"));
//Connect to Mongo with mongoose
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB connected!"))
  .catch((err) => console.log(err));

//ejs middlewearLayouts
app.use(expressLayouts);
app.set("view engine", "ejs");
app.get("./public/images/snow.ico", (req, res) => res.status(204));
///Reference to css
app.use(express.static("./public"));
app.use("/js/shop", express.static(__dirname + "public"));
//Bodypraser from forms
app.use(express.urlencoded({ extended: false }));

/// Express session middleware
//took out cookie
app.use(
  cookieSession({
    secret: "secret coding",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//variables
//custom middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("success_msg");
  res.locals.error = req.flash("error");
  next();
});

//ROUTES!!! - index vs. users file
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));

/////
//Start listening at localhost:3000
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}!!!`);
});
