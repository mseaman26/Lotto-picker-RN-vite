// In your HomePage.js or HomePage.jsx

import { View, Text, Platform, TouchableWithoutFeedback } from 'react-native-web'; 
import { useState, useEffect, useContext } from 'react';
import CustomPicker from '../components/PickerUniversal/CusomPicker/CustomPicker';
import UniversalLink from '../components/UniversalLink/UniversalLink';
import NavigateUniversal from '../components/NavigaveUniversal/NavigateUniversal';
import { AuthContext } from '../context/AuthContext';
import {globalStyles} from '../styles/globalStyles';

const isWeb = Platform.OS === 'web';

const HomePage = () => {

    const { user, loading } = useContext(AuthContext);

    const options = [{ label: 'Powerball', value: 'powerball' }, { label: 'Mega Millions', value: 'megamillions' }, { label: 'Option 3', value: 'option 3' }, { label: 'Option 4', value: 'option 4' }, { label: 'Option 5', value: 'option 5' }, { label: 'Option 6', value: 'option 6' }, { label: 'Option 7', value: 'option 7' }, { label: 'Option 8', value: 'option 8' }, { label: 'Option 9', value: 'option 9' }, { label: 'Option 10', value: 'option 10' }];

    const [lottoGame, setLottoGame] = useState('');
    const [redirecting, setRedirecting] = useState(false);
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    useEffect(() => {
        console.log('lottoGame', lottoGame);
    }, [lottoGame]);

    useEffect(() => {
        if (lottoGame) {
            setRedirecting(true);
        }
    }, [lottoGame]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <TouchableWithoutFeedback style={styles.container} onPress={() => setIsPickerOpen(false)}>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome, {user?.username}!</Text>
                <CustomPicker
                    label="Select your Lotto game"
                    selectedValue={lottoGame}
                    onValueChange={setLottoGame}
                    options={options}
                    style={{ borderColor: 'gray', borderWidth: 1 }} // 
                    labelStyle={{ color: 'black' }}
                    isPickerOpen={isPickerOpen}
                    setIsPickerOpen={setIsPickerOpen}
                />


                {redirecting && <NavigateUniversal to={isWeb ? `/lottoGame/${lottoGame}` : {
                    pathname: '/lottoGame/[lottoGame]',
                    params: { lottoGame: lottoGame }
                }}>

                </NavigateUniversal>}

            </View>
        </TouchableWithoutFeedback>

    );
};

const styles = ({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        paddingTop: isWeb? '35vh' : '45%',
        backgroundColor: globalStyles.mainBG.backgroundColor,
        height: '100vh',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: 200,
    },
    selectedValue: {
        marginTop: 20,
        fontSize: 18,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#4CAF50', // Green background color
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3, // Add shadow on Android
    },
    buttonText: {
        color: '#fff', // White text color
        fontSize: 16,
        fontWeight: '600',
        textDecorationLine: 'none'
        
    },
});

export default HomePage;
