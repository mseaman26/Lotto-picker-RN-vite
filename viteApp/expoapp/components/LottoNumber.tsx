
import { View, Text, Platform, Pressable, TextInput } from "react-native-web";
import React, { useState, useEffect, useRef } from "react";
const isWeb = Platform.OS === 'web';
import type { LottoSet } from "../utils/lottoStructurer";

interface LottoNumberProps {
    value: number | null;
    color: string;
    currentSet: Set<number>;
    setIndex: number;
    setCurrentSets: any;
    setCurrentPicks: any;
    index: number;
}
export default function LottoNumber({ value = null, color, currentSet, setIndex, setCurrentSets, setCurrentPicks, index }: LottoNumberProps) {
    const [manualInput, setManualInput] = useState<string>('');
    const [number, setNumber] = useState<number | null>(value);
    const [isSpinning, setIsSpinning] = useState<boolean>(false);

    const spinIntervalRef = useRef<any>(null); 

    const handleSpinButton = (): void => {
        console.log('set index', setIndex);
        if (isSpinning) {
            setIsSpinning(false);
            console.log('value', number);
            //remove current value from set at setIndex
            clearInterval(spinIntervalRef.current);
            setCurrentSets((prev: Set<number>[]) => {
                const newSets = [...prev];
                newSets[setIndex].delete(number);
                return newSets;
            })
            setCurrentPicks((prev: Set<number>[]) => {
                const newPicks = [...prev];
                newPicks[setIndex].add(number);
                return newPicks;
            })
            
            setManualInput(number ? number.toString() : '');
        }else{
            //if there is a value, add it back to the set
            if(number !== null){
                setCurrentSets((prev: Set<number>[]) => {
                    const newSets = [...prev];
                    newSets[setIndex].add(number);
                    return newSets;
                })
                setCurrentPicks((prev: Set<number>[]) => {
                    const newPicks = [...prev];
                    newPicks[setIndex].delete(number);
                    return newPicks;
                })
            }
            setIsSpinning(true);
        }
    }

    const handleManualInput = (input: string): void => {
        if(input === ''){
            setNumber(null);
        }
        if(number !== null){
            console.log('adding number back to set: ', number);
            setCurrentSets((prev: Set<number>[]) => {
                const newSets = [...prev];
                newSets[setIndex].add(number);
                return newSets;
            })
            setCurrentPicks((prev: Set<number>[]) => {
                const newPicks = [...prev];
                newPicks[setIndex].delete(number);
                return newPicks;
            })
        }
        const num = parseInt(input, 10);
        if (!isNaN(num) && currentSet.has(num)) {
            setNumber((prevNum) => {
                if (prevNum !== null) {
                    //add previous number back to set
                    setCurrentSets((prev: Set<number>[]) => {
                        const newSets = [...prev];
                        newSets[setIndex].add(prevNum);
                        return newSets;
                    })
                    setCurrentPicks((prev: Set<number>[]) => {
                        const newPicks = [...prev];
                        newPicks[setIndex].delete(prevNum);
                        return newPicks
                    })
                }
                return num;
            }); // Only update if the input is a valid number in the set
            console.log('number after state update', number);
            console.log(num)
            setCurrentSets((prev: Set<number>[]) => {
                const newSets = [...prev];
                newSets[setIndex].delete(num);
                return newSets;
            })
            setCurrentPicks((prev: Set<number>[]) => {
                const newPicks = [...prev];
                newPicks[setIndex].add(num);
                return newPicks;
            })
        }
        setManualInput(input);
    };


    useEffect(() => {
        console.log(index, ' is spinning', isSpinning);
        if (isSpinning) {
            spinIntervalRef.current = setInterval(() => {
            //get random number from set at setIndex
            const randomIndex = Math.floor(Math.random() * currentSet.size);
            const randomValue = Array.from(currentSet)[randomIndex];
            setNumber((prev) => randomValue);
        }, 50);
    }
    }, [isSpinning])

    return (
        <>
        <View style={styles.container}>
            <View style={{...styles.ball, backgroundColor: color}}>
                <Text style={styles.number}>{number}</Text>
            </View>
            <View style={styles.HeaderContainer}>

            </View>
            <Pressable style={isSpinning ? styles.stopButton : styles.button} onPress={handleSpinButton}>
                <Text style={styles.buttonText}>{isSpinning ? 'Stop' : 'Start'}</Text>
            </Pressable>
            <View style={styles.HeaderContainer}>

            </View>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={manualInput}
                onChangeText={handleManualInput}
        
            />
        </View>
        </>
    )
}

const styles = {
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200
    },
    ball: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50, 
        width: 55,
        height: 55,
    },
    number: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        
    },
    HeaderContainer: {
        height: 20
    },
    button: {
        backgroundColor: '#007BFF', // Button color
        paddingVertical: 8, // Vertical padding
        paddingHorizontal: 8, // Horizontal padding
        borderRadius: 25, // Rounded corners
        marginTop: 10,
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow positioning
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3.84, // Shadow blur radius
        elevation: 5, // Elevation for Android shadow
        alignItems: 'center',
        height: 45,
        width: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        
    },
    stopButton: {
        backgroundColor: 'red', // Button color
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
        height: 45,
        width: 45,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF', // Text color
        fontSize: 11, // Font size
        fontWeight: 'bold', // Text boldness
    },
    input: {
        marginTop: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: 50,
        textAlign: 'center',
    },
    manualInput: {
        length: 50,
        fontSize: 12,
        textAlign: 'center',
        marginTop: 10,
    }
}