// Import Bulma as css Framework
import { Footer as BulmaFooter, Content, Container } from 'react-bulma-components';

const Footer = () => {
  return (
    <BulmaFooter>
      <Container>
        <Content style={{ textAlign: 'center' }}>
          <p>
            © 2023
          </p>
        </Content>
      </Container>
    </BulmaFooter>
  );
};

export default Footer;