import { useLocalSearchParams } from 'expo-router';

export const getUrlParams = () => {

    return useLocalSearchParams();
};