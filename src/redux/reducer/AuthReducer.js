import * as auth from './../constant/auth'
const initialState = {
    userProfile : null,
    languageApp: null
}

export default AuthReducer = (state = initialState,action) =>{
    switch(action.type){
        case auth.LOGIN_SUCCESS :
            return {...state,userProfile: action.payload}
        case auth.GET_USER_PROFILE:
            return {...state,userProfile:action.payload}
        case auth.UPDATE_PROFILE:
            return {...state,userProfile: action.payload}
        case auth.UPDATE_LANGUAGE:
            return {...state,languageApp: action.payload}
        default:
            return state
    }
}