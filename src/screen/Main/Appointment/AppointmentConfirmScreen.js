import React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView } from 'react-native';
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
import I18n from '@locale';
import { Header, ButtonText,LoadingScreen } from '@component';

const AppointmentConfirmScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { appointmentInfo } = route.params;
  const [confirmNote, setConfirmNote] = React.useState('');
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [errTextConfirm,setErrTextConfirm] = React.useState(false)
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
          <Text style={{ fontSize: scaledSize(14) }}>{I18n.t('date_appointment')}</Text>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View
              style={{
                backgroundColor: AppColor.white,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: scaledSize(8),
                paddingHorizontal: scaledSize(10),
                marginTop: scaledSize(10),
                borderWidth: 0.3,
                borderColor: '#ababab',
                flex: 0.7,
                marginRight: scaledSize(6),
                alignItems: 'center'
              }}>
              <TextInput
                style={{
                  borderColor: 'transparent',
                  borderWidth: 0,
                  width: '90%',
                  fontSize: scaledSize(14)
                }}
                editable={false}
                value={
                  moment(appointmentInfo.appointmentDate)
                    .format('DD/MM/yyyy HH:mm')
                    .split(' ')[0]
                }
              />
              <Icon name="calendar-outline" type="ionicon" size={20} />
            </View>
            <View
              style={{
                backgroundColor: AppColor.white,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: scaledSize(8),
                paddingHorizontal: scaledSize(10),
                marginTop: scaledSize(10),
                borderWidth: 0.3,
                borderColor: '#ababab',
                alignItems: 'center',
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
                  moment(appointmentInfo.appointmentDate)
                    .format('DD/MM/yyyy HH:mm')
                    .split(' ')[1]
                }
                editable={false}
              />
              <Icon name="time-outline" type="ionicon" size={20} />
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
          <Text style={{ fontSize: scaledSize(14) }}>{I18n.t('telephone')}</Text>
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
            value={appointmentInfo.phone}
            editable={false}
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
            value={appointmentInfo.appointmentEmail}
            editable={false}
          />
        </View>

        <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
          <Text style={{ fontSize: scaledSize(14) }}>{I18n.t('content')}</Text>
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
            value={appointmentInfo.reason}
            editable={false}
          />
        </View>
      </View>
    );
  };

  const handleConfirmAppointment = async () => {
    if(confirmNote === ''){
      setErrTextConfirm(true)
      return
    }
    const userId = await LocaleStorageManager.getUserId();
    setLoading(true);
    const data = {
      appointmentDate: appointmentInfo.appointmentDate,
      phone: appointmentInfo.phone,
      appointmentEmail: appointmentInfo.appointmentEmail,
      doctorId: appointmentInfo.doctorId._id,
      sessionDuration: appointmentInfo.sessionDuration,
      confirmNote: confirmNote,
      updatedBy: userId
    };
    try {
      const confirmAppointment = await API.confirmAppointment(appointmentInfo._id, data);
      if (confirmAppointment.status === 200) {
        const data = confirmAppointment.data;
        dispatch(AppointmentAction.updateAppointmentItem(data));
        setIsOpenModal(false);
        setLoading(false);
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
            {I18n.t('confirm_appointment')}
          </Text>
          <Text
            style={{
              fontSize: scaledSize(16),
              textAlign: 'center',
              paddingHorizontal: scaledSize(16),
              color: '#a3a3a3',
              marginTop: scaledSize(32)
            }}>
            {I18n.t('confirm_appointment_with_patient')}
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
            value={confirmNote}
            onChangeText={(text) => {
              if(errTextConfirm){
                setErrTextConfirm(false)
              }
              setConfirmNote(text)
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
                handleConfirmAppointment();
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
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          navigation
          title={I18n.t('confirm_appointment')}
          isRightButton={false}
          isLeftButton={true}
          onPressLeftButton={() => navigation.goBack()}
          // rightIconName="add-circle"
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: AppColor.background
          }}>
          <View style={{ flexDirection: 'column' }}>
            {appointmentInfo.patientId && _renderProfile(appointmentInfo.patientId)}
            {_renderAppointmentInfo()}
          </View>
          <View
            style={{
              paddingHorizontal: scaledSize(20),
              paddingBottom: scaledSize(30),
              width: '100%'
            }}>
        
            <ButtonText
              buttonStyle={{ paddingHorizontal: scaledSize(10) }}
              textStyle={{ fontWeight: '500' }}
              title={I18n.t('confirm')}
              onPress={() => setIsOpenModal(true)}
            />
          </View>
        </View>
      </SafeAreaView>
      <LoadingScreen visible={isLoading} />
      {_renderModalConfirm()}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white
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

export default AppointmentConfirmScreen;
