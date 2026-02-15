import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import { getSectionBySlug, getAllSections } from '../utils/toolData.js';
import './GuidePage.css';

function GuideToolCard({ tool, rank }) {
  return (
    <Card className="guide-tool-card bordered" elevation={0}>
      <CardContent>
        <Grid container spacing={3} alignItems="flex-start">
          <Grid item>
            <div className="guide-rank">
              {rank}
            </div>
          </Grid>
          <Grid item xs>
            <div className="guide-tool-header">
              {tool.square_logo_url && !tool.square_logo_url.startsWith('data:') && (
                <img src={tool.square_logo_url} alt="" className="guide-tool-logo" />
              )}
              <div>
                <Link to={'/tools/' + tool.slug} className="guide-tool-title-link">
                  <Typography variant="h5" component="h3" className="guide-tool-name">
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
              <Card elevation={0} className="guide-screenshot-card">
                <CardMedia
                  image={tool.screenshot_url}
                  title={tool.title}
                  className="guide-screenshot"
                />
              </Card>
            )}

            <Typography variant="body1" className="guide-tool-description">
              {tool.description}
            </Typography>

            {tool.badges && tool.badges.length > 0 && (
              <div className="guide-badges">
                {tool.badges.map((badge, i) => (
                  <div key={i} className="guide-badge">
                    <Icon className="guide-badge-icon">{badge.icon}</Icon>
                    <span className="guide-badge-text">{badge.text}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="guide-tool-actions">
              <Button
                variant="contained"
                className="guide-visit-btn"
                href={tool.homepage_url + '?ref=fiction.tools'}
                target="_blank"
                rel="noreferrer"
                size="small"
              >
                Visit {tool.title} &rarr;
              </Button>
              <Link to={'/tools/' + tool.slug}>
                <Button variant="outlined" className="guide-details-btn" size="small">
                  Full details
                </Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function GuidePage() {
  const { sectionSlug } = useParams();
  const section = getSectionBySlug(sectionSlug);

  if (!section) {
    return (
      <Container maxWidth="lg" style={{padding: '4em 0', textAlign: 'center'}}>
        <Typography variant="h4">Guide not found</Typography>
        <Typography paragraph style={{marginTop: '1em'}}>
          We couldn't find a guide matching that URL.
        </Typography>
        <Link to="/" className="primary-text">Back to all tools</Link>
      </Container>
    );
  }

  const rankedTools = [...section.tools].sort((a, b) => (b.rating || 3) - (a.rating || 3));

  return (
    <React.Fragment>
      <div className="guide-hero">
        <Container maxWidth="lg">
          <div className="guide-breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <Link to="/guides" className="breadcrumb-link">Guides</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{section.name}</span>
          </div>
          <Typography variant="h3" component="h1" className="guide-hero-title">
            Best {section.name} for Fiction Writers
          </Typography>
          <Typography variant="subtitle1" className="guide-hero-subtitle">
            {rankedTools.length} {section.name.toLowerCase()} tools reviewed and ranked
            &nbsp;&bull;&nbsp;
            Category: {section.categoryTitle}
          </Typography>
          <Typography variant="body1" className="guide-hero-intro">
            Looking for the best {section.name.toLowerCase()} tools? We've reviewed and compared
            {' '}{rankedTools.length} options to help fiction writers find the right fit for their workflow.
          </Typography>
        </Container>
      </div>

      <Container maxWidth="md" className="guide-content">
        <div className="guide-quick-nav">
          <Typography variant="subtitle2" gutterBottom style={{color: '#666'}}>
            Quick navigation
          </Typography>
          <div className="guide-quick-nav-chips">
            {rankedTools.map((tool, i) => (
              <a key={tool.slug} href={'#tool-' + tool.slug} className="guide-quick-chip-link">
                <Chip
                  label={(i + 1) + '. ' + tool.title}
                  size="small"
                  clickable
                  variant="outlined"
                  className="guide-quick-chip"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="guide-tool-list">
          {rankedTools.map((tool, i) => (
            <div key={tool.slug} id={'tool-' + tool.slug}>
              <GuideToolCard tool={tool} rank={i + 1} />
            </div>
          ))}
        </div>
      </Container>
    </React.Fragment>
  );
}

function GuidesIndexPage() {
  const sections = getAllSections();

  return (
    <React.Fragment>
      <div className="guide-hero">
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" className="guide-hero-title">
            Writing Tool Guides
          </Typography>
          <Typography variant="subtitle1" className="guide-hero-subtitle">
            Curated, ranked lists of the best tools for every part of the writing process
          </Typography>
        </Container>
      </div>
      <Container maxWidth="lg" className="guide-content">
        <Grid container spacing={3}>
          {sections.map((section) => (
            <Grid item xs={12} sm={6} md={4} key={section.slug}>
              <Link to={'/best/' + section.slug} className="guide-index-link">
                <Card className="guide-index-card bordered" elevation={0}>
                  <CardContent>
                    <Typography variant="h6" className="guide-index-title">
                      Best {section.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {section.categoryTitle}
                    </Typography>
                    <Chip
                      label={section.tools.length + ' tools'}
                      size="small"
                      className="guide-index-count"
                    />
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export { GuidesIndexPage };
export default GuidePage;
