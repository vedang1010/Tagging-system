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
  const [rating, setRating] = useState(0);
  const [remarks, setRemarks] = useState('');
  const [page, setPage] = useState('review'); 
  const [ideas, setIdeas] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contri, setContri] = useState([]);
  const [status, setStatus] = useState('Pending')
  const [tech, setTech] = useState('false');
  const user = JSON.parse(localStorage.getItem('userEmail'));
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
            console.log('User ID:', user);
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


  try{
    useEffect(()=>{
      axios.get("http://127.0.0.1:5000/api/review/fetchUserInfo/" + user).then(
        response =>{
          const data = JSON.stringify(response.data);
          console.log(data);
          if(data.subgroup == 2) setTech(true);
          else setTech(false);
        }
      ).catch((error) => {
        console.log("Some error happened")
        console.log(error);
      })
    },[])
  }catch (error) {
    console.error(error.message+ " over here 2");
    
  }

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
        console.log(response.status);
      }

      

    } catch (error) {
      console.error("Error occurred while sending the request:", error);
      
    }
  }
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
      {/* <button onClick={() => navigate(-1)}>go back</button> */}
      <RiArrowGoBackFill onClick={() => navigate(-1)}/>
      <h1 className={styles.heading}>Review Idea </h1>
      {page === 'review' ? (
        <>
      <div className={styles.detailsContainer}>
        <div className={styles.imagePreview}>
          <img src={ideas.preview} alt="Component Preview" className={styles.image} />
          <div className={styles.details}>
          <p className={styles.leftText}><strong>Component Name:</strong> {ideas.name}</p>
          <p className={styles.leftText} id={styles.leftdown}><strong>Type:</strong> {ideas.type}</p>
          <p className={styles.leftText} id={styles.leftdown}><strong>Description : </strong> <HtmlRenderer htmlString={ideas.description.full} /></p>
          </div>
        </div>
      <div className={styles.details}>
          
          <p>
            <strong>Details:</strong>
            <ol className={styles.detaillist}  style={{ listStyleType: "upper-roman" }}>
              <li className={styles.detailtext}><strong >System Requirements : </strong>{ideas.sys_requirements}</li>
              <li className={styles.detailtext}><strong>dependencies : </strong>{ideas.dependencies}</li>
              <li className={styles.detailtext}><strong>license : </strong>{ideas.  license}</li>
            </ol>
            
          
          </p>
          {/* <p><strong>Language Used:</strong> {ideas.language}</p> */}
          <p><strong>Dependencies:</strong> {ideas.dependencies}</p>
          
          {/* <p>
            <strong>Contributors:</strong> 
            {ideas.contributor.array.map((element, index) => (
              <span key={index}>{element}{index < ideas.contributor.array.length - 1 ? ', ' : ''}</span>
            ))}
        </p> */}
          {/* <p><strong>Output:</strong> {ideas.output}</p> */}
          <div className={styles.downloadContainer}>
            <a href="/path/to/download">
            <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none">
                <path d="M12 7L12 14M12 14L15 11M12 14L9 11" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 17H12H8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
              Download Files
            </a>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
          <button type="button" className={styles.cancel} onClick={handleReject}>Reject</button>
          <button type="button" className={styles.next} onClick={handleAccept}>Accept</button>
          </div>
        </>
    ) : (
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
            
          </div>
        
          <div className={styles.buttons}>
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
