import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

// Create AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(' ');

  const getApiUrl = () => {
    if (process.env.NODE_ENV === 'development') {
      return '';  // Local API in development
    } else {
      return 'https://lotto-server-next-2oecnb63x-mseaman26s-projects.vercel.app'; // Replace with your production API URL
    }
  };

  // Function to handle login
  const login = async (email, password) => {
    try {
      const response = await fetch(`${getApiUrl()}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('login data:', data);
      if(data.errorMessage) {
        setError(data.errorMessage);
      }

      if (response.ok && data.success) {
        console.log('data:', data);
        // If login is successful, set user data
        setUser(data.data.user);
        localStorage.setItem('authToken', data.data.token); // Store JWT in localStorage
      } else {
        console.error('Login failed:', data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const signup = async (email, username, password) => {
    console.log('signup function hit');
    try {
      const response = await fetch(`${getApiUrl()}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();
      if(data.errorMessage) {
        setError(data.errorMessage);
      }

      if (response.ok && data.success) {
        // If signup is successful, set user data
        console.log('signup data:', data);
        const token = data.data;
        const decoded = jwtDecode(token);
        setUser( decoded.data );
        localStorage.setItem('authToken', data.data); // Store JWT in localStorage
      } else {
        console.error('Signup failed:', data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('Error during signup. Please try again.');
    }
  }

  // Function to handle logout
  const logout = () => {
    setUser(null); // Remove user from state
    localStorage.removeItem('authToken'); // Remove token from localStorage
  };

  // Function to check authentication status on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      const decoded = jwtDecode(token);

      if (decoded.exp * 1000 < Date.now()) {
        // If token is expired, log out
        logout();
      } else {
        // If token is valid, set user data
        setUser(decoded);
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    console.log('User:', user);
  }, [user]);

  useEffect(() => {
    console.log('Error:', error);
  })

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, signup, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
