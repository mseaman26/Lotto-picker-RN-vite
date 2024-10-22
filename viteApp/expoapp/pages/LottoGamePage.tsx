


import { Text, View, Platform, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native-web';
import { getUrlParams } from '../hooks/getParams';
import { lottoStructurer } from '../utils/lottoStructurer';
import LottoNumber from '../components/LottoNumber';
import {globalStyles} from '../styles/globalStyles';
import { useState, useEffect, useContext } from 'react';
import { saveLottoPick, isPickUnique, generateUniqe } from '../utils/apiHelpers';
import { AuthContext } from '../context/AuthContext';
import type { LottoStructure } from '../interfaces/interfaces';
import DatePicker from '../components/DatePicker/DatePicker';
import {customStorage} from '../utils/customStorage/customStorage';


const isWeb = Platform.OS === 'web';

export default function LottoGamePage() {

    const { user } = useContext(AuthContext);
    const { lottoGame } = getUrlParams();

    const lottoStructure = lottoStructurer(lottoGame || '');
    const sets = lottoStructure.sets;   

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
            const response = await isPickUnique(lottoGame, sortedPicksArray as number[], drawDate);
            if(response.data === true){
                setSuccessMessage('😃 These numbers have NOT been picked for this draw date by anyone else!');
            }else{
                setErrorMessage('🤔 These numbers have already been picked for this draw date by someone else!');
            }
        }
    }
    const handleGenerateUniquePick = async () => {
        setErrorMessage('');
        setSuccessMessage('');
        console.log('>??')
        if(!drawDate){
            alert('Please choose a draw date');
            return
        }
        if(lottoGame){
            const response = await generateUniqe(lottoGame, drawDate);
            if(response.success){
                const newPicksArray = new Array(lottoStructure.numbers.length).fill(null);
                for(let i = 0; i < response.data.length; i++){
                    newPicksArray[i] = response.data[i];
                }
                setPicksArray(newPicksArray);
                setSuccessMessage(`Unique Numbers Generated!`);
                alert(`Unique Numbers Generated!`)
            }else{
                setErrorMessage('Error generating unique numbers, something went wrong with the server.  So sorry!');
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
                setDrawDate(null);
            }else{
                setErrorMessage('Error saving pick, something went wrong with the server.  So sorry!');
            }
        }
        

    }
    const handleClear = () => {
        setPicksArray(new Array(lottoStructure.numbers.length).fill(null));
        setErrorMessage('');
        setSuccessMessage('');
        setDrawDate(null);
    }

    useEffect(() => {
        const initializeData = async () => {
            const newSets = []

            for(let i = 0; i < sets.length; i++){
                newSets.push(createNumberSet(...sets[i]));
            }
            setCurrentSets(newSets);
            if(lottoGame && !customStorage.getItem(lottoGame)){
                const newPicksArray = new Array(lottoStructure.numbers.length).fill(null);
                setPicksArray(newPicksArray);
            }else if(lottoGame && customStorage.getItem(lottoGame)){
                const storedPicksArray = await customStorage.getItem(lottoGame);
                console.log('storedPicksArray', storedPicksArray);
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
        }
        initializeData();
       
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
    useEffect(() => {
        console.log('errorMessage', errorMessage);
        console.log('successMessage', successMessage);
    }, [errorMessage, successMessage])

    const content = (
        <View style={styles.container}>
            <View style={styles.errorMessageContainer}>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <Text style={styles.successMessage}>{successMessage}</Text>
            </View>
            
            <Text style={styles.header}>{lottoStructure.title}</Text>
            <View style={styles.numbersSection}>
                {lottoStructure.numbers.map((number, index) => (
                    <LottoNumber key={`lottoNumber_${index}`} value={picksArray !== null ? picksArray[index] : null} color={number.color} currentSet={currentSets[number.setIndex]} setIndex={number.setIndex} index={index} setCurrentSets={setCurrentSets} picksArray={picksArray} setPicksArray={setPicksArray} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage}/>
                ))}
            </View>
            <Text style={{...styles.pickerHeader, ...styles.buttonHeader}}>Click a button to randomize</Text>
            <Text style={{...styles.pickerHeader, ...styles.inputHeader}}>...or manually enter a number</Text>
            <Pressable testId={'clearButton'} onPress={handleClear}  style={{...styles.button, ...styles.clearButton}}>
                <Text style={styles.clearButtonText}>Clear</Text>
            </Pressable>
            <Text>Choose Lotto Draw Date: </Text>
            <DatePicker drawDate={drawDate} setDrawDate={setDrawDate} days={lottoStructure.days}/>
            <View>
                <Pressable onPress={handleGenerateUniquePick} style={{...styles.button, ...styles.generateUniqueButton}}>
                    <Text style={styles.checkButtonText}>Generate Unique Numbers for Me</Text>
                </Pressable>
                <View style={{opacity: !picksArray.includes(null) && drawDate ? 1 : 0}}>
                    <Pressable onPress={!picksArray.includes(null) && drawDate ?handleCheckUniquePick : null} style={{...styles.button, ...styles.checkButton}}>
                        <Text style={styles.checkButtonText}>Has anyone else picked these numbers?</Text>
                    </Pressable>
                    
                    <Pressable onPress={!picksArray.includes(null) && drawDate ?handleSavePick : null} style={{...styles.button, ...styles.saveButton}}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )

    return (
        <>
        {isWeb ? content : (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                {content}
            </TouchableWithoutFeedback>
        )}
        </>
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
    clearButton:{
        width: 30,
        height: 30,
        borderRadius: '50%',
        marginTop: 0,
        paddingVertical: 0,
        paddingHorizontal: 0,
        backgroundColor: 'red',
    },
    clearButtonText:{
        fontSize: 8,
        textAlign: 'center',
        padding: 0,
        color: 'white',
      
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
      
    },
    saveButtonText: {
        color: '#fff', // White text color
        fontSize: 18, // Text size
        fontWeight: 'bold', // Bold text
    },
    button:{
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
    checkButton: {
        backgroundColor: '#FFA500', // Orange background for the Check button
    },
    generateUniqueButton: {
        backgroundColor: globalStyles.primaryBlue,
    },
    checkButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
}
