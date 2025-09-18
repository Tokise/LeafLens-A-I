import React, { useEffect, useState } from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        localStorage.setItem('leaflens_user', JSON.stringify(currentUser));
        if (onLogin) onLogin(currentUser);
        navigate('/');
      }
    });
    // Check for cached user on mount
    const cachedUser = localStorage.getItem('leaflens_user');
    if (cachedUser) {
      if (onLogin) onLogin(JSON.parse(cachedUser));
      navigate('/');
    }
    return () => unsubscribe();
  }, [onLogin, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="card login-card">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleEmailLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="login-input"
          required
        />
        <div className="login-icons">
          <button type="button" className="login-icon-btn" onClick={handleGoogleSignIn}>
            <span className="login-google-icon">G</span>
          </button>
        </div>
        <button type="submit" className="login-signin-btn">Sign in</button>
      </form>
      <p className="login-note">Or <a href="/signup" className="login-link">Sign up</a> if you don't have an account.</p>
      {error && <p className="login-error">{error}</p>}
    </section>
  );
}
