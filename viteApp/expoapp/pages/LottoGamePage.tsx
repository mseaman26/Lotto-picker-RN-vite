


import { Text, View, Platform, Pressable } from 'react-native-web';
import { getUrlParams } from '../hooks/getParams';
import { lottoStructurer } from '../utils/lottoStructurer';
import LottoNumber from '../components/LottoNumber';
import {globalStyles} from '../styles/globalStyles';
import { useState, useEffect, useContext } from 'react';
import { saveLottoPick } from '../utils/apiHelpers';
import { AuthContext } from '../context/AuthContext';

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


    function createNumberSet(low: number, high: number): Set<number> {
        const numberSet = new Set<number>();
    
        for (let i = low; i <= high; i++) {
            numberSet.add(i);
        }
    
        return numberSet;
    }

    const handleSavePick = () => {
        //check if all numbers have been picked
        if(picksArray.includes(null)){
            setErrorMessage('All numbers must be chosen');
            return
        }
        if(user.id && lottoGame && picksArray){
            saveLottoPick(user.id, lottoGame, picksArray as number[]);
        }
        

    }

    useEffect(() => {
        const newSets = []

        for(let i = 0; i < sets.length; i++){
            newSets.push(createNumberSet(...sets[i]));
        }
        setCurrentSets(newSets);

        //create an array that is the length of lottoStructure.numbers and initialize all values to null
        const newPicksArray = new Array(lottoStructure.numbers.length).fill(null);
        setPicksArray(newPicksArray);
    }, [])

    useEffect(() => {
        console.log('currentSets', currentSets);
    }, [currentSets])
    useEffect(() => {
        console.log('here')
        console.log('picksArray', picksArray);
    })


    return (
        <View style={styles.container}>
            <View style={styles.errorMessageContainer}><Text style={styles.errorMessage}>{errorMessage}</Text></View>
            <Text style={styles.header}>{lottoStructure.title}</Text>
            <View style={styles.numbersSection}>
                {lottoStructure.numbers.map((number, index) => (
                    <LottoNumber key={`lottoNumber_${index}`} value={picksArray !== null ? picksArray[index] : null} color={number.color} currentSet={currentSets[number.setIndex]} setIndex={number.setIndex} index={index} setCurrentSets={setCurrentSets} setPicksArray={setPicksArray} setErrorMessage={setErrorMessage}/>
                ))}
            </View>
            <Text style={{...styles.pickerHeader, ...styles.buttonHeader}}>Click a button to randomize</Text>
            <Text style={{...styles.pickerHeader, ...styles.inputHeader}}>...or manually enter a number</Text>
            <Pressable onPress={handleSavePick} ><Text>Save</Text></Pressable>
        </View>
    )
}

const styles = {
    container: {
        paddingTop: 0,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: globalStyles.mainBG.backgroundColor,
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
    }
}
