import React, { Component } from 'react';
import './TableOfContents.css';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

class TableOfContents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true
    };
  }

  icon_mapping(chapter_title) {
    switch(chapter_title) {
      case 'Worldbuilding': return 'language';
      case 'Writing':       return 'edit';
      case 'Revising':      return 'grading';
      case 'Publishing':    return 'book';
      default:              return 'help';
    }
  }

  render() {
    return this.renderStepper();
  }

  renderStepper() {
    return (
      <div className="TableOfContents">
        <Typography variant="h6" className="secondary-text center-text">
          Table of Contents
        </Typography>
        <Stepper nonLinear alternativeLabel activeStep={-1} className="bordered">
          {this.props.chapters.map((chapter, i) => {
            return(
              <Step key={i}>
                <StepButton completed={true} icon={<i className="material-icons">{this.icon_mapping(chapter.title)}</i>}>
                  <a href={'#' + chapter.title.toLowerCase().split(' ').join('-') + '-tools'} className="primary-text step-title">
                    {chapter.title}
                  </a>
                  <Divider className="vertically-spaced" />

                  {chapter.sections.map((section, j) => {
                    return(
                      <div className="step-section-title" key={j}>
                        <a href={"#" + chapter.title.toLowerCase().split(' ').join('-') + '-' + section.section.toLowerCase().split(' ').join('-')}
                          className="secondary-text">
                            <span className="tertiary-text">&para;</span>
                            &nbsp;
                            {section.section}
                        </a>
                      </div>
                    );
                  })}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
      </div>
    );
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
          <i className="material-icons">
            chevron_left
          </i>
          <Typography variant="h6" color="secondary" style={{padding: '0 10px'}}>
            Table of Contents
          </Typography>
        </div>
        <Divider />

        {this.props.chapters.map((chapter, i) => {
          return(
            <React.Fragment>
              <a href={"#section-" + chapter.title.toLowerCase().split(' ').join('-')}
                 style={{marginTop: '10px'}}>
                <Typography variant="h6" color="secondary" style={{padding: '0 10px'}}>
                  {chapter.title}
                </Typography>
              </a>
              {chapter.sections.map((section, j) => {
                return(
                  <a href={"#" + chapter.title.toLowerCase().split(' ').join('-') + '-' + section.section.toLowerCase().split(' ').join('-')}>
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
                  <a href={"#section-" + chapter.title.toLowerCase().split(' ').join('-')} style={{color: 'blue'}}>
                    {chapter.title}
                  </a>
                </li>
                <ul>
                {chapter.sections.map((section, j) => {
                  return(
                    <li key={j}>
                      <a href={"#" + chapter.title.toLowerCase().split(' ').join('-') + '-' + section.section.toLowerCase().split(' ').join('-')}
                          style={{color: 'blue'}}>
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
