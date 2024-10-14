


import { Text, View, Platform, Pressable } from 'react-native-web';
import { getUrlParams } from '../hooks/getParams';
import { lottoStructurer } from '../utils/lottoStructurer';
import LottoNumber from '../components/LottoNumber';
import {globalStyles} from '../styles/globalStyles';
import { useState, useEffect } from 'react';

const isWeb = Platform.OS === 'web';

export default function LottoGamePage() {
    const { lottoGame } = getUrlParams();
    console.log('lottoGame', lottoGame);

    const lottoStructure = lottoStructurer(lottoGame);
    const sets = lottoStructure.sets;   
    console.log('lottoStructure', lottoStructure);

    const [currentSets, setCurrentSets] = useState<Set<number>[]>([]);
    const [currentPicks, setCurrentPicks] = useState<Set<number>[]>([]);

    function createNumberSet(low: number, high: number): Set<number> {
        const numberSet = new Set<number>();
    
        for (let i = low; i <= high; i++) {
            numberSet.add(i);
        }
    
        return numberSet;
    }

    useEffect(() => {
        const newSets = []

        for(let i = 0; i < sets.length; i++){
            newSets.push(createNumberSet(...sets[i]));
        }
        setCurrentSets(newSets);

        const newPicks = []
        for(let i = 0; i < sets.length; i++){
            newPicks.push(new Set<number>());
        }
        setCurrentPicks(newPicks);
    }, [])

    useEffect(() => {
        console.log('currentSets', currentSets);
    }, [currentSets])
    useEffect(() => {
        console.log('currentPicks', currentPicks);
    }, [currentPicks])

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{lottoStructure.title}</Text>
            <View style={styles.numbersSection}>
                {lottoStructure.numbers.map((number, index) => (
                    <LottoNumber key={`lottoNumber_${index}`} value={null} color={number.color} currentSet={currentSets[number.setIndex]} setIndex={number.setIndex} index={index} setCurrentSets={setCurrentSets} setCurrentPicks={setCurrentPicks}/>
                ))}
            </View>
            <Text style={{...styles.pickerHeader, ...styles.buttonHeader}}>Click a button to randomize</Text>
            <Text style={{...styles.pickerHeader, ...styles.inputHeader}}>...or manually enter a number</Text>
            <Pressable><Text>Save</Text></Pressable>
        </View>
    )
}

const styles = {
    container: {
        paddingTop: 50,
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
}
