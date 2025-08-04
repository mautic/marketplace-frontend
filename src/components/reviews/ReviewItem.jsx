import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const StarRatingDisplay = ({ rating }) => {
  return (
    <div className="star-rating-display">
      {[...Array(5)].map((star, index) => (
        <span
          key={index}
          className={index < rating ? "on" : "off"}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

const ReviewItem = ({ review }) => {
  const { user } = useAuth0();

  // This is the frontend RLS fix: Check if the review belongs to the current user
  const isOwner = user && user.sub === review.user_id;

  const handleEdit = () => {
    console.log(`Editing review with ID: ${review.id}`);
    // Future: Add logic to open an edit modal
  };

  const handleDelete = () => {
    console.log(`Deleting review with ID: ${review.id}`);
    // Future: Add logic to delete the review from the database
  };
  
  return (
    <div className="review-item">
      <h3>{review.title}</h3>
      <StarRatingDisplay rating={review.rating} />
      <p>{review.content}</p>
      <small>
        Posted on: {new Date(review.created_at).toLocaleDateString()}
      </small>
      {isOwner && (
        <div className="review-actions">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
