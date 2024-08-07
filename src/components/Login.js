import React, { useState } from 'react';
import '../App.css';
import '../style/Login.css';
import ImageSrc from '../imges/121353127-1080x746.jpg';
import '../style/index.css';
function Login({ onClose }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3200/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const { message } = await response.json();
      alert(message);

      if (message === "התחברת בהצלחה") window.location.href = "/";
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <button className="btn-close" onClick={onClose}>
          <i className="bi bi-x"></i>
        </button>
        <form className="auth-inner" onSubmit={handleSubmit}>
          <h3>התחברות</h3>
          {['email', 'password'].map((field) => (
            <div className="mb-3" key={field}>
              <label htmlFor={field}>{field === 'email' ? 'כתובת אימייל' : 'סיסמא'}</label>
              <input
                type={field}
                id={field}
                name={field}
                className="form-control"
                placeholder={`Enter ${field}`}
                value={credentials[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="rememberMe" />
              <label className="custom-control-label" htmlFor="rememberMe">זכור אותי</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">אישור</button>
        </form>
      </div>
      <div className="images-container">
        <img src={ImageSrc} className="img-left" alt="Login background" />
      </div>
    </div>
  );
}

export default Login;