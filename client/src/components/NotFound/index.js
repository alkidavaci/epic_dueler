import React from 'react';

const NotFound = () => {
   
  return (
    <div className="hero is-fullheight is-primary" style={{ backgroundColor: "orange", fontSize: "4rem" }}>
    <div className="hero-body">
      <div className="container has-text-centered">
        <h1 className="title is-1 has-text-danger" style={{ fontSize: "7rem" }}>404</h1>
        <img src="/crossed-swords_2694-fe0f.png" alt="Epic Dueler not found" width="128" height="128" />
        <h2 className="subtitle is-2 has-text-weight-semibold" style={{ fontSize: "5rem" }}>Oops,</h2>
        <p className="is-size-3">It looks like you took a wrong turn.</p>
        <p className="is-size-3">The page you're looking for does not exist.</p>
        <p className="is-size-3">Please try again or contact support if the issue persists.</p>
      </div>
    </div>
  </div>
  );
  };
  
  export default NotFound;