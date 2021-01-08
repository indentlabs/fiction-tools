import React, { Component } from 'react';
import './BadgeHighlighter.css';

import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Icon from '@material-ui/core/Icon';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import IconButton from '@material-ui/core/IconButton';

class BadgeHighlighter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,

      filter_type: this.props.filter_type
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
          return null;
        });
        return null;
      });
      return null;
    });

    badges.sort();
    return badges;
  }

  toggle_drawer() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return this.renderDrawer();
  }

  renderDrawer() {
    return(
      <React.Fragment>
        <span style={{position: 'fixed', right: 5, bottom: 10, background: 'white', zIndex: 1000}}>
          <Button variant="outlined" size="large" onClick={() => { this.toggle_drawer() }}>
            <i className="material-icons left" style={{marginRight: '0.25em'}}>filter_list</i>
            {this.props.filter_type} tools
          </Button>
        </span>
        <Drawer anchor='right' open={this.state.open} onClose={() => { this.toggle_drawer() }}>

          <ListItem>
            <RadioGroup name="filter_type"
                        value={this.props.filter_type}
                        onChange={(evt) => { this.props.change_filter_type_ref(evt.target.value ); }}
            >
              <FormControlLabel value="Highlight" control={<Radio />} label="Highlight tools" />
              <FormControlLabel value="Filter"    control={<Radio />} label="Filter tools" />
            </RadioGroup>
          </ListItem>

          <Divider />
          <List style={{width: '500px', overflowY: 'scroll'}}>
            {this.all_unique_badges().map((badge) => {
              if (badge == '') { return; }
              return (
                <ListItem key={badge}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={ this.props.highlighted_badges.indexOf(badge) > -1 }
                        onChange={() => { this.props.toggle_highlighted_badge_ref(badge); }}
                        name="highlight"
                      />
                    }
                    label={
                      <React.Fragment>
                        <i class="material-icons left" style={{position: 'relative', top: '3px'}}>{badge}</i>
                        <span style={{position: 'relative', top: '-2px', left: '5px'}}>
                          {this.badge_text_mapping(badge)}
                        </span>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              )
            })}
          </List>
          <Divider />
        </Drawer>
      </React.Fragment>
    );
  }

  renderInline() {
    return (
      <div className="BadgeHighlighter center-text">
        <Typography variant="h6" className="secondary-text">
          What's important to you?
        </Typography>
        <div className="bordered badge-list">
          {this.all_unique_badges().map((badge, i) => {
            return (
              <span key={i} className="badge" onClick={() => { this.props.toggle_highlighted_badge_ref(badge) }}>
                <Tooltip arrow
                  interactive
                  title={
                      <div className="tooltip-text">
                        {this.badge_text_mapping(badge)}
                      </div>
                    } 
                  TransitionComponent={Zoom}
                >
                  <IconButton style={{
                    color: this.props.highlighted_badges.indexOf(badge) === -1 ? 'grey' : '#F4B701'
                  }}>
                    <Icon className="badge-icon">{badge}</Icon>
                  </IconButton>
                </Tooltip>
              </span>
            )
          })}
        </div>
        <div className="help-text">
          Click any icon to highlight it on relevant tools.
        </div>
      </div>
    );
  }
}

BadgeHighlighter.propTypes = {};
BadgeHighlighter.defaultProps = {};
export default BadgeHighlighter;
