


import { Text, View, Platform, Pressable } from 'react-native-web';
import { getUrlParams } from '../hooks/getParams';
import { lottoStructurer } from '../utils/lottoStructurer';
import LottoNumber from '../components/LottoNumber';
import {globalStyles} from '../styles/globalStyles';
import { useState, useEffect, useContext } from 'react';
import { saveLottoPick, isPickUnique } from '../utils/apiHelpers';
import { AuthContext } from '../context/AuthContext';
import type { LottoStructure } from '../interfaces/interfaces';
import DatePicker from '../components/DatePicker/DatePicker';
import {customStorage} from '../utils/customStorage/customStorage';


const isWeb = Platform.OS === 'web';

export default function LottoGamePage() {

    const { user } = useContext(AuthContext);
    const { lottoGame } = getUrlParams();
    console.log('lottoGame', lottoGame);

    const lottoStructure = lottoStructurer(lottoGame || '');
    const sets = lottoStructure.sets;   
    console.log('lottoStructure', lottoStructure);

    const [currentSets, setCurrentSets] = useState<Set<number>[]>([]);
    const [picksArray, setPicksArray] = useState<(number | null)[]>(Array(lottoStructure.numbers.length).fill(null));
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [drawDate, setDrawDate] = useState<Date | null>(null);


    function createNumberSet(low: number, high: number): Set<number> {
        const numberSet = new Set<number>();
    
        for (let i = low; i <= high; i++) {
            numberSet.add(i);
        }
    
        return numberSet;
    }

    const sortNumbersBySet = (numbers: number[], lottoStructure: LottoStructure ): number[] => {
        console.log('numbers', numbers);
        const finalNumbers: number[][] = [];
        for(let i = 0; i < lottoStructure.sets.length; i++){
            finalNumbers.push([]);
        }
        for(let i = 0; i < numbers.length; i++){
            finalNumbers[lottoStructure.numbers[i].setIndex].push(numbers[i]);
        }
        for(let i = 0; i < finalNumbers.length; i++){
            finalNumbers[i].sort((a, b) => a - b);
        }
        const flattened = finalNumbers.flat();
        return flattened;
    }

    const handleCheckUniquePick = async () => {
        setErrorMessage('');
        setSuccessMessage('');
        if(picksArray.includes(null)){
            setErrorMessage('All numbers must be chosen');
            return
        }
        if(lottoGame && picksArray){
            const sortedPicksArray = sortNumbersBySet(picksArray as number[], lottoStructure);
            const response = await isPickUnique(lottoGame, sortedPicksArray as number[]);
            if(response.data === true){
                setSuccessMessage('😃 These numbers have NOT been picked by anyone else in our Database!');
            }else{
                setErrorMessage('🤔 These numbers have already been picked by someone else!');
            }
        }
    }

    const handleSavePick = async () => {
        
        setErrorMessage('');
        setSuccessMessage('');
        //check if all numbers have been picked
        if(picksArray.includes(null)){
            setErrorMessage('All numbers must be chosen');
            return
        }
        if(user.id && lottoGame && picksArray){
            const sortedPicksArray = sortNumbersBySet(picksArray as number[], lottoStructure);
            const response = await saveLottoPick(user.id, lottoGame, sortedPicksArray as number[], drawDate);
            if(response.success){
                setSuccessMessage('Pick saved successfully!');
                setPicksArray(new Array(lottoStructure.numbers.length).fill(null));
                const newSets = []

                for(let i = 0; i < sets.length; i++){
                    newSets.push(createNumberSet(...sets[i]));
                }
                setCurrentSets(newSets);
            }else{
                setErrorMessage('Error saving pick, something went wrong with the server.  So sorry!');
            }
        }
        

    }

    useEffect(() => {
        const newSets = []

        for(let i = 0; i < sets.length; i++){
            newSets.push(createNumberSet(...sets[i]));
        }
        setCurrentSets(newSets);
        if(lottoGame && !customStorage.getItem(lottoGame)){
            const newPicksArray = new Array(lottoStructure.numbers.length).fill(null);
            setPicksArray(newPicksArray);
        }else if(lottoGame && customStorage.getItem(lottoGame)){
            const storedPicksArray = customStorage.getItem(lottoGame);
            const newPicksArray = storedPicksArray ?  JSON.parse(storedPicksArray) : new Array(lottoStructure.numbers.length).fill(null);
            console.log('picksArray from local storage', newPicksArray);
            setPicksArray(newPicksArray);
            for(let i = 0; i < newPicksArray.length; i++){
                if(newPicksArray[i] !== null){
                    setCurrentSets((prev: Set<number>[]) => {
                        const newSets = [...prev];
                        newSets[lottoStructure.numbers[i].setIndex].delete(newPicksArray[i]);
                        return newSets;
                    })
                }
            }
        }
        //create an array that is the length of lottoStructure.numbers and initialize all values to null
        if(lottoGame){
            console.log('custom storage', customStorage.getItem(lottoGame));
        }
       
    }, [])

    useEffect(() => {
        console.log('currentSets', currentSets);
    }, [currentSets])

    useEffect(() => {
        console.log('picksArray', picksArray);
        if(lottoGame){
            customStorage.setItem(lottoGame, JSON.stringify(picksArray));
        }
    }, [picksArray])

    useEffect (() => {
        console.log('drawDate', drawDate);
    }, [drawDate])



    return (
        <View style={styles.container}>
            <View style={styles.errorMessageContainer}>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <Text style={styles.successMessage}>{successMessage}</Text>
            </View>
            
            <Text style={styles.header}>{lottoStructure.title}</Text>
            <View style={styles.numbersSection}>
                {lottoStructure.numbers.map((number, index) => (
                    <LottoNumber key={`lottoNumber_${index}`} value={picksArray !== null ? picksArray[index] : null} color={number.color} currentSet={currentSets[number.setIndex]} setIndex={number.setIndex} index={index} setCurrentSets={setCurrentSets} picksArray={picksArray} setPicksArray={setPicksArray} setErrorMessage={setErrorMessage}/>
                ))}
            </View>
            <Text style={{...styles.pickerHeader, ...styles.buttonHeader}}>Click a button to randomize</Text>
            <Text style={{...styles.pickerHeader, ...styles.inputHeader}}>...or manually enter a number</Text>
            <Text>Choose Lotto Draw Date: </Text>
            <DatePicker drawDate={drawDate} setDrawDate={setDrawDate} days={lottoStructure.days}/>
            <View style={{visibility: !picksArray.includes(null) && drawDate ? 'visible' : 'hidden'}}>
                <Pressable onPress={handleCheckUniquePick} style={styles.checkButton}>
                    <Text style={styles.checkButtonText}>Has anyone else picked these numbers?</Text>
                </Pressable>
                <Pressable onPress={handleSavePick} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </Pressable>
            </View>
            
        </View>
    )
}

