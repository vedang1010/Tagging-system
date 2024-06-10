import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';

// require('dotenv').config();
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_URL}api/user/login`, { email, password });
      localStorage.setItem('user', JSON.stringify(response.json));
      setAlertMessage('Login successful');
      setAlertSeverity('success');
      onLogin(); 
    } catch (error) {
      setAlertMessage(error.response.data.message);
      setAlertSeverity('error');
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