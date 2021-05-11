import axios from 'axios';
import { URL } from '@constant';
import { LocaleStorageManager } from '@utils';

const getInstance = () => {
  const instance = axios.create({
    baseURL: URL.baseUrl,
    timeout: 30000
  });
  instance.interceptors.request.use(
    async (config) => {
      let token = await LocaleStorageManager.getAccessToken();
      if (!token) {
        return config;
      }
      let header = {
        ...config.headers, Authorization: token
      };

      config.headers = header;

      return config;
    },
    (err) => {
      console.log('err: ' + err);
      return Promise.reject(err);
    }
  );
  // instance.interceptors.response.use(
  //    (response) => {
  //       if (response.status === 401) {
  //          console.log("You are not authorized");
  //       }
  //       return response;
  //    },
  //    (error) => {
  //       console.log("err: ", error);
  //       if (
  //          error.response.status === 401 &&
  //          localStorage.getItem("tokenWebgameFE")
  //       ) {
  //          localStorage.removeItem("tokenWebgameFE");
  //          localStorage.removeItem("userIdWebgame");
  //       }
  //       if (error.response && error.response.data) {
  //          return Promise.reject(error);
  //       }
  //       return Promise.reject(error.message);
  //    }
  // );
  return instance;
};

const API = {
  instance: getInstance()
};

API.loginWithTelephone = (data) => {
  const param = {
    telephone: data.telephone,
    password: data.password
  };
  return API.instance.post('/auth/login', param);
};

API.getUserProfile = (userId) => {
  return API.instance.get(`/auth/profile/${userId}`);
};

API.getAllPatient = (page) => {
  return API.instance.get(
    `/doctor/findPatients?hcp_id=5d158ab8c7afe6090d7cdd55&count=1&limit=20&skip=${(page - 1) * 20}`
  );
};

API.getListAppointment = async (page) => {
  const doctorId = await LocaleStorageManager.getUserId();
  return API.instance.get(
    `/appointment/findByDoctor?doctorId=${doctorId}&limit=20&skip=${(page - 1) *
      20}&count=1&type=appointment`
  );
};

API.getListVideoCall = async (page) => {
  const doctorId = await LocaleStorageManager.getUserId();
  return API.instance.get(
    `/video/findByDoctor?doctorId=${doctorId}&type=video&count=1&limit=20&skip=${(page - 1) * 20}`
  );
};

API.getListQuestion = async (page) => {
  const doctorId = await LocaleStorageManager.getUserId();
  return API.instance.get(
    `/textconsultation/asked?doctorId=${doctorId}&skip=${(page - 1) * 20}&limit=20&count=1`
  );
};

API.getPatientProfileDashboard = (patientId) => {
  return API.instance.get(`/patient/getPatientProfileDashboard/${patientId}`);
};

API.confirmAppointment = (appointmentId, data) => {
  return API.instance.put(`/appointment/confirm/${appointmentId}`, data);
};

API.rescheduleAppointment = (appointmentId, data) => {
  return API.instance.put(`/appointment/reschedule/${appointmentId}`, data);
};

API.cancelAppointment = (appointmentId, param) => {
  return API.instance.put(`/appointment/cancel/${appointmentId}`, param);
};

API.createComment = (param) => {
  return API.instance.post('/comments', param);
};

API.searchPatient = (keysearch, page) => {
  return API.instance.get(
    `doctor/findPatients?hcp_id=5d158ab8c7afe6090d7cdd55&count=1&limit=20&skip=${(page - 1) *
      20}&search=${keysearch}`
  );
};

API.createAppointment = (params) => {
  console.log("params: ",params)
  return API.instance.post('/appointment', params);
};

API.createAppointmentVideo = (params) => {
  return API.instance.post('/video', params);
};

API.getPrescription = async (patientId) => {
  const doctorId = await LocaleStorageManager.getUserId();
  return API.instance.get(
    `/prescriptions/his/findAll?patientId=${patientId}&doctorId=${doctorId}&count=1&limit=20&skip=0`
  );
};

API.getExamHistory = (patientCode) => {
  return API.instance.get(`/examhistory?patientCode=0000000432&count=1&limit=100&skip=0`);
};

API.getExamHistoryItem = (kcbCode) => {
  return API.instance.get(`/payment?kcbCode=${kcbCode}&count=1&limit=100&skip=0`);
};

API.getExamResultOfPatient = (patientId) => {
  return API.instance.get(`/examination/findByPatientId?patientId=${patientId}&page=1&limit=20`);
};
// examination/findByPatientId?patientId=5f4cb511fe34210010772bf0&page=1&limit=10

API.getListMedicalCate = () => {
  return API.instance.get(`/medicalcate?count=1&limit=20`);
};

API.getPatientQuestion = (patientId) => {
  return API.instance.get(
    `/textconsultation/findByPatientId?patientId=${patientId}&count=1&limit=20&skip=0`
  );
};

API.getDrugGroup = () => {
  return API.instance.get('/druggroup?count=1&limit=100&skip=0');
};

API.getDrugCategory = (groupId) => {
  return API.instance.get(`/drugcategory?count=1&limit=100&skip=0&drugGroup=${groupId}`);
};

API.createNewPrescription = (params) => {
  return API.instance.post(`/prescriptions/his/create`, params);
};

API.findiseases = (keyword) => {
  return API.instance.get(`/diseases?count=1&limit=100&skip=0&search=${keyword}`);
};

API.getPatientCategories = () => {
  return API.instance.get(`/doctor/getPatientCategories/all`);
};

API.createExamination = (params) => {
  return API.instance.post(`/examination`, params);
};

API.uploadAvatar = async (params) => {
  const doctorId = await LocaleStorageManager.getUserId();
  return API.instance.put(`/patient/updateProfile/${doctorId}`, params);
};

API.updteProfile = async (params) => {
  const doctorId = await LocaleStorageManager.getUserId();
  return API.instance.put(`/doctor/updateProfile/${doctorId}`, params);
};


export default API;
