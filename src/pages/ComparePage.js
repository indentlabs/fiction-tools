import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { getComparableTools } from '../utils/toolData.js';
import './ComparePage.css';

function BadgeCheck({ badges, icon }) {
  const match = badges.find((b) => b.icon === icon);
  if (match) {
    return <span className="compare-badge-yes">{match.text}</span>;
  }
  return <span className="compare-badge-no">&mdash;</span>;
}

function ToolColumn({ tool }) {
  if (!tool) return null;

  return (
    <div className="compare-tool-column">
      <div className="compare-tool-header">
        {tool.square_logo_url && !tool.square_logo_url.startsWith('data:') && (
          <img src={tool.square_logo_url} alt="" className="compare-logo" />
        )}
        <div>
          <Link to={'/tools/' + tool.slug} className="compare-tool-title-link">
            <Typography variant="h5" component="h2" className="compare-tool-title">
              {tool.title}
            </Typography>
          </Link>
          {tool.subtitle && (
            <Typography variant="body2" color="textSecondary">
              {tool.subtitle}
            </Typography>
          )}
        </div>
      </div>

      {tool.screenshot_url && (
        <Card elevation={0} className="compare-screenshot-card">
          <CardMedia
            image={tool.screenshot_url}
            title={tool.title}
            className="compare-screenshot"
          />
        </Card>
      )}

      <Typography variant="body1" className="compare-description">
        {tool.description.split('\n')[0]}
      </Typography>

      <Button
        variant="outlined"
        fullWidth
        href={tool.homepage_url + '?ref=fiction.tools'}
        target="_blank"
        rel="noreferrer"
        className="compare-visit-btn"
      >
        Visit {tool.title} &rarr;
      </Button>
    </div>
  );
}

function ComparePage() {
  const { slugs } = useParams();
  const parts = slugs.split('-vs-');

  if (parts.length !== 2) {
    return (
      <Container maxWidth="lg" style={{padding: '4em 0', textAlign: 'center'}}>
        <Typography variant="h4">Invalid comparison</Typography>
        <Typography paragraph style={{marginTop: '1em'}}>
          Comparisons should be in the format: /compare/tool-a-vs-tool-b
        </Typography>
        <Link to="/" className="primary-text">Back to all tools</Link>
      </Container>
    );
  }

  const [tool1, tool2] = getComparableTools(parts[0], parts[1]);

  if (!tool1 || !tool2) {
    return (
      <Container maxWidth="lg" style={{padding: '4em 0', textAlign: 'center'}}>
        <Typography variant="h4">Tool not found</Typography>
        <Typography paragraph style={{marginTop: '1em'}}>
          We couldn't find one or both of the tools to compare.
        </Typography>
        <Link to="/" className="primary-text">Back to all tools</Link>
      </Container>
    );
  }

  // Collect all unique badge icons from both tools
  const allBadgeIcons = [];
  const badgeLabels = {};
  [tool1, tool2].forEach((tool) => {
    tool.badges.forEach((b) => {
      if (b.icon && !allBadgeIcons.includes(b.icon)) {
        allBadgeIcons.push(b.icon);
      }
      if (b.icon) {
        badgeLabels[b.icon] = b.icon;
      }
    });
  });

  const badgeIconToLabel = {
    'access_time': 'Free trial',
    'attach_money': 'Pricing',
    'money_off': 'Free tier',
    'picture_in_picture_alt': 'Ad-supported',
    'school': 'Education discount',
    'shopping_cart': 'DLC',
    'cloud': 'Web-based',
    'desktop_mac': 'Mac',
    'desktop_windows': 'Windows / Linux',
    'phone_android': 'Android',
    'phone_iphone': 'iPhone / iPad',
    'extension': 'Browser extension',
    'groups': 'Open-source',
  };

  return (
    <React.Fragment>
      <div className="compare-hero">
        <Container maxWidth="lg">
          <div className="tool-breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Compare</span>
          </div>
          <Typography variant="h3" component="h1" className="compare-hero-title">
            {tool1.title} vs {tool2.title}
          </Typography>
          <Typography variant="subtitle1" className="compare-hero-subtitle">
            A side-by-side comparison of two {tool1.sectionName.toLowerCase()} tools for fiction writers
          </Typography>
        </Container>
      </div>

      <Container maxWidth="lg" className="compare-content">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ToolColumn tool={tool1} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ToolColumn tool={tool2} />
          </Grid>
        </Grid>

        <div className="compare-table-section">
          <Typography variant="h5" gutterBottom className="section-heading">
            Feature comparison
          </Typography>
          <div className="compare-table">
            <div className="compare-table-header">
              <div className="compare-table-label">Feature</div>
              <div className="compare-table-cell">{tool1.title}</div>
              <div className="compare-table-cell">{tool2.title}</div>
            </div>
            {allBadgeIcons.map((icon) => (
              <div key={icon} className="compare-table-row">
                <div className="compare-table-label">
                  <Icon style={{fontSize: '1.1em', verticalAlign: 'middle', marginRight: '0.5em', color: '#298F6B'}}>
                    {icon}
                  </Icon>
                  {badgeIconToLabel[icon] || icon}
                </div>
                <div className="compare-table-cell">
                  <BadgeCheck badges={tool1.badges} icon={icon} />
                </div>
                <div className="compare-table-cell">
                  <BadgeCheck badges={tool2.badges} icon={icon} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default ComparePage;
