import { Slot } from 'expo-router';
import Navbar from '../components/Navbar/Navbar';
import { SafeAreaView, View, StyleSheet } from 'react-native-web';
import { globalStyles } from '../styles/globalStyles';


export default function HomeLayout() {
  return (
    <>
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Navbar />
      </SafeAreaView>
      <Slot style={styles.slot} />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Allow the container to take the full height
        backgroundColor: globalStyles.mainBG.backgroundColor, 
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    SafeAreaView: {
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    slot: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
