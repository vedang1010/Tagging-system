import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Admin from "./Admin";
import Profile from "./Profile";
import ComponentStore from "./ComponentStore";
import ComponentDetails from "./components/ComponentDetails";
import Upload_Idea from "./Upload_Idea";
import Upload_Component from "./Upload_Component";
// import Temp from './Temp';
import Text_Editor from './Text_Editor';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="flex justify-around items-center w-full bg-gray-300">
          <Link to="/" className="ml-4">
            <button className=" focus:text-blue-500">
              Go to Home Page
            </button>
          </Link>
          <Link to="/admin" className="m-4">
            <button className=" focus:text-blue-500">
              Go to Admin Page
            </button>
          </Link>
          <Link to="/profile" className="m-4">
            <button className=" focus:text-blue-500">
              Go to Profile Page
            </button>
          </Link>
          <Link to="/component-store" className="m-4">
            <button className=" focus:text-blue-500">
              Go to Component Store
            </button>
          </Link>
          <Link to="/Upload_Idea" className="m-4">
            <button className=" focus:text-blue-500">
              Upload Idea
            </button>
          </Link>
          <Link to="/Upload_Component" className="m-4">
            <button className=" focus:text-blue-500">
              Upload Component
            </button>
          </Link>
          <Link to="/Text_Editor" className="m-4">
            <button className=" focus:text-blue-500">
              Text Editor
            </button>
          </Link>
        </div>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/component-store" element={<ComponentStore />} />
          <Route path="/component/:id" element={<ComponentDetails />} />
          <Route path="/Upload_Idea" element={<Upload_Idea />} />
          <Route path="/Upload_Component" element={<Upload_Component />} />
          <Route path="/Text_Editor" element={<Text_Editor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
