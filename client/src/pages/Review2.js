import React,  { useState, useEffect } from 'react';
import styles from '../styles/Review.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";


const Review2 = () => {
  const {objectId, reviewId} = useParams();
  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [remarks, setRemarks] = useState('');
  const [page, setPage] = useState('review'); 
  const [ideas, setIdeas] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contri, setContri] = useState("");
  const [contri, setContri] = useState("");
  const [status, setStatus] = useState('pending')
  const [tech, setTech] = useState('false');
  const [version, setVersion] = useState(0);
  
  const user = JSON.parse(localStorage.getItem('user'));

  try{
    useEffect(() => {
        console.log(" compoenent ",objectId);
        axios.get("http://127.0.0.1:5000/api/review/fetchIdea/" + objectId).then(response =>{
        console.log(response.data);
        const idea = response.data.component  
        const length =  response.data.contributorsInfo.length;
        const length2 = response.data.component.contributors.length;
        const contributors = response.data.contributorsInfo[length-1].email;
        const version = response.data.component.contributors[length2-1].version;
        setVersion(version);
        setContri(contributors)
        // console.log(" idea"+idea);   
        // console.log("version "+response.data.component.contributors[0].version);   
        const length =  response.data.contributorsInfo.length;
        const length2 = response.data.component.contributors.length;
        const contributors = response.data.contributorsInfo[length-1].email;
        const version = response.data.component.contributors[length2-1].version;
        setVersion(version);
        setContri(contributors)
        // console.log(" idea"+idea);   
        // console.log("version "+response.data.component.contributors[0].version);   
        setIdeas(idea);
        setIsLoading(false);
        setError(false);
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
      //console.log('Form submitted', { rating, remarks });
      setPage('review');
    }
  };

  const handleStarClick1 = (index) => {
    setRating1(index + 1);
  };

  // const handleStarClick2 = (index) => {
  //   setRating2(index + 1);
  // };
  // const handleStarClick2 = (index) => {
  //   setRating2(index + 1);
  // };

  const handleReject = () => {
    //console.log('Rejected with remarks', { remarks, rating });
    setPage('ratings');
    setStatus('rejected');
    
  };

  const handleAccept = () => {

    setPage('ratings');
    setStatus('accepted');
  }


  const handleOnClick =async()=>{
     setPage('ratings');
     try {
        console.log(reviewId," "+objectId);
        const response = await axios.post("http://127.0.0.1:5000/api/review/status2", {
          status: status,
          remarks: remarks,
          rating1: rating1,
          
          
          objectId: objectId,
          reviewId: reviewId,
          isTech : tech
          isTech : tech
        });
        
        if (response.status !== 200) {
          console.log(response.status);
        } else {
          console.log(response.status);
        }

        Swal.fire({
          title: status,
          icon: "success"
        });
      } catch (error) {
        console.error("Error occurred while sending the request:", error);
        Swal.fire({
          title: "Oops!",
          text: error.message,
          icon: "warning",
        });
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


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!ideas) {
    return <div>No idea found</div>;
  }

  //ideas.contributors[ideas.contributors.length - 1];

  //const { name, type, details, language, version, dependencies, input, output } = ideas;
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>Review Component</h1>
      <h1 className={styles.heading}>Review Component</h1>
      {page === 'review' ? (
        <>
          <div className={styles.detailsContainer}>
            <div className={` ${styles.imagePreview}`}>
              <img src={ideas.preview} alt="Component Preview" className={styles.image} />
              <div className={styles.details}>
                <p className={styles.leftText}><strong>Component Name:</strong> {ideas.name}</p>
                <p className={styles.leftText} id={styles.leftdown}><strong>Type:</strong> {ideas.type}</p>
                <p className={styles.leftText} id={styles.leftdown}><strong>Description:</strong> {ideas.description}</p>
                <p className={styles.leftText} id={styles.leftdown}><strong>Version:</strong> {version}</p>
              </div>
            </div>
            <div className={`${styles.card} ${styles.details}`}>
              <p>
                <strong>Details:</strong>
                <ol className={styles.detaillist} style={{ listStyleType: "upper-roman" }}>
                  <li className={styles.detailtext}><strong>System Requirements:</strong> {ideas.sys_requirements}</li>
                  <li className={styles.detailtext}><strong>Dependencies:</strong> {ideas.dependencies}</li>
                  <li className={styles.detailtext}><strong>License:</strong> {ideas.license}</li>
                </ol>
              </p>
              <p><strong>Language Used:</strong> {ideas.language}</p>
              <p><strong>Algorithm and time complexity:</strong> {ideas.algorithm}</p>
              <p><strong>Tags:</strong> {ideas.taglist.join(' ')}</p>
              <p><strong>Contributors : </strong>{contri}</p>
              {/* <p className={styles.leftText} id={styles.leftdown}>
                    <strong>Contributors :</strong>
                    {ideas.contributors[ideas.contributors.length - 1].id.map((contributorId, index) => (
                      <span key={index}>{contributorId} </span>
                    ))}
                </p> */}
                
              <div className={styles.downloadContainer}>
                <a href="/path/to/download">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none">
                    <path d="M12 7L12 14M12 14L15 11M12 14L9 11" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 17H12H8" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
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
                <span style={{ fontWeight: 'bold' }}>{tech ? 'Functional Review' : 'Legal Review'}</span>
                <div>
                  {[...Array(5)].map((star, index) => (
                    <span
                      key={index}
                      onClick={() => handleStarClick1(index)}
                      style={{
                        fontSize: '2em',
                        cursor: 'pointer',
                        color: index < rating1 ? 'gold' : 'gray'
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
}  

export default Review2;
