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
import Typography from '@material-ui/core/Typography';

class TableOfContents extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
                  <a href={"#section-" + chapter.title.toLowerCase().split(' ').join('-')}>
                    {chapter.title}
                  </a>
                </li>
                <ul>
                {chapter.sections.map((section, j) => {
                  return(
                    <li key={j}>
                      <a href={"#" + chapter.title.toLowerCase().split(' ').join('-') + '-' + section.section.toLowerCase().split(' ').join('-')}>
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
