import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { supabase } from './supabase.js';
import { Rating } from '@mui/material';

const ReviewComponent = () => {
    const { user } = useAuth0();
    const [reviews, setReviews] = useState({});
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [hasSubmittedReview, setHasSubmittedReview] = useState(false);
    const [objectId, setObjectId] = useState(localStorage.getItem('objectId'));

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const currentObjectId = urlParams.get('objectId');

        if (currentObjectId) {
            localStorage.setItem('objectId', currentObjectId);
            setObjectId(currentObjectId);
        }

        const fetchReviews = async () => {
            try {
                const { data, error } = await supabase.from('reviews').select('*');
                if (error) throw error;
                const formattedReviews = {};
                data.forEach((review) => {
                    if (!formattedReviews[review.objectId]) {
                        formattedReviews[review.objectId] = {};
                    }
                    formattedReviews[review.objectId][review.user_id] = review;
                });
                setReviews(formattedReviews);

                if (user && objectId) {
                    setHasSubmittedReview(!!formattedReviews[objectId]?.[user.sub]);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [user, objectId]);

    const handleRatingSelect = (event, newRating) => {
        setRating(newRating);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (reviewText && rating > 0 && objectId) {
            try {
                const { error } = await supabase
                    .from('reviews')
                    .insert([
                        { user: user.nickname, picture: user.picture, user_id: user.sub, objectId, rating, review: reviewText },
                    ]);
                if (error) throw error;

                const newReview = { user: user.nickname, picture: user.picture, user_id: user.sub, objectId, rating, review: reviewText };
                setReviews((prevReviews) => ({
                    ...prevReviews,
                    [objectId]: {
                        ...prevReviews[objectId],
                        [user.sub]: newReview,
                    },
                }));
                setHasSubmittedReview(true);
                setReviewText('');
                setRating(0);
                setEditingReviewId(null);
            } catch (error) {
                console.error('Error submitting review:', error);
            }
        }
    };

    const handleEditReview = (reviewId) => {
        setEditingReviewId(reviewId);
        setReviewText(reviews[objectId][reviewId].review);
        setRating(reviews[objectId][reviewId].rating);
    };

    const handleSaveReview = async (e) => {
        e.preventDefault();
        if (reviewText && rating > 0 && objectId) {
            try {
                const { error } = await supabase
                    .from('reviews')
                    .update({ review: reviewText, rating: rating })
                    .match({ user_id: user.sub, objectId });
                if (error) throw error;

                setReviews((prevReviews) => ({
                    ...prevReviews,
                    [objectId]: {
                        ...prevReviews[objectId],
                        [user.sub]: {
                            ...prevReviews[objectId][user.sub],
                            review: reviewText,
                            rating: rating,
                        },
                    },
                }));
                setReviewText('');
                setRating(0);
                setEditingReviewId(null);
            } catch (error) {
                console.error('Error updating review:', error);
            }
        }
    };

    return (
        <>
            {(editingReviewId !== null || !hasSubmittedReview) && (
                <div className="rating-container">
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={handleRatingSelect}
                        max={5}
                    />
                </div>
            )}
            {!hasSubmittedReview && (
                <>
                    <h2>Submit a Review</h2>
                    <form onSubmit={handleReviewSubmit}>
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Write your review here..."
                            required
                        />
                        <button type="submit">Submit Review</button>
                    </form>
                </>
            )}
            {hasSubmittedReview && (
                <>
                    {editingReviewId === null ? (
                        <>
                            <h2>Your Review</h2>
                            <ul>
                                {reviews[objectId] &&
                                    Object.values(reviews[objectId])
                                        .filter(item => item.user_id === user.sub)
                                        .map((item, index) => (
                                            <li key={index}>
                                                <strong>{item.user}:</strong> {item.review} ({item.rating}/5)
                                                {editingReviewId !== item.user_id && (
                                                    <button onClick={() => handleEditReview(item.user_id)}>Edit</button>
                                                )}
                                            </li>
                                        ))}
                            </ul>
                        </>
                    ) : (
                        <>
                            <h2>Edit Review</h2>
                            <form onSubmit={handleSaveReview}>
                                <textarea
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    placeholder="Write your review here..."
                                    required
                                />
                                <button type="submit">Save Changes</button>
                            </form>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default ReviewComponent;
