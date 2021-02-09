// const express = require("express");
// const router = express.Router();
// const { ensureAutheticated } = require("../config/auth");
// var fs = require("fs");
// const myCss = {
//   style: fs.readFileSync("./public/css/style.css", "utf8"),
// };

// // at "/ " render the welcome view
// router.get("/", (req, res) => {
//   res.render("welcome"),
//     {
//       myCss: myCss,
//     };
// });

// // Dashboard -- protected view with config/ensureAutheticated
// router.get("/dashboard", ensureAutheticated, (req, res) => {
//   res.render("dashboard", {
//     name: req.user.name,
//   }),
//     {
//       myCss: myCss,
//     };
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));

// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    user: req.user.name,
  })
);

module.exports = router;
