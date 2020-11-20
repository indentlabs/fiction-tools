import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ToolCard from "./components/ToolCard/ToolCard.js";
import ToolList from "./components/ToolList/ToolList.js";

import worldbuilding_tools from './data/worldbuilding.json';
import writing_tools from './data/writing.json';
import revising_tools from './data/revising.json';
import publishing_tools from './data/publishing.json';

function App() {
  return (
    <Container className="App" maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" color="primary">
            Fiction.Tools
          </Typography>
          <Typography paragraph="true">
            A collection of helpful tools for authors looking to make things a little easier at every stage of the writing process.
          </Typography>
          <Typography variant="h5" component="blockquote" color="primary"  style={{borderLeft: '6px solid blue', paddingLeft: '20px'}}>
          "If my doctor told me I had only six minutes to live, I wouldn’t brood. I’d type a little faster."
          ― Isaac Asimov
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} style={{paddingLeft: '8em', paddingTop: '3em', paddingBottom: '3em'}}>
          <Typography variant="h4" color="secondary" gutterBottom>
            Table of Contents
          </Typography>
          <ul>
            <li>
              <a href="#section-worldbuilding">
                Worldbuilding
              </a>
            </li>
            <ul>
              <li>
                <a href="#worldbuilding-map-making-software">Map-making software</a>
              </li>
              <li>
                <a href="#worldbuilding-world-wikis">World wikis</a>
              </li>
            </ul>
            <li>
              <a href="#section-writing">
                Writing
              </a>
            </li>
            <ul>
              <li>
                <a href="#writing-word-processors">Word processors</a>
              </li>
            </ul>
            <li>
              <a href="#section-revising">
                Revising
              </a>
            </li>
            <ul>
              <li>
                <a href="#revising-critiques">
                  Critiques
                </a>
              </li>
            </ul>
            <li>
              <a href="#section-publishing">
                Publishing
              </a>
            </li>
            <ul>
              <li>
                <a href="#publishing-cover-art">
                  Cover art
                </a>
              </li>
              <li>
                <a href="#publishing-formatting">
                  Formatting
                </a>
              </li>
              <li>
                <a href="#publishing-submitting">
                  Submitting
                </a>
              </li>
            </ul>
          </ul>
        </Grid>

        <ToolList
          title="Worldbuilding"
          tool_list={worldbuilding_tools}
        />
        <ToolList
          title="Writing"
          tool_list={writing_tools}
        />
        <ToolList
          title="Revising"
          tool_list={revising_tools}
        />
        <ToolList
          title="Publishing"
          tool_list={publishing_tools}
        />
      </Grid>
    </Container>
  );
}

export default App;
