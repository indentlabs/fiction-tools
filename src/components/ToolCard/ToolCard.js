import React, { Component } from 'react';
import './ToolCard.css';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

// According to https://stackoverflow.com/questions/56369444/how-can-i-dynamically-load-an-icon-using-its-snake-case-name-react-material-ui,
// using the generic string-loaded Icon instead of importing individual icons
// will massively increase the JS bundle size. For the sake of making it easier
// for non-technical users to edit the JSON data files (which include icons),
// we're using <Icon /> anyway. 
import Icon from '@material-ui/core/Icon';

import IconButton from '@material-ui/core/IconButton';

class ToolCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highlighted: false
    };
  }

  render() {
    return(
      <a href={this.props.homepage_url}
         className="ToolCard"
         target="_blank" 
         rel="noreferrer"
      >
        <Card
          onMouseEnter={() => { this.setState({highlighted: true}); }}
          onMouseLeave={() => { this.setState({highlighted: false}); }}
          elevation={this.state.highlighted ? 10 : 0}
          style={{border: '1px solid lightgrey', marginBottom: '20px'}}
        >
          <CardHeader
            title={this.props.title}
            subheader={this.props.subtitle}
            avatar={this.props.square_logo_url ? <img src={this.props.square_logo_url} height="60" width="60" /> : <br />}
          />
          {this.props.screenshot_url && (
            <React.Fragment>
              <Divider />
              <CardMedia
                image={this.props.screenshot_url}
                title={this.props.title}
                style={{height: 0, paddingTop: '50%'}}
              />
              <Divider />
            </React.Fragment>
          )}
          <CardContent>
            {this.props.description.split('\n').map(function(item, key) {
              return (
                <Typography key={key} paragraph={true}>
                  {item}
                </Typography>
              )
            })}
          </CardContent>
          <Divider/>
          {this.props.badges && this.props.badges.length > 0 && (
            <CardActions disableSpacing>
              {this.props.badges.map((badge, i) => {
                return(
                  <Tooltip arrow 
                          interactive 
                          key={i}
                          title={
                              <div style={{fontSize: '1.5em', padding: '10px'}}>
                                {badge.text}
                              </div>
                            } 
                          TransitionComponent={Zoom}
                  >
                    <IconButton style={{
                      color: this.props.highlighted_badges.indexOf(badge.icon) === -1 ? 'grey' : '#F4B701'
                    }}>
                      <Icon>{badge.icon}</Icon>
                    </IconButton>
                  </Tooltip>
                );
              })}
            </CardActions>
          )}
        </Card>
      </a>
    )
  }
};

ToolCard.propTypes = {};

ToolCard.defaultProps = {};

export default ToolCard;


// free -> "offers some or all of its features for free"