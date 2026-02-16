import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import SEO from '../components/SEO.js';

function NotFoundPage() {
  return (
    <React.Fragment>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist on Fiction.Tools."
        path="/404"
      />
      <Container maxWidth="lg" style={{padding: '4em 0', textAlign: 'center'}}>
        <Typography variant="h3" gutterBottom>
          Page not found
        </Typography>
        <Typography paragraph style={{marginTop: '1em', fontSize: '1.1em'}}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Link to="/" style={{textDecoration: 'none'}}>
          <Button variant="contained" className="guide-visit-btn" size="large">
            Back to all tools
          </Button>
        </Link>
      </Container>
    </React.Fragment>
  );
}

export default NotFoundPage;
