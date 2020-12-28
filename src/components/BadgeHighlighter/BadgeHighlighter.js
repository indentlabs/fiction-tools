import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BadgeHighlighter.css';

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
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import StepButton from '@material-ui/core/StepButton';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Icon from '@material-ui/core/Icon';

import IconButton from '@material-ui/core/IconButton';

class BadgeHighlighter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true
    };
  }

  badge_text_mapping(icon) {
    switch(icon) {
      case 'access_time':     return "Offers a timed free trial of paid services";
      case 'attach_money':    return "Paid service or product";
      case 'money_off':       return "Offers a free tier and/or is free";
      case 'picture_in_picture_alt': return "Ad-supported";
      case 'school':          return "Offers some kind of educational/school discount";
      case 'shopping_cart':   return "Optional DLC available at additional costs";

      case 'cloud':           return "Web-based software";
      case 'desktop_mac':     return "Mac download available";
      case 'desktop_windows': return "Windows download available";
      case 'phone_android':   return "Android download available";
      case 'phone_iphone':    return "iPhone download available";

      case 'extension':       return "An extension or plugin for other software";
      case 'groups':          return "Open-source software";
      default:                return icon;
    }
  }

  all_unique_badges() {
    let badges = [];

    this.props.tool_list.map((section) => {
      section.tools.map((tool) => {
        tool.badges.map((badge) => {
          let icon = badge.icon;
          if (badges.indexOf(icon) === -1) {
            badges.push(icon);
          }
        });
      });
    });

    badges.sort();
    return badges;
  }

  render() {
    return (
      <div style={{textAlign: 'center', width: '100%', marginBottom: '5em'}}>
        <Typography variant="h6" color="primary" style={{textAlign: 'center'}}>
          What's important to you?
        </Typography>
        <div style={{border: '1px solid lightgrey', background: 'white', padding: '0.3em 0'}}>
          {this.all_unique_badges().map((badge) => {
            return (
              <span onClick={() => { this.props.toggle_highlighted_badge_ref(badge) }}>
                <Tooltip arrow
                  interactive
                  title={
                      <div style={{fontSize: '1.5em', padding: '10px'}}>
                        {this.badge_text_mapping(badge)}
                      </div>
                    } 
                  TransitionComponent={Zoom}
                >
                  <IconButton style={{
                    color: this.props.highlighted_badges.indexOf(badge) === -1 ? 'grey' : '#F50057'
                  }}>
                    <Icon style={{fontSize: '1.4em'}}>{badge}</Icon>
                  </IconButton>
                </Tooltip>
              </span>
            )
          })}
        </div>
        <div style={{color: 'grey', paddingTop: '0.3em'}}>
          Click any icon to highlight it on relevant tools.
        </div>
      </div>
    );
  }
}

BadgeHighlighter.propTypes = {};

BadgeHighlighter.defaultProps = {};

export default BadgeHighlighter;