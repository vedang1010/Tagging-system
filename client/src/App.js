import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Upload_Idea from "./pages/Upload_Idea";
import Upload_Component from "./pages/Upload_Component";
import { CssBaseline, Container, Button, Box, Grid } from '@mui/material';
import '@fortawesome/fontawesome-free/css/all.css';

import ComponentStorePage from "./pages/ComponentStorePage";
// import Container from "./Container";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import Logout from "./components/Authentication/Logout";
import ComponentCard from "./pages/ComponentCard";
import HomePage from "./pages/HomePage";
import ReviewPage from "./pages/ReviewPage";
import Review from "./pages/Review";
import ReviewComponentPage from "./pages/ReviewComponentPage";
import Review2 from "./pages/Review2";
import Notifications from "./pages/Notifications";

// New imports

import Navbar from "./components/Layout/Navbar";
import './styles/App.css'
import ModifyComponent from "./pages/ModifyComponent";
import CurrentIssues from "./components/Issues/CurrentIssues";




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <>
      <Router>
        <Box sx={{ display: 'flex' }} className='most-outer-box'>
          <CssBaseline />
          {isAuthenticated && <Navbar />}
          <Routes>
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    // If authenticated, redirect to stored location or home
                    sessionStorage.getItem("location") ? (
                      <Navigate to={sessionStorage.getItem("location")} />
                    ) : (
                      <Navigate to="/home" />
                    )
                  ) : (
                    <Container  sx={{height:'100vh', display:'flex',alignItems:'center',justifyContent:'center'}} >
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' , }}>
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

              <Route path="/logout" element={
                isAuthenticated ? (
                  <>
                    <Logout onLogout={() => setIsAuthenticated(false)} />
                    <Navigate to="/" />
                  </>
                ) : (
                  <Navigate to="/" />
                )}
              />
          </Routes>
          {isAuthenticated && <Grid container spacing={0} className='outer-grid' sx={{

            minHeight:'100vh',
            '@media (min-width:900px)': {
              width: '85%',
            },
          }} >
            {/* <Box p={3} mt={8}> */}
            <Routes>
              <Route path="/componentStore" element={isAuthenticated ? <ComponentStorePage /> : <Navigate to="/" />} />
              <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />
              <Route path="/component/:id" element={isAuthenticated ? <ComponentCard /> : <Navigate to="/" />} />
              <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} />
              <Route path="/reviewidea" element={isAuthenticated ? <ReviewPage /> : <Navigate to="/" />} />
              <Route path="/review1/:objectId/:reviewId" element={isAuthenticated ? <Review /> : <Navigate to="/" />} />
              <Route path="/uploadcomponent/:id" element={isAuthenticated ? <Upload_Component /> : <Navigate to="/" />} />
              <Route path="/uploadIdea" element={isAuthenticated ? <Upload_Idea /> : <Navigate to="/" />} />
              <Route path="/currentissues" element={isAuthenticated ? <CurrentIssues /> : <Navigate to="/" />} />
              <Route path="/reviewcomponent" element={isAuthenticated ? <ReviewComponentPage /> : <Navigate to="/" />} />
              <Route path="/review2/:objectId/:reviewId" element={isAuthenticated ? <Review2 /> : <Navigate to="/" />} />
              <Route path="/modify/:id" element={isAuthenticated ? <ModifyComponent /> : <Navigate to="/" />} />
              <Route path="/notifications" element={isAuthenticated ? <Notifications /> : <Navigate to="/" />} />

            </Routes>
            {/* </Box> */}
          </Grid>
}
        </Box>
      </Router>
    </>
  )
};

export default App;
