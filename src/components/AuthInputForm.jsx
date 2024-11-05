import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './AuthInputForm.css';
import Banner from './Banner.jsx';
import { useNavigate } from 'react-router-dom';
import TargetAreaSelector from './TargetAreaSelector.jsx';
import DifficultySelector from './DifficultySelector.jsx';
import TimeSelector from './TimeSelector.jsx';

// This component is almost identical to InputForm.jsx with the following two expections
// 1. Only authenticated users can access this component
// 2. The user does not have to select their equipment since this page is accessed from their custom gym profile
function AuthInputForm() {
    const location = useLocation();
    const userEquipment = location.state || {};
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentStep, setCurrentStep] = useState(2); // Start at step 2 (Since selecting equipment is skipped)
    const [formData, setFormData] = useState({
      equipment: [], 
      target: null,
      difficulty: null,
      time: null
    });

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            equipment: userEquipment
        }));
        setIsLoaded(true);
    }, [userEquipment]);

    const handleNext = (data) => {
        setFormData(prevState => ({
            ...prevState,
            ...data
        }));
        setCurrentStep(currentStep + 1);
    };

    const navigate = useNavigate();

    // Auto-navigate and log formData when the user finishes input form
    useEffect(() => {
    if (currentStep === 5) {
        console.log('Form Data:', formData); 

        // Automatically navigate to the next page with formData
        navigate('/workoutGenerator', { state: { formData: formData } });
    }
    }, [currentStep, formData, navigate]);


    if (!isLoaded) {
        return (
            <div>
                <Banner></Banner>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div>
          <Banner text="Generate workout"></Banner>
          {currentStep === 2 && <TargetAreaSelector onNext={handleNext} />}
          {currentStep === 3 && <DifficultySelector onNext={handleNext} />}
          {currentStep === 4 && <TimeSelector onNext={handleNext} />}
        </div>
    );
}

export default AuthInputForm;