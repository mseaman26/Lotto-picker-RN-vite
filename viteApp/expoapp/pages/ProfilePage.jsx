import React from 'react';
import { View, Text, Image, Button, StyleSheet, Platform } from 'react-native-web';
import UniversalLink from '../components/UniversalLink/UniversalLink';
import { globalStyles } from '../styles/globalStyles';

const ProfilePage = () => {

    const isWeb = Platform.OS === 'web';


    return (
        <View style={styles.container}>
        <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.profileImage}
        />
        <Text style={styles.name}>John Doe</Text>
        <UniversalLink href={isWeb ? '/' : '/'}>Back Home</UniversalLink>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: globalStyles.mainBG.backgroundColor,
    height: '100%',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProfilePage;
