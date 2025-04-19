const asyncHandler = require("express-async-handler");
const { Product } = require("../models.js");
const axios = require("axios");

const scanProduct = asyncHandler(async (req, res) => {
  const barcode = req.params.barcode;
  console.log("🔍 Scanning barcode:", barcode);

  const existing = await Product.findOne({ barcode });
  if (existing) {
    console.log("📦 Product found in DB:", existing);
    return res.json(existing);
  }

  try {
    const { data } = await axios.get(
      `https://products-test-aci.onrender.com/product/${barcode}`
    );

    console.log("🌐 API data received:", data);

    if (!data.product) {
      throw new Error("Invalid product structure from external API");
    }

    const product = await Product.create({
      barcode: data.product.barcode,
      name: data.product.description || "Unknown Product", // Use description as name
      description: data.product.material || "",
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("❌ External API fetch failed:", error.message);
    res.status(404);
    throw new Error("Product not found via external API");
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});
const updateProductCategory = async (req, res) => {
  const { barcode } = req.params;
  const { name, description, category } = req.body;

  try {
    const product = await Product.findOneAndUpdate(
      { barcode },
      {
        ...(category && { category }),
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { scanProduct, getAllProducts, updateProductCategory };
