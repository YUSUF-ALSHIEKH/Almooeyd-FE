import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import "../App.css"

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching product details:", err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="auth-container">Loading...</div>
  if (!product)
    return (
      <div className="auth-container">
        <h2>Product not found</h2>
      </div>
    )

  return (
    <div className="auth-container">
      <div className="auth-form product-details-card">
        <h2>{product.name}</h2>

        {product.image_url && (
          <img
            src={product.image_url}
            alt={product.name}
            className="product-details-img"
          />
        )}

        <p className="product-price">Price: ${product.price}</p>
        <p className="product-details-desc">{product.description}</p>

        <div
          className="auth-redirect-text"
          style={{ marginTop: "2rem", textAlign: "center" }}
        >
          <Link
            to="/"
            className="auth-submit-btn"
            style={{
              textDecoration: "none",
              display: "inline-block",
              color: "#ffffff",
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
