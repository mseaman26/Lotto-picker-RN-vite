import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

// Create AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to handle login
  const login = async (email, password) => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

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

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {console.log("AuthContext inside AuthProvider", { user, login, logout, loading })}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
