import React, { useState } from 'react';
import api from '../services/api';

const LoginForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const extractErrorMessage = (error) => {
    const detail = error?.response?.data?.detail;

    if (typeof detail === 'string') {
      return detail;
    }

    if (Array.isArray(detail)) {
      return detail.map((item) => item.msg).join(', ');
    }

    if (detail && typeof detail === 'object' && detail.msg) {
      return detail.msg;
    }

    return 'Something went wrong';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const endpoint = isRegister ? '/register' : '/login';
      const response = await api.post(endpoint, { email, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(extractErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>{isRegister ? 'Create account' : 'Login'}</h2>
        <p style={styles.subtitle}>Starter auth flow for your app</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
        </button>

        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          style={styles.switchButton}
        >
          {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
        </button>

        {message ? <p style={styles.message}>{message}</p> : null}
      </form>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f172a, #2563eb)',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    background: '#fff',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
  },
  subtitle: { marginTop: '-8px', color: '#64748b' },
  input: {
    width: '100%',
    padding: '12px 14px',
    marginBottom: '12px',
    borderRadius: '10px',
    border: '1px solid #cbd5e1',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '12px',
    border: 'none',
    borderRadius: '10px',
    background: '#2563eb',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '8px',
  },
  switchButton: {
    width: '100%',
    marginTop: '10px',
    padding: '10px',
    border: 'none',
    borderRadius: '10px',
    background: '#f1f5f9',
    color: '#0f172a',
    cursor: 'pointer',
  },
  message: {
    marginTop: '14px',
    color: '#0f766e',
    fontWeight: '600',
  },
};

export default LoginForm;
