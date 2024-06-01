import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Admin from './Admin';
import Profile from './Profile';
import ComponentStore from './ComponentStore';
import ComponentDetails from './components/ComponentDetails';
import HomePage from './pages/HomePage';
import Review from './pages/Review';

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/home">
          <button>Go to Home Page</button>
        </Link>
        <Link to="/admin">
          <button>Go to Admin Page</button>
        </Link>
        <Link to="/profile">
          <button>Go to Profile Page</button>
        </Link>
        <Link to="/component-store">
          <button>Go to Component Store</button>
        </Link>
        <Link to="/review">
          <button>Review Page</button>
        </Link>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/component-store" element={<ComponentStore />} />
          <Route path="/component/:id" element={<ComponentDetails />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
