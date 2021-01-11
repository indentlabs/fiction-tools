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
      <Grid container spacing={2} className="ToolList">
        <Grid item xs={12}>
          <a href="#top" className="float-right light-help-text">
            <i className="material-icons" style={{position: 'relative', top: '0.2em'}}>arrow_upward</i>
            Back to top
          </a>
          <Typography
            variant="h4"
            component="h2"
            className="primary-text"
            id={this.props.title.toLowerCase() + '-tools'}
            style={{paddingTop: '0.5em'}}
          >
            {this.props.title} tools
          </Typography>
        </Grid>
        {this.props.tool_list.map((section, i) => {
          let tools_not_shown = 0;

          return(
            <React.Fragment key={i}>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  component="h3"
                  className="secondary-text"
                  id={this.props.title.toLowerCase() + '-' + section.section.toLowerCase().split(' ').join('-')}
                  gutterBottom
                  gutterTop
                  style={{paddingTop: '1em'}}
                >
                  <a href={'#' + this.props.title.toLowerCase() + '-' + section.section.toLowerCase().split(' ').join('-')}
                    className="tertiary-text">
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

                    if (this.props.filter_type == 'Filter') {
                      let passed_filter = false;

                      // If we're in filter mode, we only want to show tools if they have at least one of the selected badges.
                      tool.badges.forEach((badge) => {
                        console.log('checking ' + badge.icon);
                        console.log(this.props.highlighted_badges.indexOf(badge.icon));
                        if (this.props.highlighted_badges.indexOf(badge.icon) > -1) {
                          passed_filter = true;
                          // return;
                        }
                      });

                      if (!passed_filter) {
                        tools_not_shown++;
                        return;
                      }
                    }

                    return(
                      <ToolCard
                        key={j}
                        {...tool}
                        highlighted_badges={this.props.highlighted_badges}
                      />
                    );
                  })}
                </Masonry>
                { tools_not_shown > 0 && (
                  <Typography style={{color: 'grey', textAlign: 'center'}}>
                    {tools_not_shown} tool{tools_not_shown == 1 ? '' : 's'} not shown due to your filter settings.
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} className="vertically-spaced"></Grid>
            </React.Fragment>
          );
        })}
        <Grid item xs={12} className="vertically-spaced"></Grid>
      </Grid>
    );
  }
};

ToolList.propTypes = {};

ToolList.defaultProps = {};

export default ToolList;
