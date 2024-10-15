import React, { useState, useEffect } from 'react';
import './GymProfilePage.css';
import Banner from './Banner.jsx';

function GymProfilePage() {

    //check for auth status

    //redirect to homepage if not logged in

    //Allow user to create new "Gym profile" 

    //Display current gym profiles

    //in Banner.jsx add homebutton opttion

    return (
        <div className="gymprofile-container">
            <Banner></Banner>
            <div className="box">
            <h1>Gym profiles page</h1>
            </div>
        </div>
    );
}

export default GymProfilePage;