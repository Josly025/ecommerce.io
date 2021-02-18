const express = require("express");
const router = express.Router();
const { ensureAutheticated } = require("../config/auth");
const { requireTitle, requirePrice } = require("../config/validators");
var fs = require("fs");
const myCss = {
  style: fs.readFileSync("./public/css/style.css", "utf8"),
};
const productsRepo = require("../repositories/products");
// at "/ " render the welcome view
router.get("/", (req, res) => {
  res.render("welcome"),
    {
      myCss: myCss,
    };
});

// Dashboard -- protected view with config/ensureAutheticated
router.get("/dashboard", ensureAutheticated, (req, res) => {
  res.render("dashboard", {
    name: req.user.name,
  }),
    {
      myCss: myCss,
    };
});
///Routes for newProduct -- Creating a new Product
router.get("/newProduct", (req, res) => {
  res.render("newProduct", {
    name: req.user.name,
  }),
    {
      myCss: myCss,
    };
});
//handle the form submission
router.post("/newProduct", [requireTitle, requirePrice], (req, res) => {
  res.send("submitted");
  //info for the form is in req.body
  console.log(req.body);
});

router.get("/cart", (req, res) => {
  res.render("cart", {
    name: req.user.name,
  }),
    {
      myCss: myCss,
    };
});

router.get("/admin", (req, res) => {
  res.render("admin", {
    name: req.user.name,
  }),
    {
      myCss: myCss,
    };
});

module.exports = router;
