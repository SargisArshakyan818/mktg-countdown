import React, { useState } from 'react';
import CountDownAnimation from './view/components/CountDownAnimation/CountDownAnimation';

import { progressRenderer } from './helpers/progressRenderer.helper';
import { ANIMATION_COLOR } from './constants/constants';
import Countdown from './view/components/TimeSection/CountDown';

import './theme/global.scss';

/**
 * The root component of the application.
 *
 * @returns {JSX.Element} The JSX element representing the application.
 */
function App() {
  const [duration, setDuration] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  return (
    <div className="container">
      <CountDownAnimation
        progress={progressRenderer(remainingTime, duration)}
        bgColor={ANIMATION_COLOR}
      />
      <Countdown
        duration={duration}
        setDuration={setDuration}
        remainingTime={remainingTime}
        setRemainingTime={setRemainingTime}
      />
    </div>
  );
}

export default App;
