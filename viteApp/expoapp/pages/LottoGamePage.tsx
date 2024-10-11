


import { Text, View, Platform } from 'react-native-web';
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
    }, [])

    useEffect(() => {
        console.log('currentSets', currentSets);
    }, [currentSets])

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{lottoStructure.title}</Text>
            <View style={styles.numbersSection}>
                {lottoStructure.numbers.map((number, index) => (
                    <LottoNumber key={`lottoNumber_${index}`} value={null} color={number.color} currentSet={currentSets[number.setIndex]} setIndex={number.setIndex} index={index} setCurrentSets={setCurrentSets} />
                ))}
            </View>
        </View>
    )
}

const styles = {
    container: {
        paddingTop: 50,
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
}
