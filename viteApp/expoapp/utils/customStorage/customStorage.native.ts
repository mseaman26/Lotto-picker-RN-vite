//export an object that has getItem and setItem functions using async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

export const customStorage = {
    
    getItem: async (key: string) => {
        return await AsyncStorage.getItem(key);
    },
    setItem: async (key: string, value: string) => {
        await AsyncStorage.setItem(key, value);
        
    },
    removeItem: async (key: string) => {
        await AsyncStorage.removeItem(key);
    },
    clear: async () => {
        await AsyncStorage.clear();
    }
    
}