import React, { useState, useEffect } from 'react';
import './WorkoutGenerator.css'
import EquipmentSelector from './EquipmentSelector.jsx';
import TargetAreaSelector from './TargetAreaSelector.jsx';
import DifficultySelector from './DifficultySelector.jsx';
import TimeSelector from './TimeSelector.jsx';

function WorkoutGenerator() {

    const [currentStep, setCurrentStep] = useState(1); // Start at step 1
    const [formData, setFormData] = useState({
      equipment: [], 
      target: null,
      difficulty: null,
      time: null
    });

    const handleNext = (data) => {
      setFormData(prevState => ({
        ...prevState,
        equipment: [...prevState.equipment, ...data.equipment || []], 
        ...data
      }));
      setCurrentStep(currentStep + 1);
    };
    

    return (
        <div>
          {currentStep === 1 && <EquipmentSelector onNext={handleNext} />}
          {currentStep === 2 && <TargetAreaSelector onNext={handleNext} />}
          {currentStep === 3 && <DifficultySelector onNext={handleNext} />}
          {currentStep === 4 && <TimeSelector onNext={handleNext} />}
          {currentStep === 5 && (
            <div>
              <h2>Workout Summary</h2>
              <p><strong>Equipment:</strong> {formData.equipment.join(', ')}</p>
              <p><strong>Target Area:</strong> {formData.targetArea}</p>
              <p><strong>Difficulty:</strong> {formData.difficulty}</p>
              <p><strong>Time Available:</strong> {formData.time} minutes</p>
            </div>
      )}
        </div>
      );
}

export default WorkoutGenerator