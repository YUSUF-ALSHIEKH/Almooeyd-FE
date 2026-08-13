import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import "../App.css"

const BASE_URL = "http://localhost:5000/"

const SignUp = ({ setUser }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const response = await axios.post(`${BASE_URL}auth/signup`, {
        name,
        email,
        password,
      })

      const newUser = response.data.user
      setUser(newUser)
      navigate("/")
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message
      setError(errorMsg || "Failed to sign up. Please try again.")
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-form">
        <h2>Create Account</h2>

        {error && <div className="auth-error-box">{error}</div>}

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
          Register
        </button>

        <p className="auth-redirect-text">
          Already have an account? <Link to="/signin">Sign in here</Link>
        </p>
      </form>
    </div>
  )
}

export default SignUp
