import * as appointment from './../constant/appointment';
const initialState = {
  listAppointment: null,
  totalAppointment: null,
  listAppointmentVideo: null,
  totalAppointmentVideo: null,
  isLoading: false,
  appointmentItem: null,
  medicalIndex: null
};

const AppointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case appointment.FETCH_START:
      return { ...state, isLoading: true };

    case appointment.LIST_APPOINTMENT:
      const data = action.payload;
      return {
        ...state,
        isLoading: false,
        listAppointment: data.data,
        totalAppointment: data.total
      };

    case appointment.SAVE_MORE_APPOINTMENT:
      const newList = state.listAppointment.concat(action.payload);
      return { ...state, isLoading: false, listAppointment: newList };

    case appointment.LIST_APPOINTMENT_VIDEO:
      const dataListVideo = action.payload;
      return {
        ...state,
        isLoading: false,
        listAppointmentVideo: dataListVideo.data,
        totalAppointmentVideo: dataListVideo.total
      };

    case appointment.SAVE_MORE_APPOINTMENT_VIDEO:
      const newListVideo = state.listAppointmentVideo.concat(action.payload);
      return { ...state, isLoading: false, listAppointmentVideo: newListVideo };

    case appointment.CHOOSE_APPOINTMENT_ITEM:
      return { ...state, isLoading: false, appointmentItem: action.payload };

    // case appointment.CONFIRM_APPOINTMENT:
    //   const dataConfirm = action.payload;
    //   const findIndex = state.listAppointment.findIndex((item) => item._id === dataConfirm._id);
    //   const newListAppointment = state.listAppointment.map((item, index) => {
    //     if (index === findIndex) {
    //       return dataConfirm;
    //     }
    //     return item;
    //   });
    //   return {
    //     ...state,
    //     isLoading: false,
    //     listAppointment: newListAppointment,
    //     appointmentItem: dataConfirm
    //   };

    // case appointment.RESCHEDULE_APPOINTMENT:
    //   const rescheduleData = action.payload;
    //   const findIndexReschedule = state.listAppointment.findIndex(
    //     (item) => item._id === rescheduleData._id
    //   );
    //   const newListAppointmentReschedule = state.listAppointment.map((item, index) => {
    //     if (index === findIndexReschedule) {
    //       return rescheduleData;
    //     }
    //     return item;
    //   });
    //   return {
    //     ...state,
    //     isLoading: false,
    //     listAppointment: newListAppointmentReschedule,
    //     appointmentItem: rescheduleData
    //   };
    // case appointment.CANCEL_APPOINTMENT:
    //   const cancleData = action.payload;
    //   const findIndexCancel = state.listAppointment.findIndex(
    //     (item) => item._id === cancleData._id
    //   );
    //   const newListAppointmentCancel = state.listAppointment.map((item, index) => {
    //     if (index === findIndexCancel) {
    //       return cancleData;
    //     }
    //     return item;
    //   });
    //   return {
    //     ...state,
    //     isLoading: false,
    //     listAppointment: newListAppointmentCancel,
    //     appointmentItem: cancleData
    //   };

    case appointment.UPDATE_APPOINTMENT_ITEM:
      const updateItem = action.payload;
      const findIndexUpdate = state.listAppointment.findIndex(
        (item) => item._id === updateItem._id
      );
      const newListAppointmentUpdate = state.listAppointment.map((item, index) => {
        if (index === findIndexUpdate) {
          return updateItem;
        }
        return item;
      });
      return {
        ...state,
        isLoading: false,
        listAppointment: newListAppointmentUpdate,
        appointmentItem: updateItem
      };

      

    case appointment.CREATE_APPOINTMENT:
      const newApponiment = action.payload;
      const newListAppointmentAfterCreate = [newApponiment].concat(state.listAppointment);
      return { ...state, listAppointment: newListAppointmentAfterCreate };

    case appointment.CREATE_APPOINTMENT_VIDEO:
      const newApponimentVideo = action.payload;
      const newListAppointmentVideoAfterCreate = [newApponimentVideo].concat(
        state.listAppointmentVideo
      );
      return { ...state, listAppointmentVideo: newListAppointmentVideoAfterCreate };
    
    case appointment.SAVE_MEDICAL_INDEX:
      return {...state,medicalIndex: action.payload}

    case appointment.CLEAR_MEDICAL_INDEX:
      return {...state,medicalIndex: null}

    default:
      return state;
  }
};

export default AppointmentReducer;
