// Navbar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native-web';
import { globalStyles } from '../../styles/globalStyles';
import UniversalLink from '../UniversalLink/UniversalLink';
import { AuthContext } from '../../context/AuthContext';

const isWeb = Platform.OS === 'web';

const Navbar = () => {

    const { user, logout } = React.useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }

    console.log('globalStyles', globalStyles.mainBG.backgroundColor);
    return (
        <View style={styles.navbar}>
            <UniversalLink href={'/'}>
                <Text style={styles.navItem}>Home</Text>
            </UniversalLink>
            <UniversalLink href={isWeb ? '/profile' : 'ProfilePage'}>
                <Text style={styles.navItem}>Profile</Text>
            </UniversalLink>
            <TouchableOpacity onPress={handleLogout}><Text style={styles.navItem}>Logout</Text></TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 40,
        backgroundColor: globalStyles.mainBG.backgroundColor,
        paddingTop: isWeb ? 15 : 0,
    },
    navItem: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Navbar;
