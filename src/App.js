import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ToolCard from "./components/ToolCard/ToolCard.js";

function App() {
  return (
    <Container className="App" fixed>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" component="h1" align="center" color="primary">
            Fiction.Tools
          </Typography>
          <Typography align="center" paragraph="true">
            A collection of helpful tools for authors at every stage of the writing process.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4" color="secondary" gutterBottom>
            Table of Contents
          </Typography>
          <ul>
            <li>Worldbuilding</li>
          </ul>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4" component="h2" color="secondary" gutterBottom>
            Worldbuilding
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <ToolCard
            title={"Notebook.ai"}
            subtitle={"The smart worldbuilding notebook"}
            square_logo={"https://www.notebook.ai/assets/logos/book-small-42459c9b5feab2a71f20540b0f3035507802ecb7f9aa5899238ed8f69e34560d.png"}
            screenshot={"https://www.notebook.ai/assets/logos/book-small-42459c9b5feab2a71f20540b0f3035507802ecb7f9aa5899238ed8f69e34560d.png"}
            description={`
              Your digital notebook grows and collaborates with you as you create magnificent universes — and everything within them.
              Create a universe (literally) and track every aspect of its characters, locations, items, and more. Our AI writing assistant asks questions about your content, helping you dive deeper than ever into your world.
            `}
          />
        </Grid>

      </Grid>
    </Container>
  );
}

export default App;
