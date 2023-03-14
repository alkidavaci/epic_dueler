import { Navbar as BulmaNavbar, Container } from 'react-bulma-components';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <BulmaNavbar color="start">
      <Container>
        <BulmaNavbar.Menu>
          <BulmaNavbar.Container position="end">
            <Link to="/Inventory">Inventory</Link>
            <Link to="/Fight">Fight</Link>
            <Link to="/Shop">Shop</Link>
          </BulmaNavbar.Container>
        </BulmaNavbar.Menu>
      </Container>
    </BulmaNavbar>
  );
};

export default Navbar;