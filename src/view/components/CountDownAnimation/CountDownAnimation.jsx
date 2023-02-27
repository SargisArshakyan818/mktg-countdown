import React from 'react';
import PropTypes from 'prop-types';
import { ANIMATION_COLOR } from '../../../constants/constants';

/**
 * A countdown animation component that displays a colored bar based on the progress.
 * @param {object} props - The component props.
 * @param {string} props.progress - The progress of the countdown as a string in percentage.
 * @param {string} props.bgColor - The background color of the bar.
 * @returns {JSX.Element} - A React component that displays the countdown animation.
 */
export default function CountDownAnimation({ progress, bgColor }) {
  return (
    <div className="animation">
      <div
        className="animation-inner"
        data-testid="animation-inner"
        style={{ height: progress, backgroundColor: bgColor }}
      />
    </div>
  );
}

CountDownAnimation.propTypes = {
  progress: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
};

CountDownAnimation.defaultProps = {
  progress: '0%',
  bgColor: ANIMATION_COLOR,
};
