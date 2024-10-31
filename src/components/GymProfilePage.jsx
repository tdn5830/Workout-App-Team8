import React, { useState, useEffect } from 'react';
import './GymProfilePage.css';
import { useNavigate } from 'react-router-dom';
import { Link, Navigate } from 'react-router-dom';
import Banner from './Banner.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, FireStoreDB } from '../config/firebaseConfig';
import { collection, getDocs, doc } from "firebase/firestore";


function GymProfilePage() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [savedGyms, setSavedGyms] = useState([]);

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


    // Retrieve Gym Profiles from Database
    const fetchGyms = async () => {
        try {
            const querySnapshot = await getDocs(collection(doc(FireStoreDB, "users", user.uid), "gyms"));
            const retrievedGyms = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setSavedGyms(retrievedGyms);
            console.log(savedGyms);
        } catch (error) {
            console.log("Error fetching save gyms from database");
        }
    };

    useEffect(() => {
        if (user) {
            fetchGyms();
        }
    }, [user]);

    
    const handleSelectGym = (gym) => {
        navigate('/gymProfile', { state: { gymID: gym.id, gymName: gym.gymName, equipment: gym.equipment } });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

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
                                <span>{gym.gymName}</span>
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