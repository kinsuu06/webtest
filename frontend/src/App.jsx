import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Navbar from './components/Navbar';
import Note from './pages/Note';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  const init = async () => {
    const rawToken = localStorage.getItem("tokens");
    if (rawToken) {
      try {
        // Fetch user data from backend
        const res = await fetch("http://localhost:5000/user", {
          headers: {
            Authorization: `Bearer ${JSON.parse(rawToken).accessToken}`,
          },
        });
        if (res.ok) {
          const userData = await res.json();
          setIsAuthenticated(true);
          setUsername(userData.username); // Set the username from backend
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setIsAuthenticated(false);
      }
    }
  };

  const onLogin = (username) => {
    setIsAuthenticated(true);
    setUsername(username);
  };

  const onLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    localStorage.removeItem("tokens"); // Clear tokens on logout
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Router>
      <div>
      <Navbar isLoggedIn={isAuthenticated} username={username} onLogout={onLogout} />
        <Routes>
          <Route path="/register" element={<Signup onSignup={onLogin} />} />
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          
        </Routes>
        <Note/>
      </div>
    </Router>
  );
}

export default App;
