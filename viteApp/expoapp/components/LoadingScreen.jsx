import { Text, View,  } from "react-native-web"
import { globalStyles } from "../styles/globalStyles"

export default function LoadingScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.loadingText}>loading...</Text>
            </View>
        </View>
    )

}

const styles = ({
    container: {
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 100,
    },
    textContainer: {
        width: '100%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'transparent',
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 64,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
    },
})