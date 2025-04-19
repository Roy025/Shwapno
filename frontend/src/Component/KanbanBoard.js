import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function KanbanBoard({ products: initialProducts = [] }) {
  const [categories, setCategories] = useState([
    "Uncategorized",
    "In Stock",
    "Sold",
  ]);
  const [products, setProducts] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [draggedProduct, setDraggedProduct] = useState(null);
  const [draggedOver, setDraggedOver] = useState(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const newCategoryInputRef = useRef(null);

  useEffect(() => {
    const productsWithCategories = initialProducts.map((product) => ({
      ...product,
      category: product.category || "Uncategorized",
    }));

    setProducts(productsWithCategories);

    const productCategories = [
      ...new Set(productsWithCategories.map((p) => p.category)),
    ];
    const newCategories = productCategories.filter(
      (cat) => !categories.includes(cat)
    );

    if (newCategories.length > 0) {
      setCategories((prevCategories) => [...prevCategories, ...newCategories]);
    }
  }, [initialProducts]);

  const handleDragStart = (product) => {
    setDraggedProduct(product);
  };

  const handleDragOver = (e, category) => {
    e.preventDefault();
    setDraggedOver(category);
  };

  const handleDrop = (e, targetCategory) => {
    e.preventDefault();
    if (draggedProduct) {
      updateProductCategory(draggedProduct.barcode, targetCategory);

      setDraggedProduct(null);
      setDraggedOver(null);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== "" && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
      setIsAddingCategory(false);
    }
  };

  const toggleAddCategory = () => {
    setIsAddingCategory(!isAddingCategory);
    if (!isAddingCategory) {
      setTimeout(() => {
        newCategoryInputRef.current?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddCategory();
    } else if (e.key === "Escape") {
      setIsAddingCategory(false);
      setNewCategory("");
    }
  };

  const updateProductCategory = async (barcode, newCategory) => {
    try {
      await axios.put(`http://localhost:3000/api/products/update/${barcode}`, {
        category: newCategory,
      });

      const updatedProducts = products.map((product) => {
        if (product.barcode === barcode) {
          return { ...product, category: newCategory };
        }
        return product;
      });

      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error updating product category:", error);
    }
  };
  const handleTouchStart = (e, product) => {
    const touchInfo = {
      startTime: Date.now(),
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
    };

    setDraggedProduct({ ...product, _touchInfo: touchInfo });
  };

  const handleTouchMove = (e, product, category) => {
    if (!draggedProduct || !draggedProduct._touchInfo) return;

    const deltaX = e.touches[0].clientX - draggedProduct._touchInfo.startX;
    const deltaY = e.touches[0].clientY - draggedProduct._touchInfo.startY;

    if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
      setDraggedOver(category);
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e, targetCategory) => {
    if (draggedProduct && draggedOver) {
      updateProductCategory(draggedProduct.barcode, targetCategory);
    }

    setDraggedProduct(null);
    setDraggedOver(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Kanban Board</h2>
        <div className="flex items-center">
          {isAddingCategory ? (
            <div className="flex">
              <input
                ref={newCategoryInputRef}
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Category name"
                className="border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddCategory}
                className="bg-info text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none"
              >
                Add
              </button>
            </div>
          ) : (
            <button
              onClick={toggleAddCategory}
              className="bg-info text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none flex items-center"
            >
              <span className="mr-1">+</span> New Category
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4">
        {categories.map((category) => (
          <div
            key={category}
            className={`flex-shrink-0 w-full md:w-72 bg-gray-100 rounded-lg shadow ${
              draggedOver === category ? "bg-gray-200" : ""
            }`}
            onDragOver={(e) => handleDragOver(e, category)}
            onDrop={(e) => handleDrop(e, category)}
            onTouchEnd={(e) => handleTouchEnd(e, category)}
          >
            <div className="p-3 bg-gray-200 rounded-t-lg">
              <h3 className="font-bold text-gray-700">{category}</h3>
              <div className="text-sm text-gray-500">
                {products.filter((p) => p.category === category).length} items
              </div>
            </div>

            <div className="p-2 min-h-64">
              {products
                .filter((p) => p.category === category)
                .map((product) => (
                  <div
                    key={product._id}
                    className={`bg-white p-3 rounded mb-2 shadow cursor-grab ${
                      draggedProduct?._id === product._id ? "opacity-50" : ""
                    }`}
                    draggable
                    onDragStart={() => handleDragStart(product)}
                    onTouchStart={(e) => handleTouchStart(e, product)}
                    onTouchMove={(e) => handleTouchMove(e, product, category)}
                  >
                    <p className="text-base font-semibold mb-2">
                      {product.name}
                    </p>

                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Barcode:</span>{" "}
                      <span className="font-bold">{product.barcode}</span>
                    </p>

                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Material:</span>{" "}
                      <span className="font-bold">{product.description}</span>
                    </p>

                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Category:</span>{" "}
                      <span className="font-bold">{product.category}</span>
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
