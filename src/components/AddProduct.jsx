import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../App.css"

const AddProduct = ({ user }) => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleAddProduct = async (e) => {
    e.preventDefault()
    setMessage("")

    try {
      await axios.post("http://localhost:5000/api/products/add", {
        name,
        price,
        description,
        imageUrl,
        userId: user?.id,
      })

      setMessage("Product added successfully! Redirecting...")
      setTimeout(() => {
        navigate("/")
      }, 1500)
    } catch (err) {
      console.error(err)
      setMessage("Failed to add product.")
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleAddProduct} className="auth-form">
        <h2>Add a New Product</h2>

        {message && (
          <div
            className={
              message.includes("success")
                ? "auth-success-box"
                : "auth-error-box"
            }
          >
            {message}
          </div>
        )}

        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            style={{
              padding: "0.75rem 1rem",
              fontSize: "1rem",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              outline: "none",
              backgroundColor: "#f9fafb",
              fontFamily: "inherit",
              resize: "vertical",
            }}
          />
        </div>

        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            placeholder="https://..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <button type="submit" className="auth-submit-btn">
          Submit Product
        </button>
      </form>
    </div>
  )
}

export default AddProduct
