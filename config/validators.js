const { check } = require("express-validator");

module.exports = {
  requireTitle: check("title").trim().isLength({ min: 5, max: 35 }),
  requirePrice: check("price").trim().toFloat().isFloat({ min: 1 }),
};
