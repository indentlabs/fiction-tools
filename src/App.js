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
    <Container className="App" fixed>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" component="h1" color="primary">
            Fiction.Tools
          </Typography>
          <Typography paragraph="true">
            A collection of helpful tools for authors at every stage of the writing process.
          </Typography>
          <blockquote>quote about using tools?</blockquote>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4" color="secondary" gutterBottom>
            Table of Contents
          </Typography>
          <ul>
            <li>
              <a href="#section-worldbuilding">
                Worldbuilding
              </a>
            </li>
            <li>
              <a href="#section-writing">
                Writing
              </a>
            </li>
            <li>
              <a href="#section-revising">
                Revising
              </a>
            </li>
            <li>
              <a href="#section-publishing">
                Publishing
              </a>
            </li>
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
