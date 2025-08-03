import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useAuth0 } from '@auth0/auth0-react';
import ErrorDisplay from '../ui/ErrorDisplay';

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= rating ? "on" : "off"}
            onClick={() => setRating(index)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

const ReviewForm = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || rating === 0) {
      setError('Please provide a title, review content, and a star rating.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // Get the Supabase JWT token from Auth0
      const token = await getAccessTokenSilently({
        audience: 'https://jcdbrnrngjowiuuobfva.supabase.co/rest/v1/',
        scope: 'openid profile email',
      });

      // Pass the JWT to Supabase to authenticate the user
      await supabase.auth.signInWithIdToken({
        provider: 'Auth0',
        token,
      });

      const { data, error } = await supabase
        .from('reviews')
        .insert([{ user_id: user.sub, title, content, rating }]);

      if (error) {
        throw error;
      }

      // Reset form fields
      setRating(0);
      setTitle('');
      setContent('');
    } catch (err) {
      console.error('Error submitting review:', err.message);
      setError('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h3>Add a New Review</h3>
      {error && <ErrorDisplay message={error} />}
      
      <StarRating rating={rating} setRating={setRating} />
      
      <input
        type="text"
        placeholder="Review Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={submitting}
      />
      <textarea
        placeholder="Your Review"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={submitting}
      />
      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
