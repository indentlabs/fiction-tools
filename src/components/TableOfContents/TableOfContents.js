import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TableOfContents.css';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

class TableOfContents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true
    };
  }

  render() {
    return this.renderRetro();
  }

  renderNew() {
    return(
      <Drawer
        style={{width: 400, flexShrink: 0}}
        variant="persistent"
        anchor="right"
        open={this.state.open}
        classes={{
          paper: {
            width: 400
          }
        }}
        className="TableOfContents"
      >
        <div style={{display: 'flex', alignItems: 'center', padding: '10px', justifyContent: 'flex-start', width: 260}}>
          <i class="material-icons">
            chevron_left
          </i>
          <Typography variant="h6" color="primary" style={{padding: '0 10px'}}>
            Table of Contents
          </Typography>
        </div>
        <Divider />

        {this.props.chapters.map((chapter, i) => {
          return(
            <React.Fragment>
              <a href={"#section-" + chapter.title.toLowerCase().split(' ').join('-')}
                 style={{textDecoration: 'none', marginTop: '10px'}}>
                <Typography variant="h6" color="secondary" style={{padding: '0 10px'}}>
                  {chapter.title}
                </Typography>
              </a>
              {chapter.sections.map((section, j) => {
                return(
                  <a href={"#" + chapter.title.toLowerCase().split(' ').join('-') + '-' + section.section.toLowerCase().split(' ').join('-')}
                     style={{textDecoration: 'none'}}>
                    <ListItem button key={j} dense={true} style={{paddingLeft: '32px'}}>
                      <ListItemText primary={section.section} />
                    </ListItem>
                  </a>
                );
              })}
              <Divider style={{marginTop: '10px'}} />
            </React.Fragment>
          );
        })}
      </Drawer>
    );
  }

  renderRetro() {
    return(
      <div className="TableOfContents">
        <Typography variant="h4" color="secondary" gutterBottom>
          Table of Contents
        </Typography>
        <ul>
          {this.props.chapters.map((chapter, i) => {
            return(
              <React.Fragment>
                <li key={i}>
                  <a href={"#section-" + chapter.title.toLowerCase().split(' ').join('-')} style={{textDecoration: 'none', color: 'blue'}}>
                    {chapter.title}
                  </a>
                </li>
                <ul>
                {chapter.sections.map((section, j) => {
                  return(
                    <li key={j}>
                      <a href={"#" + chapter.title.toLowerCase().split(' ').join('-') + '-' + section.section.toLowerCase().split(' ').join('-')}
                          style={{textDecoration: 'none', color: 'blue'}}>
                        {section.section}
                      </a>
                    </li>
                  );
                })}
                </ul>
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    );
  }
}

TableOfContents.propTypes = {};

TableOfContents.defaultProps = {};

export default TableOfContents;
