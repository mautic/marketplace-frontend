import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Login from './components/auth/Login';
import ReviewsList from './components/reviews/ReviewsList';

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check for an existing session on initial load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth state changes to update the session
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup the subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      {!session ? (
        <Login />
      ) : (
        <div className="main-content">
          <p>Welcome, {session.user.email}!</p>
          <div className="review-section">
            <h2>Marketplace Reviews</h2>
            {/* Review form & list components will go here */}
            <ReviewsList session={session} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;