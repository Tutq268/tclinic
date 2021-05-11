import {AsyncStorage} from 'react-native'

export async function get(key, callback) {
    let result = await AsyncStorage.getItem(key, callback);
    return result;
}

export async function set(key, value, callback) {
    await AsyncStorage.setItem(key, value, callback)
}

export async function remove(key, callback) {
    await AsyncStorage.removeItem(key, callback)
}
