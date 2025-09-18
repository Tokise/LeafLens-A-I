import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import '../css/Home.css';

export default function Home({ user }) {
  return (
    <>
      <div className="home-topbar">
        <img src={user?.photoURL} alt="Profile" className="home-avatar" />
        <span className="home-notif">
          <FontAwesomeIcon icon={faBell} />
        </span>
      </div>
      <div className="home-center">
        <span className="home-title">My Plants</span>
        <div className="home-plants-empty">No plants saved yet.</div>
      </div>
    </>
  );
}
