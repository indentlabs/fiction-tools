import React, { Component } from 'react';
import './ToolList.css';

import ToolCard from "../ToolCard/ToolCard.js";
import Typography from '@material-ui/core/Typography';

import Masonry from 'react-masonry-component';
import Grid from '@material-ui/core/Grid';

class ToolList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <a href="#top" style={{float: 'right', color: 'lightgrey', textDecoration: 'none'}}>
            <i className="material-icons" style={{position: 'relative', top: '0.2em'}}>arrow_upward</i>
            Back to top
          </a>
          <Typography
            variant="h4"
            component="h2"
            color="secondary"
            id={"section-" + this.props.title.toLowerCase()}
            gutterBottom
          >
            {this.props.title}
          </Typography>
        </Grid>
        {this.props.tool_list.map((section, i) => {
          return(
            <React.Fragment key={i}>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  component="h3"
                  color="primary"
                  id={this.props.title.toLowerCase() + '-' + section.section.toLowerCase().split(' ').join('-')}
                  gutterBottom
                  style={{paddingTop: '1em'}}
                >
                  <a href={'#' + this.props.title.toLowerCase() + '-' + section.section.toLowerCase().split(' ').join('-')}
                    style={{color: '#F50057', textDecoration: 'none'}}>
                    &para;
                  </a>
                  &nbsp;
                  {section.section}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Masonry
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                    options={{
                      gutter: 20
                    }}
                >
                  {section.tools && section.tools.map((tool, j) => {
                    // We store blank templates in the JSON for easy reference, so lets make sure we skip over those
                    if (tool.title === "") {
                      return;
                    }

                    return(
                      <ToolCard
                        key={j}
                        {...tool}
                        highlighted_badges={this.props.highlighted_badges}
                        className="tool"
                      />
                    );
                  })}
                </Masonry>
              </Grid>
              <Grid item xs={12} style={{marginBottom: '1em'}}></Grid>
            </React.Fragment>
          );
        })}
        <Grid item xs={12} style={{marginBottom: '1em'}}></Grid>
      </Grid>
    );
  }
};

ToolList.propTypes = {};

ToolList.defaultProps = {};

export default ToolList;
