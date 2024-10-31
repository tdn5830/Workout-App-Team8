import React, { useState, useEffect } from 'react';
import './GymProfilePage.css';
import { useNavigate } from 'react-router-dom';
import { Link, Navigate } from 'react-router-dom';
import Banner from './Banner.jsx';

function GymProfilePage() {

    //check for auth status

    //redirect to homepage if not logged in

    //Allow user to create new "Gym profile" 

    //Display current gym profiles
    const navigate = useNavigate();
    const savedGyms = [
        {
            id: 1,
            name: "Home Gym",
            equipment: ["Treadmill", "Dumbbells", "Bench Press", "Pull-up Bar"]
        },
        {
            id: 2,
            name: "UTA Gym",
            equipment: ["Elliptical", "Rowing Machine", "Kettlebells", "Squat Rack"]
        },
        {
            id: 3,
            name: "Hotel Gym",
            equipment: ["Leg Press", "Cable Machine", "Spin Bikes", "Battle Ropes"]
        }
    ];

    const handleSelectGym = (gym) => {
        navigate('/gymProfile', { state: { gymName: gym.name, equipment: gym.equipment } });
    };

    return (
        <div className="gymprofile-container">

            <Banner text="Gym Profiles Page"></Banner>

            <div className="button-container-gym-profiles">
                <Link to='/GymCreator' className="button-container-gym-profiles">
                    <button>Create New Gym</button>
                </Link>
            </div>

            <div className="user-gyms-dropdown">
                <h1>My Gyms</h1>
                {savedGyms.length > 0 ? (
                    <div >
                        <ul className="gym-list">
                            {savedGyms.map((gym) => (
                                <li
                                    key={gym.id}
                                    className="gym-item-button"
                                    onClick={() => handleSelectGym(gym)}
                                >
                                <img src="/src/local_assets/weightIcon.png" alt="gym icon" className="gym-icon" /> 
                                <span>{gym.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <h1>No Gyms Found</h1>
                )}
            </div>
        </div>

    );
}

export default GymProfilePage;