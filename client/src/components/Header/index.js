import { useState, useEffect } from 'react';
import AuthService from './AuthService';

function Header() {
  // Set isLoggedIn to true or false based on whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Set the username to the user's username if they are logged in
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if the user is logged in
    if (AuthService.loggedIn()) {
      // Get the user's username from the decoded token
      const profile = AuthService.getProfile();
      setUsername(profile.username);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Code to handle logging out the user goes here
    AuthService.logout();
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <div className="header">
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-menu">
        {isLoggedIn ? (
          <div className="navbar-end">
            <div className="navbar-item">
              Hi, {username}
            </div>
            <div className="navbar-item" onClick={handleLogout}>
              Logout
            </div>
          </div>
        ) : (
          <Home />
        )}
      </div>
    </nav>
  </div>
  );
}

export default Header;
