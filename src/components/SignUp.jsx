import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

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
    <div>
      <form onSubmit={handleRegister}>
        <h2>Sign Up</h2>

        {error && <p>{error}</p>}

        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Register</button>

        <p>
          Already have an account? <Link to="/signin">Sign in here</Link>
        </p>
      </form>
    </div>
  )
}

export default SignUp
