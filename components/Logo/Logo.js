import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './brain.png';

const Logo = () => {
	return (
		<div className='ma4 mt0'>
			 <Tilt className="Tilt br2 shadow-2">
      <div>
        <div className="Tilt-inner" pa3><img style={{paddingTop:'20px', height:'100px', width:'100px'}} alt='logo' src={brain}/></div>
      </div>
    </Tilt>
    </div>
		);
}

export default Logo;