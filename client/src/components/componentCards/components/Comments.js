import React from 'react'
import { useState } from 'react';



const Comments = ({component}) => {
    const [ratingValue, setRatingValue] = useState(component.stars);
    const [ratingCount, setRatingCount] = useState(1736);
    const [ratingBars, setRatingBars] = useState([
      { stars: 5, width: '70%' },
      { stars: 4, width: '15%' },
      { stars: 3, width: '10%' },
      { stars: 2, width: '3%' },
      { stars: 1, width: '2%' },
    ]);
    const [reviews, setReviews] = useState([
      {
        rating: 5.0,
        title: 'INSTALLING WHATSAPP WINDOWS',
        body: 'My laptop runs on Windows 10 Home. When I try to install from Windows Store I get an updating error referred to troubleshooter that fails to update.',
        author: 'Ziad',
        date: '14/04/2024',
        likes: 94,
        dislikes: 27,
      },
    ]);
  
    return (
      <section className="ratings">
        <h2>Comments</h2>
        {/* <div className="rating-overview">
          <div className="rating-score">
            <span className="rating-value">{ratingValue}</span>
            <span className="rating-stars">★</span>
            <span className="rating-count">{ratingCount} RATINGS</span>
          </div>
          <div className="rating-bars">
            {ratingBars.map((bar, index) => (
              <div key={index} className="rating-bar">
                {bar.stars}
                <span className="rating-bar-fill" style={{ width: bar.width }}></span>
                <span className="rating-bar-label"></span>
              </div>
            ))}
          </div>
        </div> */}
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <div className="review-header">
              {/* <span className="review-rating">{review.rating} ★</span> */}
              <span className="review-title">{review.title}</span>
            </div>
            <div className="review-body">
              <p>{review.body}</p>
            </div>
            <div className="review-footer">
              <span className="review-author">{review.author}, {review.date}</span>
              <div className="review-actions">
                <span className="review-action">👍 {review.likes}</span>
                <span className="review-action">👎 {review.dislikes}</span>
              </div>
            </div>
            <a className="read-more" href="#">Read more</a>
          </div>
        ))}
      </section>
    );
  };
  
export default Comments
