import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCamera,
  faRedo,
  faStar,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const navItems = [
  { to: '/', label: 'Home', icon: faHome },
  { to: '/scan', label: 'Scan', icon: faCamera },
  { to: '/care', label: 'Care', icon: faLeaf },
  { to: '/myplants', label: 'My Plants', icon: faStar },
  { to: '/settings', label: 'Settings', icon: faCog },
];

// Custom scan navbar for camera mode
function ScanNavBar({ onRetake, onCapture, onSave }) {
  return (
    <nav className="scan-navbar-mobile">
      <button className="scan-icon" onClick={onRetake}>
        <FontAwesomeIcon icon={faRedo} />
      </button>
      <button className="scan-icon scan-capture" onClick={onCapture}>
        <FontAwesomeIcon icon={faCamera} />
      </button>
      <button className="scan-icon" onClick={onSave}>
        <FontAwesomeIcon icon={faStar} />
      </button>
    </nav>
  );
}

export default function Navbar({ scanning, onRetake, onCapture, onSave }) {
  const location = useLocation();
  // Only show scan navbar if scanning is true and on scan page
  if (location.pathname === '/scan' && scanning) {
    return <ScanNavBar onRetake={onRetake} onCapture={onCapture} onSave={onSave} />;
  }
  return (
    <nav className="navbar-mobile main-navbar">
      {navItems.map(item => (
        <Link
          key={item.to}
          to={item.to}
          className={
            location.pathname === item.to ? 'nav-item active' : 'nav-item'
          }
        >
          <span className="nav-icon">
            <FontAwesomeIcon icon={item.icon} />
          </span>
          <span className="nav-label">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
