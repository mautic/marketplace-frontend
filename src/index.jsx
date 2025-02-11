import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
		domain="dev-f1ca33j6ux35wyoj.us.auth0.com"
		clientId="ebn3mUPwdazrO2e2wfrKOgQfdSSwh5nY"
		authorizationParams={{
			redirect_uri: window.location.origin
		}}
	>
		<App />
	</Auth0Provider>,
);