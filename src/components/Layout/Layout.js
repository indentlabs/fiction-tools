import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './Layout.css';

function Layout({ children }) {
  return (
    <React.Fragment>
      <div className="logo-bar">
        <Container maxWidth="lg" className="logo">
          <div className="float-right white-text" style={{marginTop: '1.1em'}}>
            <Link to="/guides" className="white-text nav-link">Guides</Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            Compiled by&nbsp;
            <a href="http://www.indentlabs.com/" className="white-text bold-text">
              Indent Labs
            </a>
          </div>
          <Typography variant="h3" component="h1">
            <Link to="/" className="white-text" style={{textDecoration: 'none'}}>
              fiction<strong>.tools</strong>
            </Link>
          </Typography>
        </Container>
      </div>
      {children}
      <Container maxWidth="lg">
        <div style={{textAlign: 'center', padding: '2em 0'}}>
          <Typography paragraph={true} className="primary-text">
            Made with <strong className="heart">&hearts;</strong> by <a href="http://www.indentlabs.com">
              Indent Labs
            </a>.
          </Typography>
          <Typography paragraph={true} className="secondary-text">
            This website is <a href="https://github.com/indentlabs/fiction-tools">open source</a>. Feel free to suggest changes!
          </Typography>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Layout;
