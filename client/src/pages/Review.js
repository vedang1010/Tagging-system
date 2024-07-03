import React, { useState, useEffect } from 'react';
import styles from '../styles/Review.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import HtmlRenderer from "../utils/HtmlRenderer";
import { RiArrowGoBackFill } from "react-icons/ri";
import {
  Box,
  IconButton,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Divider,
  Rating,
} from '@mui/material';

const Review = () => {
  const { objectId, reviewId } = useParams();
  sessionStorage.setItem("location", `/review1/${objectId}/${reviewId}`);

  const [rating, setRating] = useState(0);
  const [remarks, setRemarks] = useState('');
  const [page, setPage] = useState('review');
  const [ideas, setIdeas] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('Pending');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ rating: '', remarks: '' });
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('user');

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/review/fetchIdea/${objectId}`)
      .then(response => {
        setIdeas(response.data.component);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        setError(error);
      });
  }, [objectId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (page === 'review') {
      setPage('ratings');
    } else {
      setPage('review');
    }
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleReject = () => {
    setPage('ratings');
    setStatus('Rejected');
  };

  const handleAccept = () => {
    setPage('ratings');
    setStatus('Accepted');
  };

  const handleOnClick = async () => {
    setPage('ratings');
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/review/status1", {
        status,
        remarks,
        rating,
        objectId,
        reviewId,
      });

      if (response.status === 200) {
        setSubmitted(true);
      } else {
        console.log(response.status);
      }

      let formIsValid = true;
      let newErrors = { rating: '', remarks: '' };

      if (rating === 0) {
        newErrors.rating = 'Rating is required';
        formIsValid = false;
      }
      if (remarks.trim() === '') {
        newErrors.remarks = 'Remarks are required';
        formIsValid = false;
      }

      setErrors(newErrors);

    } catch (error) {
      console.error("Error occurred while sending the request:", error);
    }
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  }, [error]);

  useEffect(() => {
    if (submitted) {
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
      });
      navigate('/reviewidea');
    }
  }, [submitted]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!ideas) {
    return <div>No idea found</div>;
  }

  return (
    <Box sx={{ padding: 4, width: '80%', margin: '0 auto', minHeight: '100vh', backgroundColor: '#f7f7f7', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <IconButton onClick={() => navigate(-1)} sx={{ marginBottom: 2 }}>
        <RiArrowGoBackFill size={24} />
      </IconButton>
      <Typography variant="h4" gutterBottom sx={{ fontSize: '2rem', color: '#333' }}>
        Review Idea
      </Typography>
      {page === 'review' ? (
        <>
          <Paper elevation={3} sx={{ padding: 4, marginBottom: 3, minHeight: '500px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" sx={{ marginBottom: 2, fontSize: '1.25rem' }}>
                  <strong>Component Name:</strong> {ideas.name ? <HtmlRenderer htmlString={ideas.name} /> : 'None'}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2, fontSize: '1.25rem' }}>
                  <strong>Type:</strong> {ideas.type ? <HtmlRenderer htmlString={ideas.type} /> : 'None'}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2, fontSize: '1.25rem' }}>
                  <strong>Description:</strong> {ideas.description?.full ? <HtmlRenderer htmlString={ideas.description.full} /> : 'None'}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom sx={{ fontSize: '1.25rem' }}>
                  <strong>Details:</strong>
                </Typography>
                <ol style={{ listStyleType: 'upper-roman', paddingLeft: '1.5rem', marginTop: '20px' }}>
                  <li>
                    <Typography variant="body2" sx={{ marginTop: '10px', fontSize: '1.25rem' }}>
                      <strong>System Requirements:</strong> {ideas.sys_requirements ? <HtmlRenderer htmlString={ideas.sys_requirements} /> : 'None'}
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" sx={{ marginTop: '10px', fontSize: '1.25rem' }}>
                      <strong>Dependencies:</strong> {ideas.dependencies ? <HtmlRenderer htmlString={ideas.dependencies} /> : 'None'}
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" sx={{ marginTop: '10px', fontSize: '1.25rem' }}>
                      <strong>License:</strong> {ideas.license ? <HtmlRenderer htmlString={ideas.license} /> : 'None'}
                    </Typography>
                  </li>
                </ol>
              </Grid>
            </Grid>
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2,gap:2 }}>
            <Button variant="contained" color="error" onClick={handleReject} sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              Reject
            </Button>
            <Button variant="contained" color="success" onClick={handleAccept} sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              Accept
            </Button>
          </Box>
        </>
      ) : (
        <Paper elevation={3} sx={{ padding: 4, marginTop: 3, minHeight: '500px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h5" gutterBottom sx={{ fontSize: '1.5rem', color: '#333' }}>
            {page === 'reject' ? 'Reject Component' : 'Accept Component'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="remarks"
              label="Remarks"
              multiline
              rows={4}
              fullWidth
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              variant="outlined"
              margin="normal"
              sx={{ backgroundColor: '#f0f0f0', borderRadius: '5px' }}
            />
            <Box sx={{ marginTop: 2 }}>
              <Typography component="legend" sx={{ fontWeight: 'bold', color: '#333' }}>
                {userEmail === 'tech' ? 'Functional Review' : 'Legal Review'}
              </Typography>
              <Rating
                name="rating"
                value={rating}
                onChange={(event, newValue) => handleStarClick(newValue - 1)}
              />
            </Box>
            <Divider sx={{ marginY: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined"
              onClick={() => setPage('review')}
              sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            >
              Go Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleOnClick}
              sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
      )}
    </Box>
  );
};

export default Review;
