import { View, Text, TextInput, Pressable,Platform, TouchableWithoutFeedback, Keyboard } from 'react-native-web';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import NavigateUniversal from '../components/NavigaveUniversal/NavigateUniversal';
import UniversalLink from '../components/UniversalLink/UniversalLink';
import LoadingScreen from '../components/LoadingScreen';
import { globalStyles } from '../styles/globalStyles';

const LoginPage = () => {

    const isWeb = Platform.OS === 'web';

    const [isProduction, setIsProduction] = useState(false);
    const { user, login, error, setError, loading } = useContext(AuthContext);
    const [email, setEmail] = useState(isProduction ? '' : 'c@a.com');
    const [password, setPassword] = useState(isProduction ? '' : '!Q2w3e4r');
    

    const handleEmailChang = (email) => {
        setError(' ');
        setEmail((prev) => email);
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
        // if (event.key === 'Enter') {
        //     handleLogin();
        // }
    };

    useEffect(() => {
        setError(' '); // Reset error message when the component mounts
        if(isWeb){
            //check the .env file to see if we are in production
            setIsProduction(process.env.NODE_ENV === 'production');
            console.log('isProduction:', isProduction);
        }else{
            
        }
    }, []);

    useEffect(() => {
        console.log('isProduction:', isProduction);
    }, [isProduction]);

    useEffect(() => {
        console.log('loading:', loading);
    }, [loading]);


    if (user) {
        return <NavigateUniversal to="/" />;
    }

    const content = (
        <View style={styles.container} testID={'container'}>
            
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

            <Pressable style={styles.loginButton} onPress={handleLogin}><Text style={styles.loginButtonText}>Login</Text></Pressable>

            <Text style={styles.error}>{error}</Text>

            <Text>Don't have an account? <UniversalLink href={isWeb ? '/signup' : 'SignupPage'}>Sign up</UniversalLink></Text>
        </View>
    )

    return (
        <>
            {loading && <LoadingScreen />}
            {isWeb ? content : (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    {content}
                </TouchableWithoutFeedback>
            )}
        </>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: globalStyles.mainBG.backgroundColor,
        height: '100%'
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
        borderColor: 'black',
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    loginButton:{
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
        color: 'white',
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,


    },
    error: {
        color: 'red', // Style for error message
        fontSize: 32,
        marginBottom: 20,
    },
};

export default LoginPage;
