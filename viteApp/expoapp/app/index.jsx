// In your HomePage.js or HomePage.jsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Picker } from 'react-native-web'; // Import from react-native-web
import UniversalLink from '../components/UniversalLink/UniversalLink';
import CustomDropdownPicker from '../components/PickerUniversal/CusomPicker/CustomPicker';

const HomePage = () => {
    const options = [{ label: 'Powerball', value: 'powerball' }, { label: 'Option 2', value: 'option 2' }];
    const [selectedValue, setSelectedValue] = useState(options[0].label);
    const isWeb = Platform.OS === 'web';

    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Home Page!</Text>
            <UniversalLink href={isWeb ? '/profile' : 'ProfilePage'}>
                Go to Profile Page
            </UniversalLink>
            <Text>{selectedValue}</Text>
            <CustomDropdownPicker
                label="Select your Lotto game"
                selectedValue={selectedValue}
                onValueChange={setSelectedValue}
                options={options}
                style={{ borderColor: 'gray', borderWidth: 1 }} // Custom styles can be added
            />
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
});

export default HomePage;
