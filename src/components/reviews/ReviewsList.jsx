import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import ReviewItem from './ReviewItem';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorDisplay from '../ui/ErrorDisplay';

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch reviews from the database
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('reviews')
          .select('*');

        if (error) {
          throw error;
        }
        setReviews(data);
      } catch (err) {
        console.error('Error fetching reviews:', err.message);
        setError('Failed to fetch reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();

    // Set up a real-time subscription to listen for changes
    const subscription = supabase
      .from('reviews')
      .on('*', payload => {
        // Automatically re-fetch reviews when a change occurs
        fetchReviews();
      })
      .subscribe();

    // Clean up the subscription on unmount
    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []); // Empty dependency array means this runs once on mount

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <div className="reviews-list">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))
      ) : (
        <p>No reviews yet. Be the first to add one!</p>
      )}
    </div>
  );
};

export default ReviewsList;
