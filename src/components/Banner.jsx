import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoIcon from '../local_assets/logoSVG.jsx';
import './Banner.css';

function Banner() {



    return (
        <div className='bannerParent'>
            <LogoIcon/>
            <p className='bannerText'>EzFit</p>
            <Link to="/">
                <button className='button'>Home Button</button>
            </Link>
        </div>
    );
}

export default Banner;