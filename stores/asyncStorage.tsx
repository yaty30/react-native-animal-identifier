import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalVariables } from './store';

export const Write = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);

    } catch (e) {
        console.error("error on storing data.");
    }
}

export  const Retrieve = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if(value != null) return value;
    } catch (e) {
        console.error(e)
    }
};