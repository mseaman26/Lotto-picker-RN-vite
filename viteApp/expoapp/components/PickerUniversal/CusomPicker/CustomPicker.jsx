import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList } from 'react-native-web';

const CustomDropdownPicker = ({ 
    label, 
    selectedValue, 
    onValueChange, 
    options, 
    style, 
    labelStyle 
}) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const handleSelect = (item) => {
        onValueChange(item.value);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
            <TouchableOpacity 
                onPress={() => setModalVisible(true)} 
                style={[styles.touchable, style]}
            >
                <Text style={styles.selectedValue}>
                    {options.find(option => option.value === selectedValue)?.label || 'Select an option'}
                </Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleSelect(item)} style={styles.item}>
                                    <Text style={styles.itemText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    touchable: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    selectedValue: {
        fontSize: 16,
        color: '#000',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    item: {
        padding: 15,
    },
    itemText: {
        fontSize: 16,
    },
    closeButton: {
        marginTop: 20,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
    },
});

export default CustomDropdownPicker;
