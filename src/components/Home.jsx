import React from "react"
import { Link } from "react-router-dom"
import "../App.css"

const Home = ({ user }) => {
  return (
    <div className="home-container">
      {user ? (
        <div className="welcome-section">
          <h1>Welcome, {user.name} to mooyed</h1>
        </div>
      ) : (
        <div className="welcome-guest">
          <h1>Welcome to mooyed</h1>
          <p>Please sign in or sign up to continue.</p>
          <div className="auth-actions">
            <Link to="/signin">Sign In</Link> |{" "}
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      )}

      <hr className="home-divider" />

      <div className="about-section">
        <h2>About Al-Mooyed</h2>
        <p className="about-text-primary">
          Welcome to <strong>Al-Mooyed</strong>, your premier destination for
          discovering, exploring, and managing a wide range of products all in
          one convenient platform. Whether you are looking to browse the latest
          items as a guest or manage your own product catalog after signing in,
          we provide a seamless and user-friendly experience.
        </p>
        <p className="about-text-secondary">
          Head over to the <Link to="/products">Products</Link> page to explore
          everything we have to offer today!
        </p>
      </div>
    </div>
  )
}

export default Home
