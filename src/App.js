import './App.css';
import React from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import ToolList from "./components/ToolList/ToolList.js";
import TableOfContents from "./components/TableOfContents/TableOfContents.js";
import BadgeHighlighter from "./components/BadgeHighlighter/BadgeHighlighter.js";

import worldbuilding_tools from './data/worldbuilding.json';
import writing_tools from './data/writing.json';
import revising_tools from './data/revising.json';
import publishing_tools from './data/publishing.json';

import Typewriter from 'typewriter-effect';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      highlighted_badges: [],
      filter_type: "Highlight"
    }
  }

  toggle_badge_highlight(icon) {
    let index = this.state.highlighted_badges.indexOf(icon);
    let list  = this.state.highlighted_badges;
    if (index !== -1) {
      // Currently in the highlight list -- remove it!
      list.splice(index, 1);
    } else {
      // Not currently in the list -- add it!
      list.push(icon);
    }

    // Update
    this.setState({ highlighted_badges: list });
  }

  change_filter_type(new_type) {
    this.setState({ filter_type: new_type });
  }

  render() {
    return (
      <React.Fragment>
        <div className="logo-bar">
          <Container maxWidth="lg" className="logo">
            <div className="float-right white-text" style={{marginTop: '1.1em'}}>
              Compiled by&nbsp;
              <a href="http://www.indentlabs.com/" className="white-text bold-text">
                Indent Labs
              </a>
            </div>
            <Typography id="top" variant="h3" component="h1" className="white-text">
              <span className="float-left">
                <Typewriter
                  options={{
                    strings: ["fiction", "worldbuilding", "writing", "revising", "publishing", "awesomely awesome"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
              <strong>
                &nbsp;tools
              </strong>
            </Typography>
          </Container>
        </div>
        <div className="hero-blockquote border-bottom">
          <Container maxWidth="lg">
            <Grid container>
              <Grid item xs={12} md={12} lg={8}>
                <Typography variant="h5" component="blockquote">
                  If my doctor told me I had only six minutes to live, I wouldn’t brood. I’d type <span className="bold-text">a little faster</span>.
                </Typography>
                <br />
                <cite className="primary-text">Isaac Asimov</cite>
              </Grid>
              <Grid item xs={12} md={12} lg={8}>
                <Typography paragraph={true} className="context">
                  Fiction<strong>.</strong>Tools is a growing collection of helpful tools for authors. Use tools to work through every stage of the writing 
                  process and get your perfect story out just <span className="bold-text">a little faster</span>.
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </div>
        <Container className="App" maxWidth="lg">
          <Grid container spacing={3}>
            <TableOfContents
              chapters={
                [
                  {
                    title:    "Worldbuilding",
                    sections: worldbuilding_tools
                  },
                  {
                    title:    "Writing",
                    sections: writing_tools
                  },
                  {
                    title:    "Revision",
                    sections: revising_tools
                  },
                  {
                    title:    "Publishing",
                    sections: publishing_tools
                  }
                ]
              }
            />

            <BadgeHighlighter
              highlighted_badges={this.state.highlighted_badges}
              filter_type={this.state.filter_type}
              toggle_highlighted_badge_ref={this.toggle_badge_highlight.bind(this)}
              change_filter_type_ref={this.change_filter_type.bind(this)}
              tool_list={[].concat(
                worldbuilding_tools,
                writing_tools,
                revising_tools,
                publishing_tools
              )} 
            />

            <ToolList
              title="Worldbuilding"
              tool_list={worldbuilding_tools}
              highlighted_badges={this.state.highlighted_badges}
              filter_type={this.state.filter_type}
            />
            <ToolList
              title="Writing"
              tool_list={writing_tools}
              highlighted_badges={this.state.highlighted_badges}
              filter_type={this.state.filter_type}
            />
            <ToolList
              title="Revision"
              tool_list={revising_tools}
              highlighted_badges={this.state.highlighted_badges}
              filter_type={this.state.filter_type}
            />
            <ToolList
              title="Publishing"
              tool_list={publishing_tools}
              highlighted_badges={this.state.highlighted_badges}
              filter_type={this.state.filter_type}
            />
          </Grid>

          <Grid item xs={12} align="center">
            <Typography paragraph={true} className="primary-text">
              Made with <strong className="heart">&hearts;</strong> by <a href="http://www.indentlabs.com">
                Indent Labs
              </a>.
            </Typography>
            <Typography paragraph={true} className="secondary-text">
              This website is <a href="https://github.com/indentlabs/fiction-tools">open source</a>. Feel free to suggest changes!
            </Typography>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
