import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef, updateReadyState } from './RootNavigation';
import MainTabNavigator from './MainTabNavigator';
import { ScreenName } from '@constant';

import {
  SignInScreen,
  AuthLoadingScreen,
  QuestionDetailScreen,
  PatientInfoScreen,
  HealthIndexScreen,
  AppointmentDetail,
  AppointmentConfirm,
  RescheduleScreen,
  CreateAppointmentScreen,
  SearchUserScreen,
  PatientBooking,
  PatientExamResult,
  PatientMedicalHistory,
  PatientPrescription,
  PatientQuestion,
  PrescriptionDetail,
  AddNewPrescription,
  ReturnExamResultScreen,
  ExamResultInfo,
  InfoAppScreen,
  SettingScreen,
  SupportScreen,
  UpdateProfileScreen,
  MedicalIndexScreen
} from '@screen';
const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer ref={navigationRef} onReady={() => updateReadyState(true)}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        screenOptions={{
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS
        }}
        headerMode="none"
        mode="modal"
        initialRouteName="LOADING_SCREEN">
        <Stack.Screen name={ScreenName.LOADING_SCREEN} component={AuthLoadingScreen} />
        <Stack.Screen name={ScreenName.SIGNIN_SCREEN} component={SignInScreen} />
        <Stack.Screen name="App" component={MainTabNavigator} />
        <Stack.Screen name={ScreenName.QUESTION_DETAIL} component={QuestionDetailScreen} />
        <Stack.Screen name={ScreenName.PATIENT_INFO} component={PatientInfoScreen} />
        <Stack.Screen name={ScreenName.HEALTH_INDEX} component={HealthIndexScreen} />
        <Stack.Screen name={ScreenName.APPOINTMENT_DETAIL} component={AppointmentDetail} />
        <Stack.Screen name={ScreenName.APPOINTMENT_CONFIRM} component={AppointmentConfirm} />
        <Stack.Screen name={ScreenName.APPOINTMENT_RESCHEDULE} component={RescheduleScreen} />
        <Stack.Screen name={ScreenName.CREATE_APPOINTMENT} component={CreateAppointmentScreen} />
        <Stack.Screen name={ScreenName.SEARCH_USER} component={SearchUserScreen} />
        <Stack.Screen name={ScreenName.PATIENT_BOOKING} component={PatientBooking} />
        <Stack.Screen name={ScreenName.PATIENT_EXAMRESULT} component={PatientExamResult} />
        <Stack.Screen name={ScreenName.PATIENT_MEDICAL_HISTORY} component={PatientMedicalHistory} />
        <Stack.Screen name={ScreenName.PATIENT_PRESCRIPTION} component={PatientPrescription} />
        <Stack.Screen name={ScreenName.PATIENT_QUESTION} component={PatientQuestion} />
        <Stack.Screen name={ScreenName.PRESCRIPTION_DETAIL} component={PrescriptionDetail} />
        <Stack.Screen name={ScreenName.ADD_NEW_PRESCRIPTION} component={AddNewPrescription} />
        <Stack.Screen name={ScreenName.RETURN_EXAM_RESULT} component={ReturnExamResultScreen} />
        <Stack.Screen name={ScreenName.EXAM_RESULT_DETAIL} component={ExamResultInfo} />
        <Stack.Screen name={ScreenName.INFO_APP} component={InfoAppScreen} />
        <Stack.Screen name={ScreenName.SETTING} component={SettingScreen} />
        <Stack.Screen name={ScreenName.SUPPORT} component={SupportScreen} />
        <Stack.Screen name={ScreenName.UPDATE_PROFILE} component={UpdateProfileScreen} />
        <Stack.Screen name={ScreenName.MEDICAL_INDEX} component={MedicalIndexScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
