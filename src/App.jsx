import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Scan from './pages/Scan';
import CareGuide from './pages/CareGuide';
import MyPlants from './pages/MyPlants';
import About from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedUser = localStorage.getItem('leaflens_user');
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
    }
    setLoading(false);
  }, []);

  const isLoggedIn = !!user;

  if (loading) return null;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/settings" element={<Settings user={user} />} />
        <Route
          path="/"
          element={isLoggedIn ? <Home user={user} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/scan"
          element={isLoggedIn ? <Scan /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/care"
          element={isLoggedIn ? <CareGuide /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/myplants"
          element={isLoggedIn ? <MyPlants /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/about"
          element={isLoggedIn ? <About /> : <Navigate to="/login" replace />}
        />
      </Routes>
      {isLoggedIn && <Navbar />}
    </Router>
  );
}

export default App;
