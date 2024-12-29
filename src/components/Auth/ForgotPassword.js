import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setMessage('Check your inbox for further instructions');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2>Forgot Password</h2>
        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="email-input"
          />
          <button type="submit" className="reset-button">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
