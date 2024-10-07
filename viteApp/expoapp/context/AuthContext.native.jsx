import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    console.log('in auth provider');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(' ');

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
            console.log('login data:', data);
            if (data.errorMessage) {
                setError(data.errorMessage);
            }

            if (response.ok && data.success) {
                // If login is successful, set user data
                console.log('data:', data);
                const token = data.data.token;
                setUser(data.data.user);

                // Store JWT in AsyncStorage
                await AsyncStorage.setItem('authToken', token);
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
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, password }),
            });

            const data = await response.json();
            if (data.errorMessage) {
                setError(data.errorMessage);
            }

            if (response.ok && data.success) {
                // If signup is successful, set user data
                console.log('signup data:', data);
                const token = data.data;
                const decoded = jwtDecode(token);
                setUser(decoded.data);

                // Store JWT in AsyncStorage
                await AsyncStorage.setItem('authToken', token);
            } else {
                console.error('Signup failed:', data.error || 'Unknown error');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setError('Error during signup. Please try again.');
        }
    };

    // Function to handle logout
    const logout = async () => {
        setUser(null); // Remove user from state
        await AsyncStorage.removeItem('authToken'); // Remove token from AsyncStorage
    };

    // Function to check authentication status on app load
    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = await AsyncStorage.getItem('authToken');

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
        };

        checkAuthStatus();
    }, []);

    useEffect(() => {
        console.log('User:', user);
    }, [user]);
    
    useEffect(() => {
        console.log('Loading:', loading);
    }, [loading]);

    useEffect(() => {
        console.log('Error:', error);
    }, [error]);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, signup, error, setError }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;