import React from 'react';
import '../css/Settings.css'; 

export default function Settings({ user }) {
  return (
    <section className="card settings-card">
      <div className="settings-header">
        <img src={user?.photoURL} alt="Profile" className="settings-avatar" />
        <div className="settings-info">
          <div className="settings-name">{user?.displayName}</div>
          <div className="settings-email">{user?.email}</div>
        </div>
      </div>
      <h1 className="settings-title">Preferences</h1>
      <ul className="settings-list">
        <li>Light/Dark Mode (toggle coming soon)</li>
        <li>Notifications</li>
        <li>Privacy</li>
        <li>Logout</li>
      </ul>
    </section>
  );
}
