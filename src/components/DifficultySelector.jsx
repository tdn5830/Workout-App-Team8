import React from 'react';
import './DifficultySelector.css'

function DifficultySelector({ onNext }) {

    // Function to map the ID to the corresponding target area
    const handleDifficutlySelection = (id) => {
        const difficultyMap = {
            1: "beginner",
            2: "intermediate",
            3: "advanced"
        };

        // Call onNext with the corresponding target area
        onNext({ difficulty: difficultyMap[id] });
    };

    return (
        <div>
            <button onClick={() => handleDifficutlySelection(1)}>Beginner</button>
            <button onClick={() => handleDifficutlySelection(2)}>Intermediate</button>
            <button onClick={() => handleDifficutlySelection(3)}>Advanced</button>
        </div>
    );
}

export default DifficultySelector