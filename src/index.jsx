import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
		domain="dev-67afa2olaw5xjd2x.us.auth0.com"
		clientId="YpYHyl81Zkn0n8x7y6oj8IjTlZe3bm9N"
		authorizationParams={{
			redirect_uri: window.location.origin
		}}
	>
		<App />
	</Auth0Provider>,
);