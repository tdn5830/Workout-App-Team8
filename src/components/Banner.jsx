import React, { useState, useEffect } from 'react';
import LogoIcon from '../local_assets/logoSVG.jsx';
import './Banner.css';

function Banner() {



    return (
        <div className='bannerParent'>
            <LogoIcon/>
            <p className='bannerText'>EzFit</p>
        </div>
    );
}

export default Banner;