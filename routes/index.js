const express = require("express");
const { ensureAutheticated } = require("../config/auth");
const { requireTitle, requirePrice } = require("../config/validators");
const fs = require("fs");
const multer = require("multer");
const myCss = {
  style: fs.readFileSync("./public/css/style.css", "utf8"),
};
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const productsRepo = require("../repositories/products");

// at "/ " render the welcome view
router.get("/", (req, res) => {
  res.render("welcome"),
    {
      myCss: myCss,
    };
});

// Dashboard -- protected view wiåßh config/ensureAutheticated
router.get("/dashboard", ensureAutheticated, async (req, res) => {
  const products = await productsRepo.getAll();

  res.render("dashboard", {
    name: req.user.name,
    products: products,
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
router.post(
  "/newProduct",
  upload.single("image"),
  [requireTitle, requirePrice],

  (req, res) => {
    //info for the form is in req.body
    console.log(req.body);
    //base64 is how to handle images in string format
    const image = req.file.buffer.toString("base64");
    const { title, price } = req.body;
    productsRepo.create({ title, price, image });
    res.redirect("/dashboard");
  }
);

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
