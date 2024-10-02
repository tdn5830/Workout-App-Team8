import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {

    return (
      <div className='parentContainer'>

        <div className='navBar'>
            <button>Login</button>
        </div>

        <h1>Workout App</h1>

        <Link to="/inputForm">
          <button className='button'>Generate Workout</button>
        </Link>
        
      </div>
    )
  }
  
  export default HomePage
  