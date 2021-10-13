import React from 'react';
import './Navbar.css';

export default function Navbar(props) {
    return (
      <div className='nav'>
        <div className='nav--items' onClick={props.handleAboutOpen}>
          About us
        </div>
        <div className='nav--items' onClick={props.handleHowToUseOpen}>
          How to use?
        </div>
      </div>
    );
}
