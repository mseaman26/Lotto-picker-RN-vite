
import { View, Text, Platform, TouchableOpacity } from "react-native-web";
import React, { useState } from "react";
const isWeb = Platform.OS === 'web';

interface LottoNumberProps {
    min: number;
    max: number;
    value: number | null;
    color: string;
    spinning: boolean;
}
export default function LottoNumber({ min, max, value = null, color, spinning = true }: LottoNumberProps) {
    const [number, setNumber] = useState(value);
    const [isSpinning, setIsSpinning] = useState(spinning);
    console.log('spinning', spinning);

    const handleSpinButton = () => {
        if (isSpinning) {
           setIsSpinning(false);
        }else{
            setIsSpinning(true);
        }
    }

    if (isSpinning) {
        setTimeout(() => {
            setNumber(Math.floor(Math.random() * (max - min + 1)) + min);
        }, 100);
    }

    return (
        <>
        <View style={styles.container}>
            <View style={{...styles.ball, backgroundColor: color}}>
                <Text style={styles.number}>{number}</Text>
            </View>
            <TouchableOpacity style={isSpinning ? styles.greenButtom : styles.button} onPress={handleSpinButton}>
                <Text style={styles.buttonText}>{isSpinning ? 'Stop' : 'Spin'}</Text>
            </TouchableOpacity>
        </View>
        </>
    )
}

const styles = {
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ball: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 50, 
        width: 60,
        height: 60,
    },
    number: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        
    },
    button: {
        backgroundColor: '#007BFF', // Button color
        paddingVertical: 10, // Vertical padding
        paddingHorizontal: 10, // Horizontal padding
        borderRadius: 25, // Rounded corners
        marginTop: 10,
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow positioning
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3.84, // Shadow blur radius
        elevation: 5, // Elevation for Android shadow
        alignItems: 'center',
        height: 50,
        width: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        
    },
    greenButtom: {
        backgroundColor: '#28A745', // Button color
        paddingVertical: 10, // Vertical padding
        paddingHorizontal: 10, // Horizontal padding
        borderRadius: 25, // Rounded corners
        marginTop: 10,
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow positioning
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3.84, // Shadow blur radius
        elevation: 5, // Elevation for Android shadow
        alignItems: 'center',
        height: 50,
        width: 50,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF', // Text color
        fontSize: 12, // Font size
        fontWeight: 'bold', // Text boldness
    }
}