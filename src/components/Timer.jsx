import React, { useState, useEffect } from 'react';
import './Timer.css';

function CountdownTimer({ time }) {
  const [secondsRemaining, setSecondsRemaining] = useState(time);

  useEffect(() => {
    // Only start the timer if there is time left
    if (secondsRemaining > 0) {
      const timer = setInterval(() => {
        setSecondsRemaining((prevTime) => prevTime - 1);
      }, 1000);

      // Clear interval when component unmounts or the timer ends
      return () => clearInterval(timer);
    }
  }, [secondsRemaining]);

  // Convert seconds into minutes and seconds
  const formatTime = () => {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    // Add leading zero to seconds if needed
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <h1 className='timer-display'>{formatTime()}</h1>
    </div>
  );
}

export default CountdownTimer;