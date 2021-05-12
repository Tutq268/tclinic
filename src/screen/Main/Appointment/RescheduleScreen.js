import React from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, SafeAreaView } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { Icon, Avatar, Button } from 'react-native-elements';
import { scaledSize } from '@utils';
import { AppColor } from '@theme';
import { API } from '@services';
import { icons } from '@constant';
import { URL } from '@constant';
import moment from 'moment';
import Modal from 'react-native-modal';
import { LocaleStorageManager } from '@utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppointmentAction } from '@redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import { Header } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import I18n from "@locale";
import { Header,ButtonText,LoadingScreen  } from '@component';

const RescheduleScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { appointmentInfo } = route.params;
  const [isLoading,setLoading] = React.useState(false)
  const [rescheduleNote, setReschedulemNote] = React.useState('');
  const [isOpenDatePicker, setOpenDatePicker] = React.useState(false);
  const [appointmentDate, setAppointmentDate] = React.useState(
    moment(appointmentInfo.appointmentDate).format('DD/MM/yyyy HH:mm')
  );
  const [dateTest, setDateTest] = React.useState(new Date(appointmentInfo.appointmentDate));
  const [appointmentEmail, setAppointmentEmail] = React.useState(appointmentInfo.appointmentEmail);
  const [appointmentPhone, setAppointmentPhone] = React.useState(appointmentInfo.phone);
  const [appointmentNote, setAppointmentNote] = React.useState(appointmentInfo.reason);
  const [errTextConfirm,setErrTextConfirm] = React.useState(false)
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const _renderProfile = (data) => {
    let avatarUrl = '';
    if (data.avatar) {
      const filename = data.avatar.path.split('uploads/')[1];
      avatarUrl = URL.host + '/resources/' + filename;
    }
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          padding: scaledSize(16),
          backgroundColor: AppColor.white,
          marginTop: scaledSize(16)
        }}>
        {data.avatar && data.avatar.path ? (
          <Avatar
            source={{ uri: avatarUrl }}
            size={68}
            rounded
            containerStyle={{ backgroundColor: AppColor.color_main }}
          />
        ) : (
          <Avatar
            title={data && data.name ? data.name.split('')[0] : 'U'}
            size={68}
            rounded
            containerStyle={{ backgroundColor: AppColor.color_main }}
          />
        )}
        <View
          style={{
            flexDirection: 'column',
            marginLeft: scaledSize(10),
            marginTop: scaledSize(10)
          }}>
          <Text
            style={{
              color: AppColor.grey,
              marginBottom: scaledSize(3),
              fontWeight: '500',
              fontSize: scaledSize(13)
            }}>
            {data.name ? data.name : data.lastname ? data.lastname : data.firstname}
          </Text>
          <Text style={{ color: 'gray', fontSize: scaledSize(13), marginBottom: scaledSize(3) }}>
            {appointmentInfo.appointmentEmail && appointmentInfo.appointmentEmail}
          </Text>
          <Text style={{ color: 'gray', fontSize: scaledSize(13) }}>
            {appointmentInfo.phone && appointmentInfo.phone}
          </Text>
        </View>
      </View>
    );
  };

  const _renderAppointmentInfo = () => {
    return (
      <View
        style={{
          marginTop: scaledSize(16),
          paddingHorizontal: scaledSize(16),
          flexDirection: 'column'
        }}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontSize: scaledSize(14) }}>Ngày hẹn khám</Text>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View
              style={{
                backgroundColor: AppColor.white,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: scaledSize(8),
                paddingHorizontal: scaledSize(10),
                marginTop: scaledSize(10),
                borderWidth: 0.3,
                borderColor: '#ababab',
                flex: 0.7,
                marginRight: scaledSize(6)
              }}>
              <TextInput
                style={{
                  borderWidth: 0,
                  width: '90%',
                  fontSize: scaledSize(14)
                }}
                editable={false}
                value={
                  moment(dateTest.getTime())
                    .format('DD/MM/yyyy HH:mm')
                    .split(' ')[0]
                }
              />

              <Icon
                name="calendar-outline"
                type="ionicon"
                size={22}
                onPress={() => {
                  setMode('date');
                  setOpenDatePicker(true);
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: AppColor.white,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: scaledSize(8),
                paddingHorizontal: scaledSize(10),
                marginTop: scaledSize(10),
                borderWidth: 0.4,
                borderColor: '#ababab',
                flex: 0.3
              }}>
              <TextInput
                style={{
                  borderColor: 'transparent',
                  borderWidth: 0,
                  width: '90%',
                  fontSize: scaledSize(14)
                }}
                value={
                  moment(dateTest.getTime())
                    .format('DD/MM/yyyy HH:mm')
                    .split(' ')[1]
                }
                editable={false}
              />

              <Icon
                name="time-outline"
                type="ionicon"
                size={22}
                onPress={() => {
                  setMode('time');
                  setOpenDatePicker(true);
                }}
              />
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
          <Text style={{ fontSize: scaledSize(14) }}>Điện thoại</Text>
          <TextInput
            style={{
              paddingVertical: scaledSize(8),
              paddingHorizontal: scaledSize(10),
              marginTop: scaledSize(10),
              borderWidth: 0.3,
              borderColor: '#ababab',
              width: '100%',
              backgroundColor: AppColor.white,
              fontSize: scaledSize(14)
            }}
            value={appointmentPhone}
            onChangeText={(text) => setAppointmentPhone(text)}
          />
        </View>
        <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
          <Text style={{ fontSize: scaledSize(14) }}>Email</Text>
          <TextInput
            style={{
              paddingVertical: scaledSize(8),
              paddingHorizontal: scaledSize(10),
              marginTop: scaledSize(10),
              borderWidth: 0.3,
              borderColor: '#ababab',
              width: '100%',
              backgroundColor: AppColor.white,
              fontSize: scaledSize(14)
            }}
            value={appointmentEmail}
            onChangeText={(text) => setAppointmentEmail(text)}
          />
        </View>

        <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
          <Text style={{ fontSize: scaledSize(14) }}>Nội dung</Text>
          <TextInput
            style={{
              paddingVertical: scaledSize(8),
              paddingHorizontal: scaledSize(10),
              marginTop: scaledSize(10),
              borderWidth: 0.3,
              borderColor: '#ababab',
              width: '100%',
              backgroundColor: AppColor.white,
              fontSize: scaledSize(14)
            }}
            value={appointmentNote}
            onChangeText={(text) => setAppointmentNote(text)}
          />
        </View>
      </View>
    );
  };
  const handleRescheduleAppointment = async () => {
    if(rescheduleNote === ''){
      setErrTextConfirm(true)
      return
    }
    setLoading(true)
    const userId = await LocaleStorageManager.getUserId();
    const date = dateTest.getTime();
    const params = {
      appointmentDate: date,
      phone: appointmentPhone,
      appointmentEmail: appointmentEmail,
      sessionDuration: appointmentInfo.sessionDuration,
      rescheduleNote: rescheduleNote,
      updatedBy: userId,
      doctorId: appointmentInfo.doctorId._id
    };

    try {
      const rescheduleRes = await API.rescheduleAppointment(appointmentInfo._id, params);
      if (rescheduleRes.status === 200) {
        const data = rescheduleRes.data;
        dispatch(AppointmentAction.updateAppointmentItem(data));
        setLoading(false)
        setIsOpenModal(false);
        navigation.goBack();
      }
    } catch (error) {
      console.log('err: ', error);
    }
  };
  const _renderModalConfirm = () => {
    return (
      <Modal
        isVisible={isOpenModal}
        onModalHide={() => setIsOpenModal(false)}
        containerStyle={{ flex: 1 }}>

        <View
          style={{
            flexDirection: 'column',
            padding: scaledSize(32),
            backgroundColor: AppColor.white
          }}>
          <Text style={{ fontSize: scaledSize(18), fontWeight: '500', textAlign: 'center' }}>
            Xác nhận đặt lại lịch hẹn
          </Text>
          <Text
            style={{
              fontSize: scaledSize(16),
              textAlign: 'center',
              paddingHorizontal: scaledSize(16),
              color: '#a3a3a3',
              marginTop: scaledSize(32)
            }}>
            Bạn muốn xác nhận đặt lại lịch hẹn với bệnh nhân này?
          </Text>

          <TextInput
            style={{
              color: '#878686',
              marginTop: scaledSize(32),
              paddingHorizontal: scaledSize(10),
              borderWidth: 0.5,
              paddingTop: scaledSize(8),
              paddingBottom: scaledSize(8),
              fontSize: scaledSize(15),
              marginBottom: scaledSize(10)
            }}
            placeholder={'Nhập nội dung xác nhận!'}
            placeholderTextColor="#878686"
            value={rescheduleNote}
            onChangeText={(text) => {
              if(errTextConfirm){
                setErrTextConfirm(false)
              }
              setReschedulemNote(text)
            }}
          />
           {errTextConfirm && (
            <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
          )}
          <View
            style={{
              flexDirection: 'row',
              marginTop: scaledSize(16),
              justifyContent: 'space-between'
            }}>
                <ButtonText
            buttonStyle={{ paddingHorizontal: scaledSize(10), width: '45%' }}
            textStyle={{ fontWeight: '500' }}
            title={I18n.t('confirm')}
            onPress={() => {
              handleRescheduleAppointment();
            }}
          />
          <ButtonText
            buttonStyle={{
              paddingHorizontal: scaledSize(10),
              width: '45%',
              backgroundColor: 'transparent',
              borderWidth: 0.5
            }}
            textStyle={{ fontWeight: '500', color: 'black' }}
            title={I18n.t('cancel')}
            onPress={() => {
              setIsOpenModal(false);
            }}
          />
           
          </View>
        </View>
      </Modal>
    );
  };

  const [mode, setMode] = React.useState('date');
  return (
    <>
        <SafeAreaView style={styles.container}>

          <Header
          navigation
          title= {I18n.t("reschedule_appointment")}
          isRightButton={false}
          isLeftButton={true}
          onPressLeftButton={() => navigation.goBack()}
          // rightIconName="add-circle"
        />
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between',backgroundColor:AppColor.background }}>
          <KeyboardAwareScrollView>

            <View style={{ flexDirection: 'column' }}>
              {appointmentInfo.patientId && _renderProfile(appointmentInfo.patientId)}
              {_renderAppointmentInfo()}
            </View>
            </KeyboardAwareScrollView>
            <View
              style={{
                paddingHorizontal: scaledSize(20),
                paddingBottom: scaledSize(30),
                width: '100%',
              }}>
              {/* <Button
                title="Xác Nhận"
                type="clear"
                containerStyle={{
                  backgroundColor: AppColor.color_main,
                  paddingHorizontal: scaledSize(6),
                  borderWidth: 0
                }}
                titleStyle={{
                  color: AppColor.white,
                  fontSize: scaledSize(14),
                  fontWeight: '500',
                  paddingVertical: scaledSize(5)
                }}
                // onPress={() => setIsOpenModal(true)}
                onPress={() => {
                  const date = dateTest.getTime();
                  if (
                    date === appointmentInfo.appointmentDate &&
                    appointmentEmail === appointmentInfo.appointmentEmail &&
                    appointmentPhone === appointmentInfo.phone &&
                    appointmentNote === appointmentInfo.reason
                  )
                    return;
                  else {
                    setIsOpenModal(true);
                  }
                }}
              /> */}
               <ButtonText
              buttonStyle={{ paddingHorizontal: scaledSize(10) }}
              textStyle={{ fontWeight: '500' }}
              title={I18n.t('confirm')}
              onPress={() => {
                const date = dateTest.getTime();
                if (
                  date === appointmentInfo.appointmentDate &&
                  appointmentEmail === appointmentInfo.appointmentEmail &&
                  appointmentPhone === appointmentInfo.phone &&
                  appointmentNote === appointmentInfo.reason
                )
                  return;
                else {
                  setIsOpenModal(true);
                }
              }}
            />
            </View>
          </View>
        </SafeAreaView>

      {_renderModalConfirm()}
      <LoadingScreen visible={isLoading} />
      <DateTimePickerModal
        date={dateTest}
        isVisible={isOpenDatePicker}
        minimumDate={new Date()}
        mode={mode}
        onConfirm={(date) => {
          console.log('date: ', date);
          setOpenDatePicker(false);
          setDateTest(date);
        }}
        onCancel={() => setOpenDatePicker(false)}
      />
      {/* {_rederModalChooseDate()} */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:AppColor.white,
    flexDirection:'column'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
});

export default RescheduleScreen;
