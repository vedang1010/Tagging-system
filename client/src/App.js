import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Upload_Idea from "./pages/Upload_Idea";
import Upload_Component from "./pages/Upload_Component";
import { CssBaseline, Container, Button, Box, Grid } from '@mui/material';

import ComponentStorePage from "./pages/ComponentStorePage";
// import Container from "./Container";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import Logout from "./components/Authentication/Logout";
import ComponentCard from "./pages/ComponentCard";
import HomePage from "./pages/HomePage";
import ReviewPage from "./pages/ReviewPage";
import Review from "./pages/Review";



// New imports

import Navbar from "./components/Layout/Navbar";
import './styles/App.css'





function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Navbar />
          <Grid container spacing={0} className='outer-grid'>
            {/* <Box p={3} mt={8}> */}
              <Routes>
                <Route path="/componentStore" element={<ComponentStorePage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/component/:id" element={<ComponentCard />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/review" element={<ReviewPage />} />
                <Route path="/review1" element={<Review />} />
                <Route path="/uploadcomponent" element={<Upload_Component />} />
                <Route path="/uploadIdea" element={<Upload_Idea />} />
              </Routes>
            {/* </Box> */}
          </Grid>
        </Box>
      </Router>
    </>
  )
};






//   const { scrollYProgress } = useScroll();
// const scaleX = useSpring(scrollYProgress, {
//   stiffness: 100,
//   damping: 30,
//   restDelta: 0.001
// });
//   return (
//     <>

//       {/* <motion.div className="progress-bar" style={{ scaleX }} /> */}

//       <Router>
//         <div className="App">
//           <Link to="/home">
//             <button>Go to Home Page</button>
//           </Link>
//           <Link to="/admin">
//             <button>Go to Admin Page</button>
//           </Link>
//           <Link to="/profile">
//             <button>Go to Profile Page</button>
//           </Link>
//           <Link to="/components">
//             <button>Go to Component Store</button>
//           </Link>
//           <Link to="/review">
//             <button>Review Page</button>
//           </Link>
//           <Link to="/uploadComponent">
//             <button> uploadComponent</button>
//           </Link>
//           <Link to="/uploadIdea">
//             <button> uploadIdea</button>
//           </Link>
//           <CssBaseline />
//           <Routes>
//             <Route
//               path="/components"
//               element={isAuthenticated ? <ComponentStorePage /> : <Navigate to="/" />}
//             />
//             <Route
//               path="/"
//               element={
//                 isAuthenticated ? (
//                   <Navigate to="/components" />
//                 ) : (
//                   <Container>
//                     <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                       {isLoginView ? (
//                         <Login onLogin={() => setIsAuthenticated(true)} />
//                       ) : (
//                         <Signup onComplete={() => setIsLoginView(true)} />
//                       )}
//                       <Box sx={{ display: 'flex', flexDirection: 'row' }}>
//                         {isLoginView ? <p>Don't have an account?</p> : <p>Already have an account?</p>}
//                         <Button onClick={toggleView}>
//                           {isLoginView ? 'Signup' : 'Login'}
//                         </Button>
//                       </Box>
//                     </Box>
//                   </Container>
//                 )
//               }
//             />

//             <Route path="/logout" element={
//               isAuthenticated ? (
//                 <>
//                   <Logout onLogout={() => setIsAuthenticated(false)} />
//                   <Navigate to="/" />
//                 </>
//               ) : (
//                 <Navigate to="/" />
//               )}
//             />

//             <Route path="/admin" element={<Admin />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/component/:id" element={<ComponentCard />} />
//             <Route path="/home" element={<HomePage />} />
//             <Route path="/review" element={<ReviewPage />} />
//             <Route path="/review1" element={<Review />} />
//             <Route path="/uploadComponent" element={<Upload_Component />} />
//             <Route path="/uploadIdea" element={<Upload_Idea />} />

//           </Routes>
//         </div>
//       </Router>
//     </>
//   );
// }

export default App;
