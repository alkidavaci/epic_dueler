import { useState, useEffect } from 'react';
import Auth from '../../utils/Auth';
import Nav from '../Nav'
import Inventory from '../../pages/Inventory';
import Button from 'react-bootstrap/Button';

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
      // Uppercase first letter of username
      const userName = profile.data.username.slice(0, 1).toUpperCase() + profile.data.username.slice(1)
      setUsername(userName);
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
    <div className="header"  >
      <nav className="navbar is-primary" style={{ boxShadow: ' 0 0 8px #999' }} role="navigation" aria-label="main navigation" >

        <h1 className="title" style={{ fontSize: '50px', left: '963px', position: 'absolute', padding: '25px', top: '15px' }}>Epic Dueler</h1>
        {isLoggedIn && (
          <div className=''>

            <div className="navbar-item" style={{ top: '10px', color: 'black', fontSize: '40px', fontFamily: 'monospace' }}>
              Hello, {username}!
            </div>
            <div className="navbar-item" >
              <button style={{ width: "5rem", height: "5rem", fontSize: '20px', borderRadius: '100%', left: '2000px', backgroundColor: 'orange', fontFamily: 'monospace' }}
                variant="outline-primary"
                className="rounded-circle" onClick={handleLogout}>Logout</button>
            </div>

            <div>
              <Nav />
              {/* <Inventory /> */}
            </div>
          </div>
        )}
      </nav>
    </div>

  );
}

export default Header;
