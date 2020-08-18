import React, { Component } from 'react';
import invariant from 'invariant';
import { getSafePercent, getStepPosition } from 'utils/index';

class ProgressBar extends Component {
  render() {
    const {
      percent,
      children,
      stepPositions = [],
      unfilledBackground = null,
      filledBackground = null,
      width = null,
      height = null,
      hasStepZero = true,
      text = null
    } = this.props;

    invariant(
      !(stepPositions.length > 0 && stepPositions.length !== React.Children.count(children)),
      'When specifying a stepPositions props, the number of children must match the length of the positions array.'
    );

    const safePercent = getSafePercent(percent);

    return (
      <div className='RSPBprogressBar' style={{ background: unfilledBackground, width, height }}>
        {/* Here we're looping over the children to clone them and add them custom props */}
        {React.Children.map(children, (step, index) => {
          const position =
            stepPositions.length > 0
              ? stepPositions[index]
              : getStepPosition(React.Children.count(children), index, hasStepZero);

          return React.cloneElement(step, {
            accomplished: position <= safePercent,
            position,
            index
          });
        })}

        {text ? <div className='RSPBprogressBarText'>{text}</div> : null}

        <div
          className='RSPBprogression'
          style={{
            background: filledBackground,
            width: `${safePercent}%`
          }}
        />
      </div>
    );
  }
}

export default ProgressBar;
