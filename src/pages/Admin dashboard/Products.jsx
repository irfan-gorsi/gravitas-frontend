import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ShowProducts from "../../components/admin components/ShowProducts"; // Import the ShowProducts component

const Product = () => {
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    stock: "",
    images: [],
    colors: [],
    sizes: [],
  });

  const categories = {
    Tops: ["T-shirts", "Polos", "Casual Shirts"],
    Bottoms: ["Jeans", "Chinos", "Trousers", "Shorts"],
    Footwear: ["Formals", "Semi-Formals", "Casual", "Sneakers"],
    Accessories: ["Bracelets", "Belts", "Caps"],
  };

  const availableColors = [ "Blue", "Black", "White", "Green","Pink","Grey","Red","Beige"];
  const availableSizes = ["S", "M", "L", "XL", "XXL"];

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setNewProduct({ ...newProduct, category: e.target.value, subcategory: "" });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setNewProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...selectedFiles.filter(file => !prev.images.includes(file))],
    }));
  };

  const removeImage = (index) => {
    setNewProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleColorChange = (e) => {
    const color = e.target.value;
    setNewProduct((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const handleSizeChange = (e) => {
    const size = e.target.value;
    setNewProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(newProduct).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, value);
      }
    });

    try {
      await axios.post("https://gravitas-backend.up.railway.app/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      alert("Product added successfully!");
      setShowForm(false);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        subcategory: "",
        stock: "",
        images: [],
        colors: [],
        sizes: [],
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="container mt-4">
      <Button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add Product"}
      </Button>

      {showForm && (
        <Form onSubmit={handleSubmit} className="mt-3">
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={newProduct.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select name="category" value={newProduct.category} onChange={handleCategoryChange} required>
              <option value="">Select Category</option>
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </Form.Group>

          {newProduct.category && (
            <Form.Group>
              <Form.Label>Subcategory</Form.Label>
              <Form.Select name="subcategory" value={newProduct.subcategory} onChange={handleChange} required>
                <option value="">Select Subcategory</option>
                {categories[newProduct.category].map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="description" value={newProduct.description} onChange={handleChange} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" value={newProduct.price} onChange={handleChange} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" name="stock" value={newProduct.stock} onChange={handleChange} required />
          </Form.Group>

          {/* Image Selection */}
          <Form.Group>
            <Form.Label>Product Images</Form.Label>
            <Form.Control type="file" name="images" onChange={handleFileChange} multiple />
          </Form.Group>

          {/* Show Selected Images */}
          <div className="mt-2 d-flex gap-2 flex-wrap">
            {newProduct.images.map((image, index) => (
              <div key={index} style={{ position: "relative" }}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Selected ${index + 1}`}
                  style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px" }}
                />
                <Button variant="danger" size="sm" onClick={() => removeImage(index)} style={{ position: "absolute", top: 0, right: 0 }}>
                  X
                </Button>
              </div>
            ))}
          </div>

          {/* Colors Selection */}
          <Form.Group>
            <Form.Label>Colors</Form.Label>
            <div>
              {availableColors.map((color) => (
                <Form.Check
                  key={color}
                  inline
                  label={color}
                  value={color}
                  type="checkbox"
                  checked={newProduct.colors.includes(color)}
                  onChange={handleColorChange}
                />
              ))}
            </div>
          </Form.Group>

          {/* Sizes Selection */}
          <Form.Group>
            <Form.Label>Sizes</Form.Label>
            <div>
              {availableSizes.map((size) => (
                <Form.Check
                  key={size}
                  inline
                  label={size}
                  value={size}
                  type="checkbox"
                  checked={newProduct.sizes.includes(size)}
                  onChange={handleSizeChange}
                />
              ))}
            </div>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      )}

      <ShowProducts />
    </div>
  );
};

export default Product;
