import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import ReviewComponent from './ReviewComponent';
import './App.css';

const App = () => {
    const { isLoading, isAuthenticated } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="centerDivStyle">
            <div className="review-card">
                <div className="logout-container">
                    {isAuthenticated ? <LogoutButton /> : null}
                </div>
                <h1>Hello, Hope You Like Our Product</h1>
                {isAuthenticated ? <ReviewComponent /> : <LoginButton />}
            </div>
        </div>
    );
};

export default App;
