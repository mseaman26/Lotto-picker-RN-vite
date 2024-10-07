import { View, Text, TextInput, Button,Platform } from 'react-native-web';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import NavigateUniversal from '../components/NavigaveUniversal/NavigateUniversal';
import UniversalLink from '../components/UniversalLink/UniversalLink';

const LoginPage = () => {

    const isWeb = Platform.OS === 'web';

    const { user, login, error, setError } = useContext(AuthContext);
    const [email, setEmail] = useState('c@a.com');
    const [password, setPassword] = useState('!Q2w3e4r');

    const handleEmailChang = (email) => {
        setError(' ');
        setEmail(email);
    }

    const handlePasswordChange = (password) => {
        setError(' ');
        setPassword(password);
    }

    const handleLogin = async () => {
        // Reset error message
        setError('');

        try {
            await login(email, password); // Assuming login returns a promise
            console.log('Login button pressed');
        } catch (error) {
            // Set the error message if login fails
            setError(error.message || 'Login failed. Please try again.');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    useEffect(() => {
        setError(' '); // Reset error message when the component mounts
    }, []);

    if (user) {
        return <NavigateUniversal to="/" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={handleEmailChang}
                value={email} // Controlled component
                onKeyPress={handleKeyPress} // Add this to detect Enter key
            />

            <TextInput
                placeholder="Password"
                secureTextEntry={true}
                style={styles.input}
                onChangeText={handlePasswordChange}
                value={password} // Controlled component
                onKeyPress={handleKeyPress} // Add this to detect Enter key
            />

            <Button title="Login" onPress={handleLogin} />

            <Text style={styles.error}>{error}</Text>

            <Text>Don't have an account? <UniversalLink href={isWeb ? '/signup' : 'SignupPage'}>Sign up</UniversalLink></Text>
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

export default LoginPage;
