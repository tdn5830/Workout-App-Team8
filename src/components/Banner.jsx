import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoIcon from '../local_assets/logoSVG.jsx';
import HomeIcon from '../local_assets/homebutton.svg'
import './Banner.css';

function Banner({text}) {


    return (
        <div className='bannerParent'>
            <div className="logo-container">
                <LogoIcon/>
                <p className='bannerText'>EzFit</p>
            </div>
            <div className='page-text'>
                {text && <p>{text}</p>} {/* Conditionally render text if text prop was passed in */}
            </div>
            <div className="button-container">
                <Link to="/" className="button-container">
                    <img src={HomeIcon} alt="Home Icon" className='icon' />
                </Link>
            </div>
        </div>
    );
}

export default Banner;