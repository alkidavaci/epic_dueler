import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="navbar is-primary">
      <div className="container">
        <div className="navbar-menu" style={{padding:'15px'}}>
          <div className="navbar-end"  style={{left:'940px', fontSize:'29px', top:'10px', display:'flow'}}>
            <Link to="/Inventory" className="navbar-item" style={{left:'935px'}}>
              Inventory
            </Link>
            <Link to="/Fight" className="navbar-item" style={{left:'935px'}}>
              Fight
            </Link>
            <Link to="/Shop" className="navbar-item" style={{left:'935px'}}>
              Shop
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;