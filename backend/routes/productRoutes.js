const express = require("express");
const router = express.Router();
const {
  scanProduct,
  getAllProducts,
  updateProductCategory,
} = require("../controllers/productController.js");

router.get("/scan/:barcode", scanProduct);
router.get("/inventory", getAllProducts);
router.put("/update/:barcode", updateProductCategory);

module.exports = router;
