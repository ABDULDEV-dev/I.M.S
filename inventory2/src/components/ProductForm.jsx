"use client"

import { useState, useEffect } from "react"
import BackToHomeButtom from "./BackToHomeButtom"

function ProductForm({ addProduct, setCurrentPage }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
    image: "",
  })
  const [localImages, setLocalImages] = useState([])

  useEffect(() => {
    // Fetch images from localStorage
    const storedImages = JSON.parse(localStorage.getItem("inventoryImages") || "[]")
    setLocalImages(storedImages)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "price" || name === "quantity") {
      // Remove commas and convert to number
      const numValue = Number(value.replace(/,/g, ""))
      setProduct((prev) => ({
        ...prev,
        [name]: isNaN(numValue) ? "" : numValue,
      }))
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImage = reader.result
        setProduct((prev) => ({ ...prev, image: newImage }))
        // Add the new image to localStorage
        const updatedImages = [...localImages, newImage]
        localStorage.setItem("inventoryImages", JSON.stringify(updatedImages))
        setLocalImages(updatedImages)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addProduct(product)
    setProduct({ name: "", price: "", category: "", quantity: "", image: "" })
    setCurrentPage("view-inventory")
  }

  const formatNumber = (num) => {
    return num >= 1000 ? num.toLocaleString("en-US") : num.toString()
  }

  return (
    <main className="product-form">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name</label>
          <input id="name" name="name" value={product.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="text"
            value={product.price ? formatNumber(product.price) : ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={product.category} onChange={handleChange} required>
            <option value="">Select a category</option>
            <option value="shoes">Shoes</option>
            <option value="clothing">Clothing</option>
            <option value="food">Food</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            name="quantity"
            type="text"
            value={product.quantity ? formatNumber(product.quantity) : ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Product Image</label>
          <input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {product.image && (
          <div className="image-preview">
            <img src={product.image || "/placeholder.svg"} alt="Product" />
          </div>
        )}
        <div>
          <label>Select from existing images:</label>
          <div className="image-gallery">
            {localImages.map((img, index) => (
              <img
                key={index}
                src={img || "/placeholder.svg"}
                alt={`Stored image ${index}`}
                onClick={() => setProduct((prev) => ({ ...prev, image: img }))}
                className={product.image === img ? "selected" : ""}
              />
            ))}
          </div>
        </div>
        <button type="submit">Add Product</button>
      </form>
      <BackToHomeButtom setCurrentPage={setCurrentPage} />
    </main>
  )
}

export default ProductForm

