import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import ToolList from '../components/ToolList/ToolList.js';
import TableOfContents from '../components/TableOfContents/TableOfContents.js';
import BadgeHighlighter from '../components/BadgeHighlighter/BadgeHighlighter.js';
import SEO from '../components/SEO.js';
import { getCategories, getAllSections } from '../utils/toolData.js';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlighted_badges: [],
      filter_type: "Highlight"
    };
  }

  toggle_badge_highlight(icon) {
    let index = this.state.highlighted_badges.indexOf(icon);
    let list  = this.state.highlighted_badges;
    if (index !== -1) {
      list.splice(index, 1);
    } else {
      list.push(icon);
    }
    this.setState({ highlighted_badges: list });
  }

  change_filter_type(new_type) {
    this.setState({ filter_type: new_type });
  }

  render() {
    const categories = getCategories();
    const sections = getAllSections();

    return (
      <React.Fragment>
        <SEO path="/" />
        <div className="hero-blockquote border-bottom">
          <Container maxWidth="lg">
            <Grid container>
              <Grid item xs={12} md={12} lg={8}>
                <Typography variant="h5" component="blockquote" className="bordered-text">
                  If my doctor told me I had only six minutes to live, I wouldn't brood. I'd type <span className="bold-text">a little faster</span>.
                </Typography>
                <br />
                <cite className="primary-text">Isaac Asimov</cite>
              </Grid>
              <Grid item xs={12} md={12} lg={8}>
                <Typography paragraph={true} className="context">
                  Fiction<strong>.</strong>Tools is a growing collection of helpful tools for authors. Use the right tool to work through every stage of the writing
                  process and get your perfect story out just <span className="bold-text">a little faster</span>.
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </div>

        <Container maxWidth="lg" style={{marginTop: '1em', marginBottom: '2em'}}>
          <Typography variant="h6" className="secondary-text" gutterBottom>
            Browse guides
          </Typography>
          <Grid container spacing={2}>
            {sections.map((section) => (
              <Grid item xs={6} sm={4} md={3} key={section.slug}>
                <Link to={'/best/' + section.slug} className="guide-link">
                  <div className="guide-chip">
                    Best {section.name}
                    <span className="guide-chip-count">{section.tools.length} tools</span>
                  </div>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Container className="App" maxWidth="lg">
          <Grid container spacing={3}>
            <TableOfContents
              chapters={categories.map((cat) => ({
                title: cat.title,
                sections: cat.sections
              }))}
            />

            <BadgeHighlighter
              highlighted_badges={this.state.highlighted_badges}
              filter_type={this.state.filter_type}
              toggle_highlighted_badge_ref={this.toggle_badge_highlight.bind(this)}
              change_filter_type_ref={this.change_filter_type.bind(this)}
              tool_list={[].concat(
                ...categories.map((cat) => cat.sections)
              )}
            />

            {categories.map((cat) => (
              <ToolList
                key={cat.key}
                title={cat.title}
                tool_list={cat.sections}
                highlighted_badges={this.state.highlighted_badges}
                filter_type={this.state.filter_type}
              />
            ))}
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default HomePage;
