import React from 'react';
import './TargetAreaSelector.css';

function TargetAreaSelector({ onNext }) {

    // Function to map the ID to the corresponding target area
    const handleTargetSelection = (id) => {
        const targetMap = {
            1: "arm",
            2: "fullbody",
            3: "leg"
        };

        onNext({ targetArea: targetMap[id] });
    };

    return (
        <div>
            <button onClick={() => handleTargetSelection(1)}>Arms</button>
            <button onClick={() => handleTargetSelection(2)}>Full Body</button>
            <button onClick={() => handleTargetSelection(3)}>Legs</button>
        </div>
    );
}

export default TargetAreaSelector;