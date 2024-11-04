import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './GymProfile.css';
import Banner from './Banner.jsx';
import equipmentData from '../local_assets/equipment.json';
function GymProfile() {
    // Use useLocation to retrieve the workoutList passed from the previous page
    const location = useLocation();
    const { gymID, gymName, equipment } = location.state || {};

    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        // Check if all props are defined
        if (gymID && gymName && equipment) {
            setIsLoaded(true);
            console.log(equipment);
        }
    }, [gymID, gymName, equipment]);

    // Loops through equipment database and renders equipment that user has
    const renderEquipmentCategory = (category) => {
        const foundEquipment = equipmentData[category]
            .filter(item => equipment.includes(item.name)) // Check if item name is in user's equipment list
            .map((item, index) => (
                <div key={index} className="equipment-listItem">
                    <img src={item.icon} alt={item.name} className="equipment-listIcon" />
                </div>
            ));

        if (foundEquipment.length === 0) {
            return (
                <div className="no-equipment">
                    <p>None</p>
                </div>
            );
        }

        return foundEquipment;
    };

    if (!isLoaded) {
        return (
            <div>
                <Banner></Banner>
                <p>Loading...</p>
            </div>
        );
    }
    return (
        <div className="gym-profile-container">
            <Banner text="Gym Profile"></Banner>
            <div className="gym-info-container">
                <div className="gym-image-container">
                    <img src="/src/local_assets/coolgym.jpg" alt="gym profile pic" className="gym-profile-picture"></img>
                </div>
                <div className="gym-stats-container">
                    <h1>{gymName}</h1>
                    <div className="stat-text-container">
                        <p>Workouts Completed: <span className="highlight">3</span></p>
                        <p>Time Spent: <span className="highlight">160 min</span></p>
                        <p>Last Workout: <span className="highlight">10/15/24</span></p>
                    </div>
                </div>
            </div>
            <div className ="gym-equipment-container">
                <h2>Equipment</h2>
                <div className="equipment-columns">
                    <div>
                        <p>Machines</p>
                        <div className="equipment-grid">
                            {renderEquipmentCategory("machine")}
                        </div>
                    </div>
                    <div>
                        <p>Freeweights</p>
                        <div className="equipment-grid">
                            {renderEquipmentCategory("freeweights")}
                        </div>
                    </div>
                    <div>
                        <p>Misc</p>
                        <div className="equipment-grid">
                            {renderEquipmentCategory("misc")}
                        </div>
                    </div>
                </div>
            </div>
            <div className="gym-workouts-container">
                <h2>Workouts</h2>
                <button>Create Workout</button>
            </div>  
        </div>
    );
}

export default GymProfile;