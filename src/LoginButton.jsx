import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithPopup } = useAuth0();

    const handleLogin = () => {
        loginWithPopup().then(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const objectId = urlParams.get('objectId');
            if (objectId) {
                localStorage.setItem('objectId', objectId); // Store objectId in localStorage after login
            }
        });
    };

    return <button onClick={handleLogin}>Log In</button>;
};

export default LoginButton;
