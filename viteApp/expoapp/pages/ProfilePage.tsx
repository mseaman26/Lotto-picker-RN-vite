import React, {useEffect, useState, useContext} from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native-web';
import UniversalLink from '../components/UniversalLink/UniversalLink';
import { globalStyles } from '../styles/globalStyles';
import { getLottoPicksByUserId } from '../utils/apiHelpers';
import { AuthContext } from '../context/AuthContext';
import type { LottoPickData } from '../interfaces/interfaces';

const ProfilePage = () => {

  const isWeb = Platform.OS === 'web';
  const { user } = useContext(AuthContext);
  const [myPicks, setMyPicks] = useState<LottoPickData[] | null>(null)


  useEffect(() => {
      getLottoPicksByUserId(user.id)
      .then((data) => {
        console.log('data', data);
        const lottoPicks = data.data
        if (Array.isArray(lottoPicks)) {
          setMyPicks(lottoPicks as LottoPickData[]); // Assert type if API guarantees structure
        } else {
            console.error('Data format does not match LottoPickData:', lottoPicks);
            setMyPicks(null); // Optionally reset to null or empty array
        }
          
      }).catch((error) => {
          console.log('error', error);
      });
  }, [])

  useEffect(() => {
      console.log('myPicks', myPicks);
  }, [myPicks])


    return (
        <View style={styles.container}>

        <Text style={styles.name}>{user.username}</Text>
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
