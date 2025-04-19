import React, { useEffect, useState } from "react";
import { BarcodeScanner } from "./BarcodeScanner";
import KanbanBoard from "./KanbanBoard";
import axios from "axios";

export const Inventory = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/products/inventory"
      );
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleNewProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  return (
    <div className="container mt-5">
      <h2>📦 Inventory Management</h2>
      <BarcodeScanner onProductAdded={handleNewProduct} products={products} />
      <KanbanBoard products={products} />
    </div>
  );
};
