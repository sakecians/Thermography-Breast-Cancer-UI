import React from 'react';
import './Navbar.scss';

export default function Navbar() {
    return (
      <div className="nav">
        <div className="nav--items">
          <a href='/about'>About us</a>
        </div>
        <div className="nav--items">
          <a href='/about'>How to use?</a>
        </div>
      </div>
    );
}
