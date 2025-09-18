import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCamera,
  faLeaf,
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

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar-mobile">
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
