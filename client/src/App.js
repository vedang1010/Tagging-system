import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Admin from './Admin';
import Profile from './Profile';
import ComponentStore from './ComponentStore';
import ComponentCard from './ComponentCard';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>This is client home page</h1>
        <Link to="/">
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
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/component-store" element={<ComponentStore />} />
          <Route path="/component/:id" element={<ComponentCard />} />
          <Route path="/tags/:tag" element={<ComponentStore />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
