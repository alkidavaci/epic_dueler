import { useState, useEffect } from 'react';
import AuthService from './AuthService';

// Import Bulma as css Framework
import { Navbar } from 'react-bulma-components';
import 'react-bulma-components/dist/react-bulma-components.min.css';

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
      <Navbar color="primary">
        {isLoggedIn ? (
          <Navbar.Menu>
            <Navbar.Container position="end">
              <Navbar.Item>
                Hi, {username}
              </Navbar.Item>
              <Navbar.Item onClick={handleLogout}>
                Logout
              </Navbar.Item>
              <Nav />
            </Navbar.Container>
          </Navbar.Menu>
        ) : (
          <Home />
        )}
      </Navbar>
    </div>
  );
}

export default Header;
