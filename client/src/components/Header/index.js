import { useState, useEffect } from 'react';
// Import the jwt_decode library
import jwt_decode from 'jwt-decode'; 

function Header() {
    // Set isLoggedIn to true or false based on whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  // Set the username to the user's username if they are logged in
  const [username, setUsername] = useState(''); 

  useEffect(() => {
    // Get the token from local storage (or wherever it's stored)
    const token = localStorage.getItem('token'); 
    if (token) {
      const decoded = jwt_decode(token); // Decode the token to get the user's information
      setIsLoggedIn(true);
      setUsername(decoded.username); // Set the username to the user's username from the token
    }
  }, []);

  const handleLogout = () => {
    // Code to handle logging out the user goes here
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <div className="header">
      {isLoggedIn && (
        <div className="username">
          Logged in as {username}
        </div>
      )}
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button>Login</button>
      )}
    </div>
  );
}

export default Header;