import {all} from 'redux-saga/effects'
import {fetchListAppointment,fetchMoreAppointment,fetchListAppointmentVideo,fetchMoreAppointmentVideo} from './AppointmentSaga'
export default function* rootSaga(){
    yield all([
        fetchListAppointment(),
        fetchMoreAppointment(),
        fetchListAppointmentVideo(),
        fetchMoreAppointmentVideo()
    ])
}