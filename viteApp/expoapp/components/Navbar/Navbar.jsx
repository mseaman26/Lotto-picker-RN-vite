// Navbar.js
import React, {useContext} from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native-web';
import { globalStyles } from '../../styles/globalStyles';
import UniversalLink from '../UniversalLink/UniversalLink';
import { AuthContext } from '../../context/AuthContext';

const isWeb = Platform.OS === 'web';

const Navbar = () => {

    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }

    console.log('globalStyles', globalStyles.mainBG.backgroundColor);

    if(!user) {
        return null;
    }
    return (
        <View style={styles.navbar}>
            <UniversalLink href={'/'}>
                <Text style={styles.navItem}>Home</Text>
            </UniversalLink>
            <UniversalLink href={isWeb ? '/profile' : 'ProfilePage'}>
                <Text style={styles.navItem}>My Picks</Text>
            </UniversalLink>
            <Pressable onPress={handleLogout}><Text style={styles.navItem}>Logout</Text></Pressable>

        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 60,
        alignItems: 'center',
        backgroundColor: globalStyles.mainBG.backgroundColor,
        paddingTop: 0,
        paddingBottom: isWeb ? 0 : 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    },
    navItem: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Navbar;
