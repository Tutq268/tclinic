import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import AppointmentReducer from './AppointmentReducer'
export default combineReducers({
    auth: AuthReducer,
    appointment: AppointmentReducer
})