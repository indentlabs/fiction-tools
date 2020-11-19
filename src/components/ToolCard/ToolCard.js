import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ToolCard.css';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

class ToolCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highlighted: false
    };
  }

  render() {
    return(
      <a href="https://www.notebook.ai" style={{textDecoration: 'none'}}>
        <Card
          onMouseEnter={() => { this.setState({highlighted: true}); }}
          onMouseLeave={() => { this.setState({highlighted: false}); }}
          elevation={this.state.highlighted ? 10 : 3}
        >
          <CardHeader
            title={this.props.title}
            subheader={this.props.subtitle}
            avatar={<img src={this.props.square_logo} height="100" width="100" />}
          />
          <CardMedia
            image={this.props.screenshot}
            title={this.props.title}
            style={{height: 0, paddingTop: '33.33%'}}
          />
          <CardContent>
            {this.props.description.split('\n').map(function(item, key) {
              return (
                <Typography key={key} paragraph="true">
                  {item}
                </Typography>
              )
            })}
          </CardContent>
          <CardActions disableSpacing>
            <Tooltip arrow interactive 
                     title={
                      <div style={{fontSize: '1.5em', padding: '10px'}}>
                        Has a free tier
                        </div>
                      } 
                     TransitionComponent={Zoom}
            >
              <IconButton>
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      </a>
    )
  }
};

ToolCard.propTypes = {};

ToolCard.defaultProps = {};

export default ToolCard;
