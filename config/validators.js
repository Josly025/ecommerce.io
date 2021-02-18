const { check } = require("express-validator");

module.exports = {
  requireTitle: check("title")
    .trim()
    .isLength({ min: 5, max: 35 })
    .withMessage("Title should be between 5 and 35 characters"),
  requirePrice: check("price")
    .trim()
    .toFloat()
    .isFloat({ min: 1 })
    .withMessage("Price should be greater than 1"),
};
