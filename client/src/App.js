import Admin from './Admin';
import Profile from './Profile';
import React, { useState } from 'react';
import { CssBaseline, Container, Button, Box } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Navigate,Link } from 'react-router-dom';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import Logout from './components/Authentication/Logout'
import ComponentStorePage from './pages/ComponentStorePage';
import ComponentCard from './ComponentCard'
import HomePage from './pages/HomePage'
import ReviewPage from './pages/ReviewPage'
import Review from './pages/Review'

import './styles/App.css'

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
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
