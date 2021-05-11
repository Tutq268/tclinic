import * as auth from './../constant/auth'
import {LocaleStorageManager} from '@utils'
export const loginSuccess = (data) =>{
    const {user,token} = data
    LocaleStorageManager.setAccessToken(token)
    LocaleStorageManager.setUserId(user._id)
    return{
        type: auth.LOGIN_SUCCESS,
        payload: user
    }
}

export const getUserProfile = (data) =>{
    console.log(data)
    return {
        type: auth.GET_USER_PROFILE,
        payload: data
    }
}

export const updateProfile = data =>{
    return{
        type: auth.UPDATE_PROFILE,
        payload: data
    }
}

export const updateLanguage = data =>{
    return{
        type: auth.UPDATE_LANGUAGE,
        payload: data
    }
}