import React, { useState,useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import Swal from "sweetalert2";
// require('dotenv').config();
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const Login = ({ onLogin }) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Optionally, you can verify the token with an API call to the server
      axios.get('/api/user/verifyToken')
        .then(response => {
          console.log('Token is valid');
          // Optionally, set user data in state
        })
        .catch(error => {
          console.error('Token is invalid or expired', error);
          localStorage.removeItem('token'); // Remove invalid token
        });
    }
  }, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_URL}api/user/login`, { email, password });
      //console.log(response.data.email+ " " + response.data.token);
      //const data = response.json();
      //console.log(data.email+ " " + data.token);
      const { token } = response.data;
      localStorage.setItem('token', token);

      localStorage.setItem('user', JSON.stringify(response.data.email));

      setAlertMessage('Login successful');
      Swal.fire({
        title: "Login Successful",
        text:"You've logged in successfully",
        icon: "success",
      });
      setAlertSeverity('success');
      onLogin(); 
    } catch (error) {
      setAlertMessage(error.response.data.message);
      setAlertSeverity('error');
      Swal.fire({
        title: "Oops!",
        text: error.response.data,
        icon: "warning",
      });
      console.error(error.response.data); 
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Login</Typography>
        {alertMessage && <Alert severity={alertSeverity} sx={{ width: '100%', mt: 2 }}>{alertMessage}</Alert>}
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;


 // const [components, setComponents] = useState([]);

  // useEffect(() => {
  //   const fetchComponents = async () => {
  //     try {
  //       const response = await axios.get('http://127.0.0.1:5000/api/components');
  //       setComponents(response.data);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };

  //   fetchComponents();
  // }, []);