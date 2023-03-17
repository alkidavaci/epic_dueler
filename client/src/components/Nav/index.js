import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="navbar is-primary">
      <div className="container">
        <div className="navbar-menu">
          <div className="navbar-end">
            <Link to="/Inventory" className="navbar-item">
              Inventory
            </Link>
            <Link to="/Fight" className="navbar-item">
              Fight
            </Link>
            <Link to="/Shop" className="navbar-item">
              Shop
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;