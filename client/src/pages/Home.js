import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-6">
            <div className="box">
              <h1 className="title has-text-centered">⚔️</h1>
              <h1 className="title has-text-centered">Welcome to Epic Dueler</h1>
              <div className="buttons is-centered">
                <Link to="/login" className="button is-primary">
                  Login
                </Link>
                <Link to="/signup" className="button is-info">
                  New Character
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;


