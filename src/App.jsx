import React, { useState, useEffect } from "react"
import { Routes, Route, Link, useLocation } from "react-router-dom"
import axios from "axios"
import Home from "./components/Home"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import Navbar from "./components/Navbar"
import AddProduct from "./components/AddProduct"
import ProductDetails from "./components/ProductDetails"
function App() {
  const [user, setUser] = useState(null)
  const location = useLocation()

  // Check session on page load
  useEffect(() => {
    const checkUserToken = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:5000/auth/session",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          setUser(response.data) // Restores the user state from the token payload!
        } catch (err) {
          console.error("Session expired or invalid token", err)
          localStorage.removeItem("token") // Clear invalid token
          setUser(null)
        }
      }
    }
    checkUserToken()
  }, [])

  return (
    <div className="app-container">
      <Navbar user={user} setUser={setUser} />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/add-product" element={<AddProduct user={user} />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/signup" element={<SignUp setUser={setUser} />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
