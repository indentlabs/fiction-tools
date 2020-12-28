import './App.css';
import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ToolCard from "./components/ToolCard/ToolCard.js";
import ToolList from "./components/ToolList/ToolList.js";
import TableOfContents from "./components/TableOfContents/TableOfContents.js";
import BadgeHighlighter from "./components/BadgeHighlighter/BadgeHighlighter.js";

import worldbuilding_tools from './data/worldbuilding.json';
import writing_tools from './data/writing.json';
import revising_tools from './data/revising.json';
import publishing_tools from './data/publishing.json';

import Typewriter from 'typewriter-effect/dist/core';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      highlighted_badges: []
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

  render() {
    setTimeout(() => { 
      new Typewriter('#top', {
        strings: ['Fiction.Tools', 'Fiction Tools', 'Tools for writing fiction', 'Fiction.Tools', 'fiction-tools', "Tiction Fools", '"Fiction.Tools", by Indent Labs', 'FT', 'Fiction.Tools'],
        autoStart: true,
        loop: true
      });
    }, 1000);
    return (
      <React.Fragment>
        <Container maxWidth="lg" style={{marginTop: '30px'}}>
          <Typography id="top" variant="h3" component="h1" color="secondary">
            Fiction.Tools
          </Typography>
        </Container>
        <div style={{
          padding: '5em 10%',
          marginTop: '1em',
          background: '#3A54A8'
        }}>
          <Typography variant="h5" component="blockquote" style={{borderLeft: '6px solid #F50057', paddingLeft: '20px', fontSize: '3.8rem', color: 'white'}}>
            "If my doctor told me I had only six minutes to live, I wouldn’t brood. I’d type a little faster."
          </Typography><br />
          <div style={{fontSize: '2rem', color: 'lightgrey', float: 'right'}}>― Isaac Asimov</div>
        </div>
        <Container className="App" maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Typography paragraph={true} style={{fontSize: '2rem', marginBottom: '1.6em'}}>
                Fiction.tools is a growing collection of helpful tools for authors. Use tools to work through every stage of the writing 
                process and get your perfect story out just a little faster.
              </Typography>
            </Grid>

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
                    title:    "Revising",
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
              toggle_highlighted_badge_ref={this.toggle_badge_highlight.bind(this)}
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
            />
            <ToolList
              title="Writing"
              tool_list={writing_tools}
              highlighted_badges={this.state.highlighted_badges}
            />
            <ToolList
              title="Revising"
              tool_list={revising_tools}
              highlighted_badges={this.state.highlighted_badges}
            />
            <ToolList
              title="Publishing"
              tool_list={publishing_tools}
              highlighted_badges={this.state.highlighted_badges}
            />
          </Grid>

          <Grid item xs={12} align="center">
            <Typography paragraph={true} color="secondary">
              Made with <strong style={{color: 'red'}}>&hearts;</strong> by <a href="http://www.indentlabs.com">
                Indent Labs
              </a>.
            </Typography>
            <Typography paragraph={true} color="primary">
              This website is <a href="https://github.com/indentlabs/fiction-tools">open source</a>. Feel free to suggest changes!
            </Typography>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
