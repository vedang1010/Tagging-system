import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const Signup = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${SERVER_URL}api/user/send-otp`, { email });
      setStep(2);
      setTimer(30);
      setIsResendDisabled(true);
      setAlertMessage('OTP sent successfully');
      setAlertSeverity('success');
    } catch (error) {
        console.log(error);
      setAlertMessage(error.response.data.message);
      setAlertSeverity('error');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${SERVER_URL}api/user/verify-otp`, { email, otp });
      setStep(3);
      setAlertMessage('OTP verified successfully');
      setAlertSeverity('success');
    } catch (error) {
      setAlertMessage('Failed to verify OTP');
      setAlertSeverity('error');
    }
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlertMessage('Passwords do not match');
      setAlertSeverity('error');
      return;
    }
    try {
      await axios.post(`${SERVER_URL}api/user/set-password`, { email, otp, password });
      onComplete();
      setAlertMessage('Password set successfully');
      setAlertSeverity('success');
    } catch (error) {
      setAlertMessage(error.response.data.message);
      setAlertSeverity('error');
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post(`${SERVER_URL}api/user/send-otp`, { email });
      setTimer(30);
      setIsResendDisabled(true);
      setAlertMessage('OTP resent successfully');
      setAlertSeverity('success');
    } catch (error) {
        console.log(error);
      setAlertMessage('Failed to resend OTP');
      setAlertSeverity('error');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Sign Up</Typography>
        {alertMessage && <Alert severity={alertSeverity} sx={{ width: '100%', mt: 2 }}>{alertMessage}</Alert>}
        {step === 1 && (
          <Box component="form" onSubmit={handleSendOtp} sx={{ mt: 1 }}>
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
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
              Send OTP
            </Button>
          </Box>
        )}
        {step === 2 && (
          <Box component="form" onSubmit={handleVerifyOtp} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="otp"
              label="OTP"
              name="otp"
              autoComplete="otp"
              autoFocus
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
              Verify OTP
            </Button>
            <Button
              fullWidth
              variant="outlined"
              disabled={isResendDisabled}
              onClick={handleResendOtp}
            >
              Resend OTP ({timer}s)
            </Button>
          </Box>
        )}
        {step === 3 && (
          <Box component="form" onSubmit={handleSetPassword} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
              Set Password
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Signup;
