import React from 'react';
import LogoutButton from '../auth/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <header className="app-header flex justify-between items-center py-4 px-6 bg-white shadow-md rounded-b-lg">
      <h1 className="text-3xl font-extrabold text-blue-600">Mautic Marketplace</h1>
      {isAuthenticated && <LogoutButton />}
    </header>
  );
};

export default Header;
