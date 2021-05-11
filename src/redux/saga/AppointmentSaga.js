import * as appointmet from './../constant/appointment'
import { takeEvery, put } from 'redux-saga/effects';
import { API } from '@services';

import {
    getListAppointment,
    getListAppointmentVideo,
    saveListAppointment,
    saveListAppointmentVideo,
    fetchStart,
    fetchSuccess,
    confirmAppointment,
    chooseAppointItem,
    saveMoreAppointment,
    saveMoreAppointmentVideo
} from "./../action/appointment"


function* listAppointment({payload}){
    yield put(fetchStart())
    const result = yield API.getListAppointment(payload);
    if(result.status === 200){
        const data = result.data;
        yield put(saveListAppointment(data))
    }

}


export function* fetchListAppointment(){
    yield takeEvery(appointmet.FETCH_LIST_APPOINTMENT, listAppointment)
}


export function* fetchMoreAppointment(){
    yield takeEvery(appointmet.FETCH_LIST_APPOINTMENT_MORE,function*({payload}){
        yield put(fetchStart())
        const result = yield API.getListAppointment(payload);
        if(result.status === 200){
            const data = result.data;
            yield put(saveMoreAppointment(data.data))
        }
    })
}

export function* fetchListAppointmentVideo(){
    yield takeEvery(appointmet.FETCH_LIST_APPOINTMENT_VIDEO,function*({payload}){
        const result = yield API.getListVideoCall(payload)
        if(result.status === 200){
            const data = result.data;
            yield put(saveListAppointmentVideo(data))
        }
    })
}

export function* fetchMoreAppointmentVideo(){
    yield takeEvery(appointmet.FETCH_LIST_APPOINTMENT_VIDEO_MORE,function*({payload}){
        yield put(fetchStart())
        const result = yield API.getListVideoCall(payload);

        if(result.status === 200){
            const data = result.data;
            yield put(saveMoreAppointmentVideo(data.data))
        }
    })
}

