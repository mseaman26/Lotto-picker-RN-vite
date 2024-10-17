import React, {useEffect, useState, useContext} from 'react';
import { View, Text, Platform, ScrollView } from 'react-native-web';
import UniversalLink from '../components/UniversalLink/UniversalLink';
import { globalStyles } from '../styles/globalStyles';
import { getLottoPicksByUserId } from '../utils/apiHelpers';
import { AuthContext } from '../context/AuthContext';
import type { LottoPickData } from '../interfaces/interfaces';
import { lottoStructurer } from '../utils/lottoStructurer';


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
          <Text style={styles.name}>{user.username}'s picks</Text>
          <ScrollView style={styles.scrollView}>
            {myPicks && myPicks.map((pick, index) => {
              const date = new Date(pick.createdAt);
              const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true, // for 12-hour clock
              });
              const lottoStructure = lottoStructurer(pick.gameName);
              const structureNumbers = lottoStructure.numbers;
              return (
                <View key={index} style={styles.pickContainer}>
                  <Text style={styles.gameName}>{pick.gameName}</Text>
                  <View style={styles.numbersContainer}>
                    {pick.numbers.map((number, index) => {
                      const structureNumber = structureNumbers[index];
                      return (
                        <View key={index} style={{...styles.number, backgroundColor: structureNumbers[index].color}}>
                          <Text>{number}</Text>
                        </View>
                      );
                    })}
                  </View>
                  <Text>{formattedDate}</Text>
                </View>
              )
            })}
          </ScrollView>
        </View>
    );
};

const styles = ({
  container: {
    alignItems: 'center',
    padding: 20,
    height: '100%',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textDecoration: 'underline',
  },
  scrollView:{
    width: '100%',
    maxWidth: 500,
  },
  pickContainer: {
    marginBottom: 20,
  },
  gameName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  numbersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  number: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    height: 40,
    width: 40,
    borderRadius: '50%',
  },
});

export default ProfilePage;
