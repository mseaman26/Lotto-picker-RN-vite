import { View, Text, TextInput, Button, Platform } from 'react-native-web';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import NavigateUniversal from '../components/NavigaveUniversal/NavigateUniversal';
import UniversalLink from '../components/UniversalLink/UniversalLink';

const SignupPage = () => {

    const isWeb = Platform.OS === 'web';

    const { user, signup, error, setError } = useContext(AuthContext);
    const [email, setEmail] = useState('c@a.com');
    const [username, setUsername] = useState('c');
    const [password, setPassword] = useState('!Q2w3e4r');
    const [redirect, setRedirect] = useState(false);

    const handleEmailChange = (email) => {
        setError(' ');
        setEmail(email);
    }

    const handleUsernameChange = (username) => {
        setError(' ');
        setUsername(username);
    }

    const handlePasswordChange = (password) => {
        setError(' ');
        setPassword(password);
    }

    const handleSignUp = () => {
        // Add logic for handling the login, like form validation or an API call
        signup(email, username, password);
        console.log('Login button pressed');
    };

    useEffect(() => {
        if (user) {
            setRedirect(true);
        }
    }, [user]);

    

    useEffect(() => {
        setError(' '); // Reset error message when the component mounts
    }, []);

    if (redirect && user) {
        return <NavigateUniversal to="/"/>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={handleEmailChange}
                value={email}
            />

            <TextInput
                placeholder="Username (display name)"
                style={styles.input}
                onChangeText={handleUsernameChange}
                value={username}
            />

            <TextInput
                placeholder="Password"
                secureTextEntry={true}
                style={styles.input}
                onChangeText={handlePasswordChange}
                value={password}
            />

            <Button title="Sign Up" onPress={handleSignUp} />
            <Text style={styles.error}>{error}</Text>
            <Text>Already have an account? <UniversalLink href={isWeb ? '/login' : 'LoginPage'}>Login</UniversalLink></Text>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        maxWidth: 400, // Set a max width for the input fields
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
        borderRadius: 5,
    },
    error: {
        color: 'red', // Style for error message
        fontSize: 32,
        marginBottom: 20,
    },
};

export default SignupPage;
