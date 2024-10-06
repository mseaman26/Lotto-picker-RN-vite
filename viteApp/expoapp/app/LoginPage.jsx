import { View, Text, TextInput, Button } from 'react-native-web';
import React, {useEffect, useState, useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import NavigateUniversal from '../components/NavigaveUniversal/NavigateUniversal';

const LoginPage = () => {

    const {user, login} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Here you can add the logic for handling the login, like form validation or an API call
        login(email, password);
        console.log('Login button pressed');
    };

    if (user) {
        return (
        <NavigateUniversal to="/" />
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>

        <TextInput
            placeholder="Email"
            style={{
            width: '100%',
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            marginBottom: 20,
            borderRadius: 5,
            }}
            onChangeText={(text) => setEmail(text)}
        />

        <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={{
            width: '100%',
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            marginBottom: 20,
            borderRadius: 5,
            }}
            onChangeText={(text) => setPassword(text)}
        />

        <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

export default LoginPage;
