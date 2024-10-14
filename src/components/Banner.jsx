import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoIcon from '../local_assets/logoSVG.jsx';
import HomeIcon from '../local_assets/homebutton.svg'
import './Banner.css';

function Banner() {



    return (
        <div className='bannerParent'>
            <div className="logo-container">
                <LogoIcon/>
                <p className='bannerText'>EzFit</p>
            </div>
            <div className="button-container">
                <Link to="/">
                    <img src={HomeIcon} alt="Home Icon" className='icon' />
                </Link>
            </div>
        </div>
    );
}

export default Banner;