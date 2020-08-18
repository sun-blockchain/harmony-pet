import React, { Component } from 'react';
import './index.css';
import ProgressBar from './progress-bar';
import Step from './progress-bar/tracking-step';
import Pet from 'constants/Pet';

class StepProgressBar extends Component {
  render() {
    let steps = [];
    let progressArray = Pet[this.props.type].progress;
    for (let i = 0; i < progressArray.length; i++) {
      steps.push(
        <Step transition='scale' key={i}>
          {({ accomplished }) => (
            <img
              alt=''
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width='30'
              height='30'
              src={progressArray[i].src}
            />
          )}
        </Step>
      );
    }
    return (
      <ProgressBar
        percent={this.props.percent}
        filledBackground='linear-gradient(to right, orange, red)'
      >
        {steps}
      </ProgressBar>
    );
  }
}

export default StepProgressBar;
