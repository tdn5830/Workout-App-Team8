import React, {useState, useEffect } from 'react';
import './GymProfileCreator.css';
import Banner from './Banner.jsx';
import EquipmentSelector from './EquipmentSelector.jsx';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, FireStoreDB} from '../config/firebaseConfig.js';
import { doc, collection, addDoc } from 'firebase/firestore';


function GymProfileCreator() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentStep, setCurrentStep] = useState(1); // Start at step 1
    const [formData, setFormData] = useState({
      equipment: [],
      gymName: "",
    });
    const [isUploaded, setIsUploaded] = useState(false);
    const navigate = useNavigate();

    //check for auth status
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    //redirect to homepage if not logged in
    useEffect(() => {
        if (!loading && !user) {
            navigate('/'); 
        }
    }, [loading, user, navigate]);

    
    // Upload gym to database and redirect user back to Gym Profiles Page
    useEffect(() => {
        const uploadGymData = async () => {
            try {
                console.log('Uploading data:', formData);
                await saveGymToDatabase(formData, user); 
                setIsUploaded(true); // Update state to trigger auto navigation to Gym Profiles Page
            } catch (error) {
                console.error("Error uploading data:", error);
            }
        };

        if (currentStep === 4 && formData.gymName && formData.equipment.length > 0) {
            uploadGymData();
        }
    
    }, [currentStep, formData]);

    useEffect(() => {
        if (isUploaded) {
            navigate('/gymProfilePage'); // Navigate once upload completes
        }
    }, [isUploaded, navigate]);

    const saveGymToDatabase = async (gymData, user) => {
        if (!user) {
            throw new Error("User is not authenticated");
        }
    
        try {
            // Reference to the user's gyms subcollection
            const gymsRef = collection(doc(FireStoreDB, "users", user.uid), "gyms");
    
            // Add the new gym data to the gyms subcollection
            await addDoc(gymsRef, {
                gymName: gymData.gymName,
                equipment: gymData.equipment,
            });
            
            console.log("Gym successfully added to the database");
        } catch (error) {
            console.error("Error adding gym to database:", error);
        }
    };

    // Updates equipment array
    const handleEquipmentSelection = (data) => {
        setFormData( prevState => ({
            ...prevState,
            equipment: [...prevState.equipment, ...data.equipment || []], 
            ...data
        }));
        setCurrentStep(currentStep + 1);
    };

    // Updates gym name
    const handleNameChange = (event) => {
        setFormData(prevState => ({
            ...prevState,
            gymName: event.target.value,
        }));
    };

    const handleSubmit = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleCancel = () => {
        navigate('/gymProfilePage');
    };
    

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="gym-profile-creator-container">
            <Banner text="Create New Gym"></Banner>
            {currentStep === 1 && 
                <div>
                    <input
                        type="text"
                        placeholder="Enter gym name"
                        value={formData.gymName}
                        onChange={handleNameChange}
                    />
                    <button onClick={() => setCurrentStep(2)}>Submit</button>
                </div>
            }
            {currentStep === 2 && <EquipmentSelector onNext={handleEquipmentSelection}></EquipmentSelector>}
            {currentStep === 3 && 
                <div className='confirmation-box'>
                    <h1>Confirm Gym Creation</h1>
                    <h2>Gym Name: {formData.gymName}</h2>
                    <p>Equipment</p>
                    <ul>
                        {formData.equipment.map((equipment) => (
                            <li>
                                <span>{equipment}</span>
                            </li>
                        ))}
                    </ul>
                    <div className='confirmation-button-container'>
                        <button onClick={handleSubmit}>Confirm</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            }
        </div>
    );
}

export default GymProfileCreator