const express = require("express");
const router = express.Router();

//list products
router.get("/products", (req, res) => {});

//create product form
router.get("/products/new", (req, res) => {});

//edits
// router.put("/products/edit", (req, res) => {});

//deletion
// router.delete("/products/delete", (req, res) => {});

module.exports = router;
