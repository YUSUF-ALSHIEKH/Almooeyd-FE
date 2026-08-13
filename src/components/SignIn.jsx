import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import "../App.css"

const BASE_URL = "http://localhost:5000/"

const SignIn = ({ setUser }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const response = await axios.post(`${BASE_URL}auth/login`, {
        email,
        password,
      })
      console.log("Response from server:", response.data)

      localStorage.setItem("token", response.data.token)

      const loggedInUser = response.data.user
      setUser(loggedInUser)
      navigate("/")
    } catch (err) {
      console.error("Frontend catch error:", err)
      const errorMsg = err.response?.data?.message || err.message

      if (
        errorMsg.toLowerCase().includes("not found") ||
        errorMsg.toLowerCase().includes("email")
      ) {
        setError("Email not found. Please sign up first!")
      } else {
        setError("Invalid email or password.")
      }
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Sign In</h2>

        {error && <div className="auth-error-box">{error}</div>}

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-submit-btn">
          Login
        </button>

        {error.includes("sign up") && (
          <p className="auth-redirect-text">
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
        )}
      </form>
    </div>
  )
}

export default SignIn
