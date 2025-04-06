// src/components/auth/LoginForm.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Button from '../common/Button/Button';
import './LoginForm.scss';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, isAuthenticated } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      
      {isAuthenticated ? (
        <div className="success-message">
          You are logged in successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <Button 
            type="submit" 
            disabled={isLoading} 
            variant="primary"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          
          <div className="login-info">
            <h3>Test Credentials:</h3>
            <p>Username: dev1</p>
            <p>Password: 12cf#$!@34</p>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;