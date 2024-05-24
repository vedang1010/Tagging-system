// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Admin from './Admin';
import Profile from './Profile';
function App() {
  return (
    <Router>
      <div className="App">
        <h1>This is client home page</h1>
        <Link to="/">
          <button>Go to Home Page</button>
        </Link>
        <Link to="/Admin">
          <button>Go to Admin Page</button>
        </Link>
        <Link to="/Profile">
          <button>Go to Profile Page</button>
        </Link>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
