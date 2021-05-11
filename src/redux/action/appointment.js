import * as appointment from './../constant/appointment'


export const getListAppointment = data =>{
    return{
        type: appointment.FETCH_LIST_APPOINTMENT,
        payload: data
    }
}

export const fetchMoreAppointment = data =>{
    return{
        type: appointment.FETCH_LIST_APPOINTMENT_MORE,
        payload: data
    }
}

export const fetchMoreAppointmentVideo = data =>{
    return{
        type: appointment.FETCH_LIST_APPOINTMENT_VIDEO_MORE,
        payload:data
    }
}
export const saveMoreAppointment = data =>{
    return {
        type: appointment.SAVE_MORE_APPOINTMENT,
        payload: data
    }
}
export const saveMoreAppointmentVideo = data =>{
    return{
        type: appointment.SAVE_MORE_APPOINTMENT_VIDEO,
        payload: data
    }
}

export const getListAppointmentVideo = data =>{
    return{
        type: appointment.FETCH_LIST_APPOINTMENT_VIDEO,
        payload: data
    }
}

export const saveListAppointment = (data) =>{
    return{
        type: appointment.LIST_APPOINTMENT,
        payload: data
    }
}

export const saveListAppointmentVideo = (data) =>{
    return{
        type: appointment.LIST_APPOINTMENT_VIDEO,
        payload: data
    }
}

export const fetchStart = () =>{
    return {
        type: appointment.FETCH_START
    }
}

export const fetchSuccess = () =>{
    return{
        type: appointment.FETCH_SUCCESS
    }
}

export const confirmAppointment = data =>{
    return {
        type: appointment.CONFIRM_APPOINTMENT,
        payload: data
    }
}

export const rescheduleAppointment = data =>{
    return{
        type: appointment.RESCHEDULE_APPOINTMENT,
        payload: data
    }
}

export const chooseAppointItem = data =>{
    return {
        type: appointment.CHOOSE_APPOINTMENT_ITEM,
        payload: data
    }
}

export const updateAppointmentItem = data =>{
    return{
        type: appointment.UPDATE_APPOINTMENT_ITEM,
        payload: data
    }
}

export const cancaelAppointment = data =>{
    return {
        type: appointment.CANCEL_APPOINTMENT,
        payload: data
    }
}

export const createNewAppointment = data =>{
    return {
        type: appointment.CREATE_APPOINTMENT,
        payload: data
    }
}

export const createNewAppointmentVideo = data =>{
    return{
        type: appointment.CREATE_APPOINTMENT_VIDEO,
        payload: data
    }
}

export const saveMedicalIndex = data =>{
    return{
        type: appointment.SAVE_MEDICAL_INDEX,
        payload: data
    }
}

export const clearMedicalIndex = () =>{
    return{
        type: appointment.CLEAR_MEDICAL_INDEX
    }
}
