import React, { useState, useEffect } from 'react';
import styles from '../styles/Review2.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import { RiArrowGoBackFill } from "react-icons/ri";
import HtmlRenderer from "../utils/HtmlRenderer";

const Review2 = () => {
  const { objectId, reviewId } = useParams();
  sessionStorage.setItem("location", `/review2/${objectId}/${reviewId}`);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [remarks, setRemarks] = useState('');
  const [page, setPage] = useState('review');
  const [ideas, setIdeas] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contri, setContri] = useState("");
  const [status, setStatus] = useState('pending');
  const [tech, setTech] = useState(false);
  const [version, setVersion] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('user');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("Component ID: ", objectId);

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
        // console.log("Review Response: ", reviewResponse.data.modifyId);

        const modifyId = reviewResponse.data.modifyId;
       const modifiedComponentResponse = await axios.get(`${SERVER_URL}api/modify/getModifiedComponent/${modifyId}`);
         const modifyComponent = modifiedComponentResponse.data;

        // console.log("Original Idea: ", idea);
        // console.log("Modified Component: ", modifyComponent);
        // const 
        const fetchUser=await axios.get(`${SERVER_URL}api/userinfo/fetchUserInfo/${modifyComponent.contributors.id}`)
        // console.log("user",fetchUser.data)
        setContri(fetchUser.data.email)

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
          contributors:[modifyComponent.contributors]
        };

        console.log("Updated Idea: ", updatedIdea);
        setIdeas(updatedIdea);

      } catch (error) {
        console.error("Error: ", error.message);
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
        setTech(data.subgroup === 2);
      } catch (error) {
        console.error("Error fetching user info:", error);
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
        link.setAttribute('target', '_blank'); // Open in a new tab
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    } else {
      console.error('No files available for download');
    }
  };


  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("status",status)
    if(status==='Accepted'){
      console.log("ideas",ideas)
      const modify = await axios.put(`${SERVER_URL}api/modify/updateComponentInDatabase/${objectId}`,ideas);

    }
    if (page === 'review') {
      setPage('ratings');
    } else {
      setPage('review');
    }
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
      console.error("Error occurred while sending the request:", error);
    }
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Sorry",
        text: "No idea to review",
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
      navigate('/reviewcomponent');
    }
  }, [submitted, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }




  //ideas.contributors[ideas.contributors.length - 1];

  //const { name, type, details, language, version, dependencies, input, output } = ideas;
  return (
    <div className={styles.formContainer}>
      <RiArrowGoBackFill onClick={() => navigate(-1)} />
      <h1 className={styles.heading}>Review Component</h1>
      {page === 'review' ? (
        <>
          <div className={styles.detailsContainer}>
            <div className={` ${styles.imagePreview}`}>
              <img src={ideas.preview[0]} alt="Component Preview" className={styles.image} />
              <div className={styles.details}>
                <p className={styles.leftText}><strong>Component Name:</strong> {ideas.name}</p>
                <p className={styles.leftText}><strong>Type:</strong> {ideas.type}</p>
                <p className={styles.leftText}><strong>Description:</strong> <HtmlRenderer htmlString={ideas.description.full} /></p>
                <p className={styles.leftText}><strong>Version:</strong> {version}</p>
              </div>
            </div>
            <div className={`${styles.card} ${styles.details}`}>
              <p>
                <strong>Details:</strong>
                <ol className={styles.detaillist} style={{ listStyleType: "upper-roman" }}>
                   
                  <li className={styles.detailtext}><strong>System Requirements:</strong> <HtmlRenderer htmlString={ideas.sys_requirements} /></li>
                  <li className={styles.detailtext}><strong>Dependencies:</strong> {ideas.dependencies}</li>
                  <li className={styles.detailtext}><strong>License:</strong> {ideas.license}</li>

                </ol>
              </p>
              <hr></hr>

              <p><strong>Algorithm and time complexity:</strong> {ideas.algorithm}</p>
              <p><strong>Tags:</strong> {ideas.taglist.join(' ')}</p>
              <p><strong>Contributors :</strong>{contri}</p>

              <div className={styles.downloadContainer}>
                <a href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDownloadAll(ideas.file);
                        }} >
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
            <h2>{status === 'Rejected' ? 'Reject Component' : 'Accept Component'}</h2>
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
                <span style={{ fontWeight: 'bold' }}>{tech == true ? 'Functional Review' : 'Legal Review'}</span>

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
