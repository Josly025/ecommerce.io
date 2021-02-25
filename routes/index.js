const express = require("express");
const { ensureAutheticated } = require("../config/auth");
const { requireTitle, requirePrice } = require("../config/validators");
const fs = require("fs");
const multer = require("multer");
const cartsRepo = require("../repositories/carts");
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

router.get("/admin", async (req, res) => {
  const productsTwo = await productsRepo.getAll();
  res.render("admin", {
    name: req.user.name,
    productsTwo: productsTwo,
  }),
    {
      myCss: myCss,
    };
});

///delete product from admin page
router.delete("admin/:id/delete", async (req, res) => {
  await productsRepo.delete(req.params.id);

  res.redirect("/admin");
});

//shopping Cart routes
router.get("/cart", async (req, res) => {
  const cartProducts = await cartsRepo.getAll();

  res.render("cart", {
    name: req.user.name,
    cartProducts: cartProducts,
  }),
    {
      myCss: myCss,
    };
});

router.post("/cart/item", async (req, res) => {
  console.log(req.body.productId);
  let cart;
  if (!req.session.cartId) {
    let cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    let cart = await cartsRepo.getOne(req.session.cartId);
  }
  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  await cartsRepo.update(cart.id),
    {
      items: carts.items,
    };
  res.render("cart", {
    name: req.user.name,
    items: cart.items,
  }),
    {
      myCss: myCss,
    };
});

router.post("/cart/delete", async (req, res) => {
  const { itemId } = req.body;
  const cart = await cartsRepo.getOne(req.session.cartId);
  const items = cart.items.filter((item) => item.id !== itemId);
  await cartsRepo.update(req.session.cartId, { items });
  res.redirect("/cart");
});

module.exports = router;
