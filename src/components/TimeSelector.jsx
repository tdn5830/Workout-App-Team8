import React, { useState, useEffect } from 'react';
import './TimeSelector.css'

const defaultTime = 25;
const minTime = 15;
const maxTime = 60;

function TimeSelector({ onNext }) {

    const [inputTime, setInputTime] = useState(''); // input time value in minutes

    const handleInputChange = (e) => {
        setInputTime(e.target.value);
    };

    const handleSubmit= () => {
        const minutes = parseInt(inputTime) || 0;
  
        if (minutes === 0)
        {
            window.alert('Please enter a time in minutes');
            return;
        }

        if (minutes < minTime) {
            window.alert(`Please enter a time of ${minTime} minutes or higher`);
            return;
        }

        if (minutes > maxTime) {
            window.alert(`Please enter a time of ${maxTime} minutes or less.`);
            return;
        }

        onNext({ time: minutes });
        
        
    };

    return (
        <div>
            <h1>Time selector page</h1>
                <input 
                  type="number"
                  min={minTime}
                  max={maxTime}
                  value={inputTime}
                  step="5"
                  onChange={handleInputChange}
                  placeholder="Enter Time"
                  className="timer-input"
                />
                <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default TimeSelector