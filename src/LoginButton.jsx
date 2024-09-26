import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// import ReviewContext, { useReviewContext } from './ReviewContext';

const LoginButton = () => {
  const { loginWithPopup } = useAuth0();
  const urlParams = new URLSearchParams(window.location.search);
  const objectId = urlParams.get('objectId');
  localStorage.setItem('objectId', objectId);
  // useEffect(() => {
    // if (objectId) {
    //   setObjectId(objectId); // Update context state after initial render
    // }
  // }, [objectId]); // Trigger only when objectId changes

  return <button onClick={() => loginWithPopup()}>Log In</button>;
};

export default LoginButton;
