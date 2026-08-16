import React from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import "../App.css"

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate()
  const location = useLocation() // Detects the current URL path

  const handleLogout = () => {
    localStorage.removeItem("userToken")
    localStorage.removeItem("userId")
    localStorage.removeItem("userName")
    localStorage.removeItem("userRole")
    localStorage.removeItem("token")
    setUser(null)
    navigate("/signin")
  }

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>
      </div>

      <div className="nav-links">
        {user ? (
          <div className="user-section">
            <span className="welcome-text">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-links">
            {/* Hide 'Sign In' link if we are currently on the /signin page */}
            {location.pathname !== "/signin" && (
              <Link to="/signin">Sign In</Link>
            )}

            {/* Hide 'Sign Up' link if we are currently on the /signup page */}
            {location.pathname !== "/signup" && (
              <Link to="/signup">Sign Up</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
