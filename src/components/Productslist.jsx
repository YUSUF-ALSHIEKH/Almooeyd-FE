import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import "../App.css"

const Products = ({ user }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data)
      })
      .catch((error) => {
        console.error("Error fetching products:", error)
      })
  }

  return (
    <div className="products-page-container" style={{ padding: "20px" }}>
      {user && (
        <div className="add-product-action" style={{ marginBottom: "20px" }}>
          <Link to="/add-product" className="add-product-link">
            Go to Add Product Page
          </Link>
        </div>
      )}

      <h2>Products List</h2>

      {products.length === 0 ? (
        <p>No products available yet.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="product-card-link"
            >
              <div className="product-card">
                <div className="product-image-container">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="product-image"
                    />
                  ) : (
                    <div className="no-image-placeholder">No Image</div>
                  )}
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-price">Price: ${product.price}</p>
                  <p className="product-desc">{product.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Products
