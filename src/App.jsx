import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './components/auth/Login';
import LogoutButton from './components/auth/LogoutButton';
import ReviewForm from './components/reviews/ReviewForm';
import ReviewsList from './components/reviews/ReviewsList';
import Header from './components/common/Header';

const App = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) {
    return <div className="loading-state">Loading...</div>;
  }

  return (
    <div className="App">
      <Header />
      {!isAuthenticated ? (
        <Login />
      ) : (
        <div className="main-content">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Marketplace Reviews</h1>
            <p>Welcome, {user.name}!</p>
            <LogoutButton />
          </div>
          <div className="review-section">
            <ReviewForm />
            <ReviewsList />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
