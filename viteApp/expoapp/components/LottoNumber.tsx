
import { View, Text, Platform, TouchableOpacity } from "react-native-web";
import React, { useState } from "react";
const isWeb = Platform.OS === 'web';
import type { LottoSet } from "../utils/lottoStructurer";

interface LottoNumberProps {
    value: number | null;
    color: string;
    spinning: boolean;
    currentSet: Set<number>;
    setIndex: number;
    setCurrentSets: any;
}
export default function LottoNumber({ value = null, color, spinning = false, currentSet, setIndex, setCurrentSets }: LottoNumberProps) {
    const [number, setNumber] = useState<number | null>(value);
    const [isSpinning, setIsSpinning] = useState<boolean>(spinning);
    console.log('spinning', spinning);

    let spinTimeOut: any;

    const handleSpinButton = (): void => {
        if (isSpinning) {
           setIsSpinning(false);
           console.log('value', number);
           //remove current value from set at setIndex
           clearTimeout(spinTimeOut);
            setCurrentSets((prev: Set<number>[]) => {
            const newSets = [...prev];
            newSets[setIndex].delete(number);
            return newSets;
            })
        }else{
            //if there is a value, add it back to the set
            if(number !== null){
                setCurrentSets((prev: Set<number>[]) => {
                    const newSets = [...prev];
                    newSets[setIndex].add(number);
                    return newSets;
                })
            }
            setIsSpinning(true);
        }
    }

    if (isSpinning) {
            spinTimeOut = setTimeout(() => {
            //get random number from set at setIndex
            const randomIndex = Math.floor(Math.random() * currentSet.size);
            const randomValue = Array.from(currentSet)[randomIndex];
            console.log('randomValue', randomValue);
            setNumber((prev) => randomValue);
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