import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import Swal from "sweetalert2";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');

  
  const getUserInfo = async (id) => {
    try {
      const url = `${SERVER_URL}api/review/fetchUserInfo/${id}`;
      const response = await axios.get(url);
      console.log(response.data);
      // console.log("Profile user:", response.data[0].name);
      return response.data; // Assuming response.data contains a user object with an 'email' field
    } catch (error) {
      console.error(`Error fetching user info: ${error.message}`);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_URL}api/user/login`, { email, password });
      const { token, email: userEmail } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', userEmail);
      const response2=await getUserInfo(userEmail)
      const uid=response2._id
      // console.log(response2)
      // console.log(uid)

      
      localStorage.setItem('userId',uid);

      setAlertMessage('Login successful');
      setAlertSeverity('success');
      Swal.fire({
        title: "Login Successful",
        text: "You've logged in successfully",
        icon: "success",
      });

      onLogin();
    } catch (error) {
      setAlertMessage(error.response.data.message);
      setAlertSeverity('error');
      Swal.fire({
        title: "Oops!",
        text: error.response.data.message,
        icon: "warning",
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      onLogin();
    }
  }, [onLogin]);

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
