import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Admin from "./Admin";
import Profile from "./Profile";
import Upload_Idea from "./Upload_Idea";
import Upload_Component from "./Upload_Component";
import { CssBaseline, Container, Button, Box } from '@mui/material';

import ComponentStorePage from "./components/ComponentStore/ComponentStorePage";
// import Container from "./Container";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import Logout from "./components/Authentication/Logout";
import ComponentCard from "./ComponentCard";
import HomePage from "./pages/HomePage";
import ReviewPage from "./pages/ReviewPage";
import Review from "./pages/Review";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };
  //   const { scrollYProgress } = useScroll();
  // const scaleX = useSpring(scrollYProgress, {
  //   stiffness: 100,
  //   damping: 30,
  //   restDelta: 0.001
  // });
  return (
    <>

    {/* <motion.div className="progress-bar" style={{ scaleX }} /> */}

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
        <Link to="/components">
          <button>Go to Component Store</button>
        </Link>
        <Link to="/review">
          <button>Review Page</button>
        </Link>
        <Link to="/uploadComponent">
          <button> uploadComponent</button>
        </Link>
        <Link to="/uploadIdea">
          <button> uploadIdea</button>
        </Link>
        <CssBaseline />
        <Routes>
        <Route
          path="/components"
          element={isAuthenticated ? <ComponentStorePage /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/components" />
            ) : (
              <Container>
                <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {isLoginView ? (
                    <Login onLogin={() => setIsAuthenticated(true)} />
                  ) : (
                    <Signup onComplete={() => setIsLoginView(true)} />
                  )}
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    {isLoginView ? <p>Don't have an account?</p> : <p>Already have an account?</p>}
                    <Button onClick={toggleView}>
                      {isLoginView ? 'Signup' : 'Login'}
                    </Button>
                  </Box>
                </Box>
              </Container>
            )
          }
        />
        <Route
          path="/logout"
          element={
            isAuthenticated ? ( 
              <>
              <Logout onLogout={() => setIsAuthenticated(false)} />
              <Navigate to="/" />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/component/:id" element={<ComponentCard />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/review1" element={<Review />} />
          <Route path="/uploadComponent" element={<Upload_Component />} />
          <Route path="/uploadIdea" element={<Upload_Idea/>} />

        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
