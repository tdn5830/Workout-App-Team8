import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './InputForm.css'
import Banner from './Banner.jsx';
import EquipmentSelector from './EquipmentSelector.jsx';
import TargetAreaSelector from './TargetAreaSelector.jsx';
import DifficultySelector from './DifficultySelector.jsx';
import TimeSelector from './TimeSelector.jsx';

function InputForm() {

    const [currentStep, setCurrentStep] = useState(1); // Start at step 1
    const [formData, setFormData] = useState({
      equipment: [], 
      target: null,
      difficulty: null,
      time: null
    });
    const navigate = useNavigate();

    const handleNext = (data) => {
      setFormData(prevState => ({
        ...prevState,
        equipment: [...prevState.equipment, ...data.equipment || []], 
        ...data
      }));
      setCurrentStep(currentStep + 1);
    };

  // Auto-navigate and log formData when the user finishes input form
  useEffect(() => {
    if (currentStep === 5) {
        console.log('Form Data:', formData); 

        // Automatically navigate to the next page with formData
        navigate('/workoutGenerator', { state: { formData: formData } });
    }
    }, [currentStep, formData, navigate]);
    

    return (
        <div>
          <Banner></Banner>
          {currentStep === 1 && <EquipmentSelector onNext={handleNext} />}
          {currentStep === 2 && <TargetAreaSelector onNext={handleNext} />}
          {currentStep === 3 && <DifficultySelector onNext={handleNext} />}
          {currentStep === 4 && <TimeSelector onNext={handleNext} />}
        </div>
      );
}

export default InputForm