// In your HomePage.js or HomePage.jsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native-web'; // Import from react-native-web
import UniversalLink from '../components/UniversalLink/UniversalLink';
import CustomPicker from '../components/PickerUniversal/CusomPicker/CustomPicker';

const HomePage = () => {

    const options = [{ label: 'Powerball', value: 'powerball' }, { label: 'Option 2', value: 'option 2' }, { label: 'Option 3', value: 'option 3' }, { label: 'Option 4', value: 'option 4' }, { label: 'Option 5', value: 'option 5' }, { label: 'Option 6', value: 'option 6' }, { label: 'Option 7', value: 'option 7' }, { label: 'Option 8', value: 'option 8' }, { label: 'Option 9', value: 'option 9' }, { label: 'Option 10', value: 'option 10' }];

    const [selectedValue, setSelectedValue] = useState(options[0].label);
    const isWeb = Platform.OS === 'web';

    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Home Page!</Text>
            <CustomPicker
                label="Select your Lotto game"
                selectedValue={selectedValue}
                onValueChange={setSelectedValue}
                options={options}
                style={{ borderColor: 'gray', borderWidth: 1 }} // Custom styles can be added
            />
            <TouchableOpacity onPress={() => setSelectedValue('Option 2')} style={styles.button}>
                <Text style={styles.buttonText}>Pick Some Numbers!</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
        height: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: 200,
    },
    selectedValue: {
        marginTop: 20,
        fontSize: 18,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#4CAF50', // Green background color
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3, // Add shadow on Android
    },
    buttonText: {
        color: '#fff', // White text color
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default HomePage;
