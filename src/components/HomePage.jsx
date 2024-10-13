import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../config/firebaseConfig.js'
import './HomePage.css';

function HomePage() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for authentication state changes
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });

      return () => unsubscribe(); // Clean up the listener on unmount
    }, []);

  const signInWithGoogle = async () => {
      try {
        await signInWithPopup(auth, provider);
        console.log('User signed in');
      } catch (error) {
        console.error('Error signing in: ', error);
      }
    };

    const handleLogout = async () => {
      try {
        await auth.signOut();
        console.log('User signed out');
      } catch (error) {
        console.error('Error signing out: ', error);
      }
    };

      // If still loading, show a loading message
    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <div className='parentContainer'>

        <div className='navBar'>
          {user ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={signInWithGoogle}>Login</button>
          )}
        </div>

        <h1>Workout App</h1>

        <Link to="/inputForm">
          <button className='button'>Generate Workout</button>
        </Link>

        {/* Only render the following buttons if the user is logged in */}
      {user && (
        <Link to="/gymProfiles">
          <button className='button'>Gym Profiles</button>
        </Link>
      )}
        
      </div>
    )
  }
  
  export default HomePage
  