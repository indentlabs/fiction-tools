import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import { getToolBySlug, getRelatedTools, generateSlug } from '../utils/toolData.js';
import SEO from '../components/SEO.js';
import './ToolPage.css';

function ToolPage() {
  const { slug } = useParams();
  const tool = getToolBySlug(slug);

  if (!tool) {
    return (
      <Container maxWidth="lg" style={{padding: '4em 0', textAlign: 'center'}}>
        <Typography variant="h4">Tool not found</Typography>
        <Typography paragraph style={{marginTop: '1em'}}>
          We couldn't find a tool matching that URL.
        </Typography>
        <Link to="/" className="primary-text">Back to all tools</Link>
      </Container>
    );
  }

  const related = getRelatedTools(tool, 6);

  const seoDescription = tool.subtitle
    ? tool.title + ' — ' + tool.subtitle + '. ' + tool.description.split('\n')[0].substring(0, 120)
    : tool.description.split('\n')[0].substring(0, 160);

  return (
    <React.Fragment>
      <SEO
        title={tool.title + ' — ' + tool.sectionName + ' Tool'}
        description={seoDescription}
        path={'/tools/' + slug}
        image={tool.screenshot_url || undefined}
      />
      <div className="tool-hero">
        <Container maxWidth="lg">
          <div className="tool-breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <Link to={'/best/' + generateSlug(tool.sectionName)} className="breadcrumb-link">
              {tool.sectionName}
            </Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{tool.title}</span>
          </div>

          <Grid container spacing={3} alignItems="center">
            <Grid item>
              {tool.square_logo_url && !tool.square_logo_url.startsWith('data:') && (
                <img
                  src={tool.square_logo_url}
                  alt={tool.title + ' logo'}
                  className="tool-hero-logo"
                />
              )}
            </Grid>
            <Grid item xs>
              <Typography variant="h3" component="h1" className="tool-hero-title">
                {tool.title}
              </Typography>
              {tool.subtitle && (
                <Typography variant="h6" className="tool-hero-subtitle">
                  {tool.subtitle}
                </Typography>
              )}
              <div className="tool-hero-meta">
                <Chip
                  label={tool.categoryTitle}
                  size="small"
                  className="tool-category-chip"
                />
                <Chip
                  label={tool.sectionName}
                  size="small"
                  variant="outlined"
                  className="tool-section-chip"
                />
              </div>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                className="tool-visit-button"
                href={tool.homepage_url + '?ref=fiction.tools'}
                target="_blank"
                rel="noreferrer"
              >
                Visit {tool.title} &rarr;
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>

      <Container maxWidth="lg" className="tool-content">
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {tool.screenshot_url && (
              <Card className="tool-screenshot-card" elevation={0}>
                <CardMedia
                  image={tool.screenshot_url}
                  title={tool.title + ' screenshot'}
                  className="tool-screenshot"
                />
              </Card>
            )}

            <div className="tool-description">
              <Typography variant="h5" gutterBottom className="section-heading">
                About {tool.title}
              </Typography>
              {tool.description.split('\n').map((paragraph, i) => (
                <Typography key={i} paragraph style={{fontSize: '1.1em', lineHeight: 1.7}}>
                  {paragraph}
                </Typography>
              ))}
            </div>

            {related.length > 1 && (
              <div className="tool-compare-section">
                <Typography variant="h5" gutterBottom className="section-heading">
                  Compare with similar tools
                </Typography>
                <div className="compare-links">
                  {related.map((other) => (
                    <Link
                      key={other.slug}
                      to={'/compare/' + slug + '-vs-' + other.slug}
                      className="compare-link"
                    >
                      <Chip
                        label={tool.title + ' vs ' + other.title}
                        clickable
                        variant="outlined"
                        className="compare-chip"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="tool-sidebar-card" elevation={0}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Details
                </Typography>
                <Divider style={{marginBottom: '1em'}} />
                {tool.badges && tool.badges.length > 0 && (
                  <div className="tool-badges-list">
                    {tool.badges.map((badge, i) => (
                      <div key={i} className="tool-badge-row">
                        <Icon className="tool-badge-icon">{badge.icon}</Icon>
                        <span className="tool-badge-text">{badge.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <Divider />
              <CardActions style={{padding: '1em'}}>
                <Button
                  fullWidth
                  variant="outlined"
                  href={tool.homepage_url + '?ref=fiction.tools'}
                  target="_blank"
                  rel="noreferrer"
                  className="tool-sidebar-visit"
                >
                  Visit website &rarr;
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {related.length > 0 && (
          <div className="related-tools-section">
            <Typography variant="h5" gutterBottom className="section-heading">
              Other {tool.sectionName} tools
            </Typography>
            <Grid container spacing={3}>
              {related.map((other) => (
                <Grid item xs={12} sm={6} md={4} key={other.slug}>
                  <Link to={'/tools/' + other.slug} className="related-tool-link">
                    <Card className="related-tool-card bordered" elevation={0}>
                      <CardContent>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.75em', marginBottom: '0.5em'}}>
                          {other.square_logo_url && !other.square_logo_url.startsWith('data:') && (
                            <img src={other.square_logo_url} alt="" height="32" width="32" style={{borderRadius: 4}} />
                          )}
                          <div>
                            <Typography variant="subtitle1" style={{fontWeight: 600}}>
                              {other.title}
                            </Typography>
                            {other.subtitle && (
                              <Typography variant="body2" color="textSecondary">
                                {other.subtitle}
                              </Typography>
                            )}
                          </div>
                        </div>
                        <Typography variant="body2" style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}>
                          {other.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </Container>
    </React.Fragment>
  );
}

export default ToolPage;
