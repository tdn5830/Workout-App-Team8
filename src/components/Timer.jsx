import React, { useState, useEffect } from 'react';
import './Timer.css';

function CountdownTimer({ time }) {
  const [secondsRemaining, setSecondsRemaining] = useState(time);
  const [isPaused, setIsPaused] = useState(false); // New state for pause/resume

  useEffect(() => {
    // Only decrement time if not paused and time is greater than 0
    if (!isPaused && secondsRemaining > 0) {
      const timer = setInterval(() => {
        setSecondsRemaining((prevTime) => prevTime - 1);
      }, 1000);

      // Clear interval on unmount or when paused
      return () => clearInterval(timer);
    }
  }, [isPaused, secondsRemaining]);

  const formatTime = () => {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const togglePause = () => {
    setIsPaused((prevPaused) => !prevPaused);
  };

  return (
    <div className="timer-parent-box">
      <h1 className='timer-display'>{formatTime()}</h1>
      <button className="timer-button" onClick={togglePause}>
        {isPaused ? 'Resume' : 'Pause'}
      </button>
    </div>
  );
}

export default CountdownTimer;
