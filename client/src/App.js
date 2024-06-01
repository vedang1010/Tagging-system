import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Admin from './Admin';
import Profile from './Profile';
import ComponentStore from './ComponentStore';
import ComponentCard from './ComponentCard';
import { motion, useScroll, useSpring } from "framer-motion";
import HomePage from './pages/HomePage';

function App() {
    const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  return (
    <>

    <motion.div className="progress-bar" style={{ scaleX }} />

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
          <Route path="/component-store" element={<ComponentStore />} />
          <Route path="/component/:id" element={<ComponentCard />} />
          <Route path="/tags/:tag" element={<ComponentStore />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
