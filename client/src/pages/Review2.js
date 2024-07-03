import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { RiArrowGoBackFill } from 'react-icons/ri';
import HtmlRenderer from '../utils/HtmlRenderer';
import {
  Box,
  IconButton,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Divider,
  Rating
} from '@mui/material';

const Review2 = () => {
  const { objectId, reviewId } = useParams();
  sessionStorage.setItem('location', `/review2/${objectId}/${reviewId}`);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [reviewData, setReviewData] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [page, setPage] = useState('review');
  const [ideas, setIdeas] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contri, setContri] = useState('');
  const [status, setStatus] = useState('pending');
  const [tech, setTech] = useState(false);
  const [version, setVersion] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('user');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}api/review/fetchIdea/${objectId}`);
        const idea = response.data.component;
        const contributorsInfo = response.data.contributorsInfo;
        const contributorsLength = contributorsInfo.length;
        const componentContributorsLength = idea.contributors.length;
        const version = idea.contributors[componentContributorsLength - 1].version;
        const contributors = contributorsInfo[contributorsLength - 1].email;
        setContri(contributors);
        setVersion(version);
        setIdeas(idea);
        setIsLoading(false);
        setError(null);

        const reviewResponse = await axios.get(`${SERVER_URL}api/review/getReviewById/${reviewId}`);
        setReviewData(reviewResponse.data);
        const modifyId = reviewResponse.data.modifyId;
        const modifiedComponentResponse = await axios.get(`${SERVER_URL}api/modify/getModifiedComponent/${modifyId}`);
        const modifyComponent = modifiedComponentResponse.data;

        const fetchUser = await axios.get(`${SERVER_URL}api/userinfo/fetchUserInfo/${modifyComponent.contributors.id}`);
        setContri(fetchUser.data.email);

        const updatedIdea = {
          ...idea,
          description: {
            short: modifyComponent.description.short,
            full: modifyComponent.description.full
          },
          file: modifyComponent.file,
          preview: modifyComponent.preview,
          sys_requirements: modifyComponent.sys_requirements,
          taglist: modifyComponent.taglist,
          type: modifyComponent.type,
          contributors: [modifyComponent.contributors]
        };

        setIdeas(updatedIdea);
      } catch (error) {
        console.error('Error: ', error.message);
        setIsLoading(false);
        setError(error);
      }
    };

    fetchData();
  }, [objectId, reviewId, SERVER_URL]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}api/review/fetchUserInfo/${userEmail}`);
        const data = response.data;
        setTech(data.subgroup === 'technical');
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [userEmail]);

  const handleDownloadAll = (files) => {
    if (files && files.length > 0) {
      files.forEach((fileUrl) => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', '');
        link.setAttribute('target', '_blank');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    } else {
      console.error('No files available for download');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reviewData.status_legal === 'Accepted') {
      setRating2(reviewData.legal_stars);
    }
    if (reviewData.status_technical === 'Accepted') {
      setRating2(reviewData.tech_stars);
    }
    if ((reviewData.status_legal === 'Accepted' || reviewData.status_technical === 'Accepted') && status === 'Accepted') {
      ideas.status2 = 'Accepted';
      ideas.stars = (rating1 + rating2) / 2;
      try {
        await axios.put(`${SERVER_URL}api/modify/updateComponentInDatabase/${objectId}`, ideas);
      } catch (error) {
        console.error('Error updating component in database:', error);
      }
    }

    setPage('review');
  };

  const handleStarClick1 = (index) => {
    setRating1(index + 1);
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
    try {
      const response = await axios.post(`${SERVER_URL}api/review/status2`, {
        status: status,
        remarks: remarks,
        rating1: rating1,
        objectId: objectId,
        reviewId: reviewId,
        isTech: tech,
      });

      if (response.status === 200) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error occurred while sending the request:', error);
    }
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: 'Sorry',
        text: 'No idea to review',
        icon: 'error',
      });
    }
  }, [error]);

  useEffect(() => {
    if (submitted) {
      Swal.fire({
        icon: 'success',
        title: 'Your work has been saved',
      });
      navigate('/reviewcomponent');
    }
  }, [submitted, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Box sx={{ padding: 2, width: '80%', margin: '0 auto', minHeight: '100vh'}}>
      <IconButton onClick={() => navigate(-1)} sx={{ marginBottom: 2 }}>
        <RiArrowGoBackFill />
      </IconButton>
      <Typography variant="h4" gutterBottom>
        Review Idea
      </Typography>
      {page === 'review' ? (
        <>
          <Paper elevation={3} sx={{ padding: 3, marginBottom: 3, backgroundColor: '#f0f0f0' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <img src={ideas.preview[0]} alt="Component Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1">
                  <strong>Component Name:</strong> {ideas.name}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  <strong>Type:</strong> {ideas.type}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  <strong>Description:</strong> <HtmlRenderer htmlString={ideas.description.full} />
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  <strong>Version:</strong> {version}
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ marginY: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>
                  <strong>Details:</strong>
                </Typography>
                <ol style={{ listStyleType: 'upper-roman', paddingLeft: '1.5rem' }}>
                  <li>
                    <Typography variant="body2">
                      <strong>System Requirements:</strong> <HtmlRenderer htmlString={ideas.sys_requirements} />
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      <strong>Dependencies:</strong> {ideas.dependencies}
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      <strong>License:</strong> {ideas.license}
                    </Typography>
                  </li>
                </ol>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  <strong>Files:</strong>
                </Typography>
                <Button variant="outlined" color="primary" sx={{ marginTop: 1 }} onClick={() => handleDownloadAll(ideas.file)}>
                  Download All Files
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="contained" color="error" onClick={handleReject}>
              Reject
            </Button>
            <Button variant="contained" color="success" onClick={handleAccept}>
              Accept
            </Button>
          </Box>
        </>
      ) : (
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 3, backgroundColor: '#f0f0f0' }}>
          <Typography variant="h6" gutterBottom>
            Provide Your Feedback
          </Typography>
          <TextField
            fullWidth
            label="Remarks"
            multiline
            rows={4}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            variant="outlined"
            sx={{ marginBottom: 3 }}
          />
          <Typography variant="h6" gutterBottom>
            Rate the Idea
          </Typography>
          <Rating
            name="simple-controlled"
            value={rating1}
            onChange={(event, newValue) => {
              setRating1(newValue);
            }}
            sx={{ marginBottom: 3 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleOnClick}>
              Submit Review
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Review2;
