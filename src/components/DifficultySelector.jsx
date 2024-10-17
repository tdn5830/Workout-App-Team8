import React from 'react';
import './DifficultySelector.css';

function DifficultySelector({ onNext }) {

    // Function to pass the selected difficulty as an integer
    const handleDifficultySelection = (difficulty) => {
        
        onNext({ difficulty });
    };

    return (
        <div>
            <h1>Select Difficulty Level</h1>
            <button onClick={() => handleDifficultySelection(1)}>Beginner</button>
            <button onClick={() => handleDifficultySelection(2)}>Intermediate</button>
            <button onClick={() => handleDifficultySelection(3)}>Advanced</button>
        </div>
    );
}

export default DifficultySelector;
