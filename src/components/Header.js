import React from 'react';
import './Header.css';
import Icon from '../icon.png';

function Header(props) {
  return (
    <div className="header">
      <img id="icon" src={Icon} alt="icon"/>
      <h1>What's That Movie?</h1>
    </div>
  );
}

export default Header;
