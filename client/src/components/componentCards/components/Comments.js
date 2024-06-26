import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../styles/ComponentCard.css'; // Ensure you have a CSS file for styling

const Comments = ({ component }) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(1);
  const userEmail = localStorage.getItem('user');
  const data = JSON.stringify(userEmail).email;

const userData=null
  const [newComment, setNewComment] = useState({
    rating: 0,
    title: '',
    body: '',
    author: '',
    date: new Date().toLocaleDateString(),
    likes: 0,
    dislikes: 0,
    author : data
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch comments when the component mounts
  const fetchComments = async () => {
    try {
      console.log("id: ",component._id)
      const url = `${SERVER_URL}api/comments/fetchComments/${component._id}`;
      // console.log(url);
      const response = await axios.get(url);
      // const response = await axios.get(``);
      console.log(response.data)
      setReviews(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const getUserInfo = async (id) => {
    try {
      const url = `${SERVER_URL}api/review/fetchUserInfo/${id}`;
      // console.log(url);
      const response = await axios.get(url);
      // console.log("Profile user:", response.data[0].name);
      return response.data; // Assuming response.data contains a user object with an 'email' field
    } catch (error) {
      console.error(`Error fetching user info: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('user');
      if (token) {
        console.log("token "+token);
        const userData = await getUserInfo(token);
        setNewComment((prevComment) => ({
          ...prevComment,
          author: userData.email || 'Anonymous',
        }));
      }
    };
    fetchUserData()
    fetchComments();
  }, [component._id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const url = `${SERVER_URL}api/comments/postComment/${component._id}`;
      // console.log(url);
      const response = await axios.post(url,newComment);
      // const response = await axios.post(`/`, newComment);
      //const userData=await getUserInfo(localStorage.getItem('user'))
      
      setReviews((prevReviews) => [...prevReviews, response.data]);
      setNewComment({
        rating: 0,
        title: '',
        body: '',
        author:data,
        date: new Date().toLocaleDateString(),
        likes: 0,
        dislikes: 0,
        
      });
      setIsModalOpen(false); // Close the modal after adding the comment
      fetchComments()
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  
  const handleLike = async (commentId, index) => {
    try {
      const url = `${SERVER_URL}api/comments/updateLikes/${component._id}/like/${commentId}`;
      const response = await axios.get(url);
      const updatedReviews = [...reviews];
      updatedReviews[index] = response.data;
      setReviews(updatedReviews);
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleDislike = async (commentId, index) => {
    try {
      const url = `${SERVER_URL}api/comments/updateDislikes/${component._id}/dislike/${commentId}`;
      const response = await axios.get(url);
      const updatedReviews = [...reviews];
      updatedReviews[index] = response.data;
      setReviews(updatedReviews);
    } catch (error) {
      console.error('Error disliking comment:', error);
    }
  };

  return (
    <section className="ratings">
      <h2>Comments</h2>
      <div className="comments-container">
        {reviews.slice(0, visibleReviews).map((review, index) => (
          <div key={index} className="review">
            <div className="review-header">
              <span className="review-title">{review.title}</span>
            </div>
            <div className="review-body">
              <p>{review.body}</p>
            </div>
            <div className="review-footer">
              <span className="review-author">{review.author}, {review.date}</span>
              <div className="review-actions">
              <span className="review-action" onClick={() => handleLike(review._id, index)}>👍 {review.likes}</span>
                <span className="review-action" onClick={() => handleDislike(review._id, index)}>👎 {review.dislikes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleReviews < reviews.length && (
        <button className="read-more-button" onClick={() => setVisibleReviews(reviews.length)}>Read More</button>
      )}
      <button className="open-modal-button" onClick={() => setIsModalOpen(true)}>Add Comment</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <form onSubmit={handleAddComment} className="add-comment-form">
              <h3>Add a Comment</h3>
              <input
                type="text"
                name="title"
                value={newComment.title}
                onChange={handleInputChange}
                placeholder="Title"
                required
              />
              <textarea
                name="body"
                value={newComment.body}
                onChange={handleInputChange}
                placeholder="Comment"
                required
              />
              <button type="submit">Add Comment</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Comments;
