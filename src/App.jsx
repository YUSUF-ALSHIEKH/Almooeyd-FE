import React, { useState } from "react"
import { Routes, Route, Link, useLocation } from "react-router-dom"
import Home from "./components/Home"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
function App() {
  const [user, setUser] = useState(null)
  const location = useLocation()
  return (
    <div className="app-container">
      <nav className="navbar">
        <Link to="/">Home</Link>
        {location.pathname !== "/signin" && <Link to="/signin">Sign In</Link>}
        {location.pathname !== "/signup" && <Link to="/signup">Sign Up</Link>}
      </nav>

      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp setUser={setUser} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
