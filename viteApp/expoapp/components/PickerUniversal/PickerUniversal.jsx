import React from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native-web';

const PickerWrapper = ({ label, selectedValue, onValueChange, options, style }) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <Picker
                selectedValue={selectedValue}
                onValueChange={onValueChange}
                style={[styles.picker, style]} // Allowing custom styles
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
        marginVertical: 10,
        width: '100%',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    picker: {
        height: 50,
        width: '100%',
    },
});

export default PickerWrapper;