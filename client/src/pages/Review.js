import React,  { useState, useEffect } from 'react';
import styles from '../styles/Review.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import HtmlRenderer from "../utils/HtmlRenderer"
import { RiArrowGoBackFill } from "react-icons/ri";



const Review = () => {
  const {objectId, reviewId} = useParams();
  sessionStorage.setItem("location",`/review1/${objectId}/${reviewId}`)

  const [rating, setRating] = useState(0);
  const [remarks, setRemarks] = useState('');
  const [page, setPage] = useState('review'); 
  const [ideas, setIdeas] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contri, setContri] = useState([]);
  const [status, setStatus] = useState('Pending')
  const [tech, setTech] = useState('false');
  const userEmail = localStorage.getItem('user');
  const [submitted, setSubmitted] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState({ rating: '', remarks: '' });
  const navigate = useNavigate();
  try{
    useEffect(() => {
        console.log("object "+objectId);
        axios.get("http://127.0.0.1:5000/api/review/fetchIdea/" + objectId).then(response =>{
            console.log(response.data);
            const idea = response.data.component  
            setIdeas(idea);
            setIsLoading(false);
            setError(false);
            console.log('User ID:', userEmail);
       })
      .catch((error)=>{
        console.log("Here is the error ",error);
        setIsLoading(false);
        setError(error);
      })
     },[objectId])
  } catch (error) {
    console.error(error.message+ " over here ");
  }


  // try{
  //   useEffect(()=>{
  //     console.log("user _id : " + userEmail)
  //     axios.get("http://127.0.0.1:5000/api/review/fetchUserInfo/" + userEmail).then(
  //       response =>{
  //         const data = JSON.stringify(response.data);
  //         console.log(data);
  //         if(data.subgroup == 2) setTech(true);
  //         else setTech(false);
  //       }
  //     ).catch((error) => {
  //       console.log("Some error happened")
  //       console.log(error);
  //     })
  //   },[])
  // }catch (error) {
  //   console.error(error.message+ " over here 2");
    
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (page === 'review') {
      setPage('ratings');
    } else {
      console.log('Form submitted', { rating, remarks });
      setPage('review');
    }
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleReject = () => {
    console.log('Rejected with remarks', { remarks, rating });
    setPage('ratings');
    setStatus('rejected');
    
  };

  const handleAccept =() =>{
    console.log('Rejected with remarks', { remarks, rating });
    setPage('ratings');
    setStatus('accepted');
  }

  const handleOnClick = async()=>{
    setPage('ratings');
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/review/status1", {
        status: status,
        remarks: remarks,
        rating: rating,
        objectId: objectId,
        reviewId: reviewId,
      });
      
      if (response.status !== 200) {
        console.log(response.status);

      } else {
        setSubmitted(true);
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
    
  }

  const handleDownloadAll = (files) => {
    if (files && files.length > 0) {
      files.forEach((fileUrl) => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', '');
        link.setAttribute('target', '_blank'); // Open in a new tab
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    } else {
      console.error('No files available for download');
    }
  };
  // const ideas = {
  //   name: 'Example Component',
  //   type: 'UI Element',
  //   details: 'This is a detailed description of the component.',
  //   tags: 'UI, Design, Example',
  //   language: 'JavaScript',
  //   version: '1.0.0',
  //   dependencies: 'React, PropTypes',
  //   input: 'Props',
  //   output: 'UI Component'
  // };

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
    if(submitted){
    Swal.fire({
    //position: "top-end",
    icon: "success",
    title: "Your work has been saved",
    
   
  });
  navigate('/reviewidea');
    }
  },[submitted]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error.msg</div>;
  }

  if (!ideas) {
    return <div>No idea found</div>;
  }

 
  return (
    <div className={styles.formContainer}>
    <RiArrowGoBackFill onClick={() => navigate(-1)} />
    <h1 className={styles.heading}>Review Idea</h1>
    {page === 'review' ? (
      <>
        <div className={styles.detailsContainer}>
          <div className={styles.imagePreview}>
           
            <div className={styles.details}>
              {ideas.name && (
                <p className={styles.leftText}>
                  <strong>Component Name:</strong>
                  <HtmlRenderer htmlString={ideas.name} />
                </p>
              )}
              {ideas.type && (
                <p className={styles.leftText} id={styles.leftdown}>
                  <strong>Type:</strong>
                  <HtmlRenderer htmlString={ideas.type} />
                </p>
              )}
              {ideas.description?.full && (
                <p className={styles.leftText} id={styles.leftdown}>
                  <strong>Description:</strong>
                  <HtmlRenderer htmlString={ideas.description.full} />
                </p>
              )}
            </div>
          </div>
          <div className={styles.details}>
            <p>
              <strong>Details:</strong>
              <ol className={styles.detaillist} style={{ listStyleType: 'upper-roman' }}>
                {ideas.sys_requirements && (
                  <li className={styles.detailtext}>
                    <strong>System Requirements:</strong>
                    <HtmlRenderer htmlString={ideas.sys_requirements} />
                  </li>
                )}
                {ideas.dependencies && (
                  <li className={styles.detailtext}>
                    <strong>Dependencies:</strong>
                    <HtmlRenderer htmlString={ideas.dependencies} />
                  </li>
                )}
                {ideas.license && (
                  <li className={styles.detailtext}>
                    <strong>License:</strong>
                    <HtmlRenderer htmlString={ideas.license} />
                  </li>
                )}
              </ol>
            </p>
            <div className={styles.downloadContainer}>
            {/* <a href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDownloadAll(ideas.file);
                        }}
>
                <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none">
                  <path d="M12 7L12 14M12 14L15 11M12 14L9 11" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 17H12H8" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Download Files
              </a> */}
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <button type="button" className={styles.cancel} onClick={handleReject}>Reject</button>
          <button type="button" className={styles.next} onClick={handleAccept}>Accept</button>
        </div>
      </>
    ): (
      <div className={styles.card}>
      <div className={styles.cardContent}>
        <h2>{page === 'reject' ? 'Reject Component' : 'Accept Component'}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="remarks" className={styles.label}>Remarks:</label>
          <textarea
            id="remarks"
            rows="4"
            cols="50"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className={styles.textarea}
          ></textarea>
          {hasSubmitted && errors.remarks && <div style={{ color: 'red' }}>{errors.remarks}</div>}

          <div className={styles.ratingContainer}>
            <span style={{ fontWeight: 'bold' }}>{tech ? 'Functional Review' : 'Legal Review'}</span>
            <div>
              {[...Array(5)].map((star, index) => (
                <span
                  key={index}
                  onClick={() => handleStarClick(index)}
                  style={{
                    fontSize: '2em',
                    cursor: 'pointer',
                    color: index < rating ? 'gold' : 'gray'
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            {hasSubmitted && errors.rating && <div style={{ color: 'red' }}>{errors.rating}</div>}
          </div>

         < div className={styles.buttons}>
            <button type="button" className={styles.cancel} onClick={() => setPage('review')}>Go Back</button>
            <button type="submit" className={styles.next} onClick={handleOnClick}>Submit</button>
            </div>
        </form>
      </div>
    </div>
  )}
</div>
);
};
export default Review;
