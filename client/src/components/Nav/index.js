import { Link } from 'react-router-dom';
import './style.css';

const Nav = () => {
  return (
    <nav className="navbar is-primary">
      <div className="container">
        <div className="navbar-menu" >
          <div className="navbar-start "  >
            <Link to="/Inventory" className="navbar-item" activeClassName="active">
              Inventory
            </Link>
            <Link to="/Fight" className="navbar-item" activeClassName="active">
              Fight
            </Link>
            <Link to="/Shop" className="navbar-item" activeClassName="active">
              Shop
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