const styles = {
    container: {
        paddingTop: 0,
        paddingHorizontal: 10,

        alignItems: 'center',
        backgroundColor: globalStyles.mainBG.backgroundColor,
        minHeight: '100vh',
    },
    header: {
        fontSize: 40,
        textAlign: 'center',
        margin: 10,
    },
    numbersSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 500,
        width: '100%',

    },
    pickerHeader: {
        fontSize: 15,
        textAlign: 'center',
        position: 'absolute',
    },
    buttonHeader:{
        top: 185
    },
    inputHeader: {
        top: 260,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    errorMessageContainer:{
        minHeight: 50,
        maxHeight: 50,
        justifyContent: 'center',
    },
    errorMessage: {
        color: 'red',
        fontSize: 20,
    },
    successMessage: {
        color: 'green',
        fontSize: 20,
    },
    saveButton: {
        backgroundColor: '#4CAF50', // Green background
        paddingVertical: 12, // Vertical padding for the button
        paddingHorizontal: 24, // Horizontal padding for the button
        borderRadius: 8, // Rounded corners
        marginTop: 20, // Add some space above the button
        alignItems: 'center', // Center text horizontally
        justifyContent: 'center', // Center text vertically
        shadowColor: '#000', // Shadow effect for better visibility
        shadowOffset: { width: 0, height: 2 }, // Offset for the shadow
        shadowOpacity: 0.3, // Shadow transparency
        shadowRadius: 3.84, // Blur radius for shadow
        elevation: 5, // For Android shadow support
    },
    saveButtonText: {
        color: '#fff', // White text color
        fontSize: 18, // Text size
        fontWeight: 'bold', // Bold text
    },
    checkButton: {
        backgroundColor: '#FFA500', // Orange background for the Check button
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
    },
    checkButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
}
