import { useState, useEffect } from 'react';
import Auth from '../../utils/Auth';

function Header() {
  // Set isLoggedIn to true or false based on whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Set the username to the user's username if they are logged in
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if the user is logged in
    if (Auth.loggedIn()) {
      // Get the user's username from the decoded token
      const profile = Auth.getProfile();
      setUsername(profile.username);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Code to handle logging out the user goes here
    Auth.logout();
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
<div className="header">
  <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
    <div className="navbar-menu">
      <h1 className="title">Epic Dueler</h1>
      {isLoggedIn && (
        <div className="navbar-end">
          <div className="navbar-item">
            Hi, {username}
          </div>
          <div className="navbar-item" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
  </nav>
</div>

  );
}

export default Header;
