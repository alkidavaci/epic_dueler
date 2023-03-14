import { Link } from 'react-router-dom';

// Import Bulma as css Framework
import { Box, Button, Columns, Container, Section, Title } from 'react-bulma-components';

function Home() {
  return (
    <Section>
      <Container>
        <Columns className="is-centered">
          <Columns.Column size={6}>
            <Box>
              <Title className="has-text-centered">Welcome to Epic Dueler</Title>
              <Button.Group className="is-centered">
                <Link to="/login">
                  <Button color="primary">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button color="info">New Character</Button>
                </Link>
              </Button.Group>
            </Box>
          </Columns.Column>
        </Columns>
      </Container>
    </Section>
  );
}

export default Home;


