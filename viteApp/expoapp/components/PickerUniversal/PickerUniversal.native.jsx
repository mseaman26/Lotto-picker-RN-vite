import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PickerWrapper = ({ 
    label, 
    selectedValue, 
    onValueChange, 
    options, 
    style, 
    labelStyle, 
    containerStyle 
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
            <Picker
                selectedValue={selectedValue}
                onValueChange={onValueChange}
                style={[styles.picker, style]} // Allowing custom styles
                dropdownIconColor="#000" // Customize the dropdown icon color (optional)
            >
                {options.map((option) => (
                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // Remove margins or paddings that could create unwanted space
    },
    label: {
        fontSize: 16,
        marginBottom: 5, // Optional: if you want a small gap below the label
    },
    picker: {
        height: 0, // Set a height for the picker
        width: '100%',
        borderColor: '#ffffff', // Set border color to transparent
        borderWidth: 0, // Ensure no border is rendered
        backgroundColor: 'transparent', // Set background to transparent
        padding: 0, // Remove any padding that might create space
        margin: 0, // Remove any margin
    },
});

export default PickerWrapper;
