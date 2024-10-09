


import { Text, View, Platform } from 'react-native-web';
import { getUrlParams } from '../hooks/getParams';
import { lottoStructurer } from '../utils/lottoStructurer';
import LottoNumber from '../components/LottoNumber';
import {globalStyles} from '../styles/globalStyles';

const isWeb = Platform.OS === 'web';

export default function LottoGamePage() {
    const { lottoGame } = getUrlParams();
    console.log('lottoGame', lottoGame);

    const lottoStructure = lottoStructurer(lottoGame);
    console.log('lottoStructure', lottoStructure);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{lottoStructure.title}</Text>
            <View style={styles.numbersSection}>
                {lottoStructure.numbers.map((number, index) => (
                    <LottoNumber key={`lottoNumber_${index}`} min={number.min} max={number.max} value={null} color={number.color} spinning={false} />
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
