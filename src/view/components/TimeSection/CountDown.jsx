import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { timer } from '../../../helpers/timerFormatter.helper';
import { CountDownStatus } from '../../../constants/constants';
import {
  stopDisabledRenderer,
  imageRenderer,
  inputDisabledRenderer,
} from '../../../helpers/global.helpers';

import Play from '../../../assets/images/play.png';
import Pause from '../../../assets/images/pause.png';
import Stop from '../../../assets/images/stop.png';

/**
 * A countdown animation component that displays a colored bar based on the progress.
 * @param {object} props - The component props.
 * @param {number} props.duration - The duration for countdown timer.
 * @param {function} props.setDuration - Set the duration for countdown timer.
 * @param {number} props.remainingTime - The remaining time for countdown timer.
 * @param {function} props.setRemainingTime - Set the remaining time for countdown timer.
 * @returns {JSX.Element} - A React component that displays the countdown input and buttons.
 */
const Countdown = ({ duration, setDuration, remainingTime, setRemainingTime }) => {
  const inputRef = useRef(null);
  const [status, setStatus] = useState(CountDownStatus.INITIAL); // state for the current status of the countdown
  const [timerId, setTimerId] = useState(null); // state for the ID of the timer animation frame

  // function to start the countdown
  const startCountdown = () => {
    setStatus(CountDownStatus.START); // set status to "start"
    const startTime = Date.now();
    let remainingTime = duration * 1000;
    // animation function that will be called repeatedly using requestAnimationFrame()
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      remainingTime = duration * 1000 - elapsedTime;

      if (remainingTime <= 0) {
        resetAnimateFunction(); // stop the countdown when time runs out
        return;
      }

      setRemainingTime(remainingTime); // update remaining time state
      setTimerId(requestAnimationFrame(animate)); // call the animation function again
    };

    setRemainingTime(duration * 1000);
    setTimerId(requestAnimationFrame(animate)); // call the animation function
  };

  // function to pause the countdown
  const pauseCountdown = () => {
    setStatus(CountDownStatus.PAUSE); // set status to "pause"
    cancelAnimationFrame(timerId); // stop the animation frame
    setTimerId(null); // set the timer ID to null
  };

  // function to resume the countdown
  const resumeCountdown = () => {
    setStatus(CountDownStatus.RESUME); // set status to "resume"
    const startTime = Date.now();

    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const newRemainingTime = remainingTime - elapsedTime;

      if (newRemainingTime <= 0) {
        resetAnimateFunction(); // stop the countdown when time runs out
        return;
      }

      setRemainingTime(newRemainingTime); // update remaining time state
      setTimerId(requestAnimationFrame(animate)); // call the animation function again
    };

    setTimerId(requestAnimationFrame(animate)); // call the animation function
  };

  // function to stop the countdown
  const stopCountdown = () => {
    cancelAnimationFrame(timerId); // stop the animation frame
    resetFunction(); // reset the countdown
    if (inputRef && inputRef.current) {
      inputRef.current.value = ''; // clear the input field
    }
  };

  // function to reset the countdown
  const resetFunction = () => {
    setStatus(CountDownStatus.INITIAL); // set status to "initial"
    setDuration(0); // set duration state to 0
    setRemainingTime(0); // set remaining time state to 0
    setTimerId(null); // set timer ID to null
  };

  // function to reset the countdown and stop the animation frame
  const resetAnimateFunction = () => {
    cancelAnimationFrame(timerId); // stop the animation frame
    resetFunction(); // reset the countdown
  };

  // function to handle the start button click
  const startHandler = () => {
    switch (status) {
      case CountDownStatus.INITIAL:
        if (inputRef.current.value) {
          startCountdown();
        }
        break;
      case CountDownStatus.START:
      case CountDownStatus.RESUME:
        pauseCountdown();
        break;
      case CountDownStatus.PAUSE:
        resumeCountdown();
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {stopDisabledRenderer(status) ? (
        <input
          id="timer-input"
          type="number"
          placeholder="________________"
          ref={inputRef}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          disabled={inputDisabledRenderer(status)}
          min={0}
        />
      ) : (
        <div className="countdown" data-testid="countdown-id">
          {timer(remainingTime / 1000)}
        </div>
      )}
      <div className="flex-center">
        <button className="start-button" onClick={startHandler}>
          <img src={imageRenderer(status) ? Play : Pause} className="w-14" alt="play-pause" />
        </button>
        <button
          onClick={stopCountdown}
          className="stop-button"
          disabled={stopDisabledRenderer(status)}
        >
          <img src={Stop} className="w-14" alt="stop" />
        </button>
      </div>
    </div>
  );
};

export default Countdown;

Countdown.propTypes = {
  duration: PropTypes.number,
  setDuration: PropTypes.func,
  remainingTime: PropTypes.number,
  setRemainingTime: PropTypes.func,
};
