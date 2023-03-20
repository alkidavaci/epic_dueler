import { useState, useEffect } from 'react';
import Auth from '../../utils/Auth';
import Nav from '../Nav'
import './style.css'
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

  // return (
  //   <div>
  //   {isLoggedIn ? (<div className="header"  >
  //     <div className=" is-primary" style={{  }} role="navigation" aria-label="main navigation" >

  //         <div className='cont1'>
  //       <h1 className="title" style={{padding: '25px', top: '15px' }}>Epic Dueler</h1>


  //           <div className="" style={{ top: '10px', color: 'black', fontSize: '40px', fontFamily: 'monospace' }}>
  //             Hello, {username}!
  //           </div>
  //           <div className="" >
  //             <button style={{ width: "5rem", height: "5rem", fontSize: '20px', borderRadius: '100%', left: '2000px', backgroundColor: 'orange', fontFamily: 'monospace' }}
  //               variant="outline-primary"
  //               className="rounded-circle" onClick={handleLogout}>Logout</button>
  //           </div>

  //           <div className='cont2'>
  //             <Nav />
  //             {/* <Inventory /> */}
  //         </div>
  //         </div>
  //           </div>
  //         </div>
  //       ) : ( 
  //       <div>
  //         <h1 className="title" style={{ fontSize: '50px', left: '963px', position: 'absolute', padding: '25px', top: '15px' }}>Epic Dueler</h1>
  //         </div>
  //       )}

  //     </div>

  //   );
  // }

  return (
    <div>
      {isLoggedIn ? (
        <div className="header">
          <div className="is-primary container">
            <div className="cont1">
              <h1 className="title">Epic Dueler</h1>
              <div className="cont3">
                <div className="username">Hello, {username}!</div>
                <div className="logout-button">
                  <button className="button" onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </div>
            <div className="cont2">
              <Nav />
            </div>
          </div>
        </div>
      ) : (
        <div className="header">
          <h1 className="title">Epic Dueler</h1>
        </div>
      )}
    </div>
  );
};

export default Header;
