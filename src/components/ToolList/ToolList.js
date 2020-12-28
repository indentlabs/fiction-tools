import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ToolList.css';

import ToolCard from "../ToolCard/ToolCard.js";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import Masonry from 'react-masonry-component';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

class ToolList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <span style={{float: 'right', color: 'lightgrey'}}>
            <i class="material-icons" style={{position: 'relative', top: '0.2em'}}>arrow_upward</i>
            Back to top
          </span>
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
        {this.props.tool_list.map((section) => {
          return(
            <React.Fragment>
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
                  {section.tools && section.tools.map((tool) => {
                    // We store blank templates in the JSON for easy reference, so lets make sure we skip over those
                    if (tool.title === "") {
                      return;
                    }

                    return(
                      <ToolCard
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
