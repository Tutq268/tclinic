import React from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard, SafeAreaView,TouchableOpacity } from 'react-native';
import {  Avatar } from 'react-native-elements';
import { scaledSize } from '@utils';
import { AppColor } from '@theme';
import { API } from '@services';
import { URL } from '@constant';
import moment from 'moment';
import { SiteMap } from '@navigation';
import { ScreenName } from '@constant';
import { Header } from '@component';
import { useSelector, useDispatch } from 'react-redux';
import { AppointmentAction } from '@redux';
import Modal from 'react-native-modal';
import { ButtonText, LoadingScreen } from '@component';
import I18n from '@locale';

const AppointmentDetail = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { appointmentItem } = useSelector((state) => state.appointment);
  const [examResultAppointment,setExamResultAppointment] = React.useState(null)
  React.useEffect(() =>{
    if(appointmentItem){
      if(appointmentItem.patientState === 'Examined'){
        if(appointmentItem.type === "appointment"){
          API.getExamResultByAppointment(appointmentItem._id).then(res =>{
            if(res.status === 200){
              const data = res.data.data
              setExamResultAppointment(data)
            }
          }).catch(err =>{
            console.log("err: ",err)
          })
        }else if(appointmentItem.type === "video"){
          API.getExamResultByAppointmentVideo(appointmentItem._id).then(res =>{
            if(res.status === 200){
              const data = res.data.data
              setExamResultAppointment(data)
            }
          }).catch(err =>{
            console.log("err: ",err)
          })
        }
      }
    }
  },[appointmentItem])
  const [isLoading, setLoading] = React.useState(false);
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [cancelNote, setCancelNote] = React.useState('');
  const _renderProfile = (data) => {
    let avatarUrl = '';
    if (data.avatar) {
      if (data.avatar.path) {
        const filename = data.avatar.path.split('uploads/')[1];
        avatarUrl = URL.host + '/resources/' + filename;
      }
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
            {appointmentItem.appointmentEmail && appointmentItem.appointmentEmail}
          </Text>
          <Text style={{ color: 'gray', fontSize: scaledSize(13) }}>
            {appointmentItem.phone && appointmentItem.phone}
          </Text>
        </View>
      </View>
    );
  };

  const _renderInfo = () => {
    return (
      <View style={{ flexDirection: 'column', margin: scaledSize(20) }}>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: AppColor.white,
            padding: scaledSize(10)
          }}>
          <Text style={{ fontSize: scaledSize(14), marginBottom: scaledSize(3) }}>Thời gian</Text>
          <Text style={{ fontSize: scaledSize(14), marginBottom: scaledSize(3) }}>
            {moment(appointmentItem.appointmentDate).format('HH:mm - DD/MM/yyyy')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: AppColor.white,
            padding: scaledSize(10),
            marginTop: scaledSize(16)
          }}>
          <Text style={{ fontSize: scaledSize(14), marginBottom: scaledSize(3) }}>
            Thời gian dự tính
          </Text>
          <Text style={{ fontSize: scaledSize(14), marginBottom: scaledSize(3) }}>{appointmentItem.sessionDuration} phút </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: AppColor.white,
            padding: scaledSize(10),
            marginTop: scaledSize(16)
          }}>
          <Text style={{ fontSize: scaledSize(14), marginBottom: scaledSize(3) }}>
            {I18n.t('content')}
          </Text>
          <Text style={{ fontSize: scaledSize(14), marginBottom: scaledSize(3) }}>
            {appointmentItem.reason}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: AppColor.white,
            padding: scaledSize(10),
            marginTop: scaledSize(16)
          }}>
          <Text style={{ fontSize: scaledSize(14), marginBottom: scaledSize(3) }}>
            {I18n.t('status')}
          </Text>
          {appointmentItem.patientState === 'New' && (
            <Text style={{ fontSize: scaledSize(14), marginBottom: scaledSize(3) }}>
              {I18n.t('wait_confirm')}
            </Text>
          )}
          {appointmentItem.patientState === 'Examined' && (
            <Text style={{ fontSize: scaledSize(14), marginBottom: scaledSize(3) }}>
              {I18n.t('examined')}
            </Text>
          )}
          {appointmentItem.patientState === 'Rescheduled' && (
            <Text style={{ fontSize: scaledSize(14), marginBottom: scaledSize(3) }}>
              {I18n.t('rescheduled')}
            </Text>
          )}
          {appointmentItem.patientState === 'Cancelled' && (
            <Text style={{ fontSize: scaledSize(14), marginBottom: scaledSize(3) }}>
              {I18n.t('cancelled')}
            </Text>
          )}
          {appointmentItem.patientState === 'Confirmed' && (
            <Text style={{ fontSize: scaledSize(14), marginBottom: scaledSize(3) }}>
              {I18n.t('confirmed')}
            </Text>
          )}
        </View>
        
        {appointmentItem.patientState === 'Confirmed' && (
          <View
            style={{
              flexDirection: 'column',
              backgroundColor: AppColor.white,
              padding: scaledSize(10),
              marginTop: scaledSize(16)
            }}>
            <Text style={{ fontSize: scaledSize(14), marginBottom: scaledSize(3) }}>
              {I18n.t('note')}
            </Text>
            <Text style={{ fontSize: scaledSize(14), marginBottom: scaledSize(3) }}>
              {appointmentItem.confirmNote}
            </Text>
          </View>
        )}
        {appointmentItem.patientState === 'Cancelled' && (
          <View
            style={{
              flexDirection: 'column',
              backgroundColor: AppColor.white,
              padding: scaledSize(10),
              marginTop: scaledSize(16)
            }}>
            <Text style={{ fontSize: scaledSize(14), marginBottom: scaledSize(3) }}>
              {I18n.t('reason_cancel')}
            </Text>
            <Text style={{ fontSize: scaledSize(14), marginBottom: scaledSize(3) }}>
              {appointmentItem.cancelNote}
            </Text>
          </View>
        )}
        {appointmentItem.patientState === 'Rescheduled' && (
          <View
            style={{
              flexDirection: 'column',
              backgroundColor: AppColor.white,
              padding: scaledSize(10),
              marginTop: scaledSize(16)
            }}>
            <Text style={{ fontSize: scaledSize(14), marginBottom: scaledSize(3) }}>
              {I18n.t('note')}
            </Text>
            <Text style={{ fontSize: scaledSize(14), marginBottom: scaledSize(3) }}>
              {appointmentItem.rescheduleNote}
            </Text>
          </View>
        )}
         {(appointmentItem.patientState === 'Examined' && examResultAppointment)&& (
          <TouchableOpacity
            style={{
              flexDirection: 'column',
              backgroundColor: AppColor.white,
              padding: scaledSize(10),
              marginTop: scaledSize(16)
            }}
            onPress={() =>
              SiteMap.showScreen(navigation, ScreenName.EXAM_RESULT_DETAIL, { examInfo: examResultAppointment })
            }
            >
            <Text
              style={{
                fontSize: scaledSize(16),
                marginBottom: scaledSize(3),
                color: AppColor.color_main
              }}>
              Xem kết quả khám bệnh
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const _handleCancelAppointment = () => {
    Keyboard.dismiss();
    const appointmentId = appointmentItem._id;
    let param = {
      cancelNote: cancelNote
    };
    setLoading(true);
    API.cancelAppointment(appointmentId, param)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          dispatch(AppointmentAction.updateAppointmentItem(data));
          setLoading(false);
          setIsOpenModal(false);
        }
      })
      .catch((Err) => {
        console.log('err: ', Err);
      });
  };
  const _renderAllAction = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: scaledSize(20),
          paddingBottom: scaledSize(20)
        }}>
        <View style={{ flexDirection: 'row' }}>
          <ButtonText
            buttonStyle={{ paddingHorizontal: scaledSize(10) }}
            textStyle={{ fontWeight: '500' }}
            title="XÁC NHÂN"
            onPress={() => {
              SiteMap.showScreen(navigation, ScreenName.APPOINTMENT_CONFIRM, {
                appointmentInfo: appointmentItem
              });
            }}
          />

          <ButtonText
            buttonStyle={{ paddingHorizontal: scaledSize(10), marginLeft: scaledSize(10) }}
            textStyle={{ fontWeight: '500' }}
            title={I18n.t('reschedule')}
            onPress={() => {
              SiteMap.showScreen(navigation, ScreenName.APPOINTMENT_RESCHEDULE, {
                appointmentInfo: appointmentItem
              });
            }}
          />
        </View>

        <ButtonText
          buttonStyle={{ paddingHorizontal: scaledSize(20), backgroundColor: '#b8b6b6' }}
          textStyle={{ fontWeight: '500' }}
          title={I18n.t('cancel')}
          onPress={() => setIsOpenModal(true)}
        />
      </View>
    );
  };

  const _backToAppointmentList = () => {
    return (
      <View
        style={{ paddingHorizontal: scaledSize(20), paddingBottom: scaledSize(30), width: '100%' }}>
        <ButtonText
          buttonStyle={{ paddingHorizontal: scaledSize(10) }}
          textStyle={{ fontWeight: '500' }}
          title={I18n.t('back')}
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  };
  const _renderModalCancel = () => {
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
            Xác nhận huỷ lịch hẹn
          </Text>
          <Text
            style={{
              fontSize: scaledSize(16),
              textAlign: 'center',
              paddingHorizontal: scaledSize(16),
              color: '#a3a3a3',
              marginTop: scaledSize(32)
            }}>
            Bạn muốn xác nhận huỷ lịch hẹn với bệnh nhân này?
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
            placeholder={'Nhập lý do huỷ cuộc hẹn!'}
            placeholderTextColor="#878686"
            value={cancelNote}
            onChangeText={(text) => setCancelNote(text)}
          />
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
                _handleCancelAppointment();
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
  const _renderResultAction = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          margin: scaledSize(20),
          paddingBottom: scaledSize(20)
        }}>
        <ButtonText
          buttonStyle={{ paddingHorizontal: scaledSize(10), width: '45%' }}
          textStyle={{ fontWeight: '500' }}
          title={I18n.t('return_result')}
          onPress={() => {
            dispatch(AppointmentAction.clearMedicalIndex());
            SiteMap.showScreen(navigation, ScreenName.RETURN_EXAM_RESULT, {
              appointmentInfo: appointmentItem
            });
          }}
        />

        <ButtonText
          buttonStyle={{
            paddingHorizontal: scaledSize(10),
            width: '45%',
            backgroundColor: '#b8b6b6'
          }}
          textStyle={{ fontWeight: '500' }}
          title={I18n.t('back')}
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          onPressLeftButton={() => navigation.goBack()}
          title={I18n.t('appointment_at_clinic')}
          isRightButton={false}
          isLeftButton={true}
          // rightIconName="add-circle"
        />
        {appointmentItem && (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: AppColor.background
            }}>
            <View style={{ flexDirection: 'column' }}>
              {appointmentItem.patientId && _renderProfile(appointmentItem.patientId)}
              {_renderInfo()}
            </View>
            {appointmentItem.patientState === 'New' && _renderAllAction()}
            {(appointmentItem.patientState === 'Confirmed' ||
              appointmentItem.patientState === 'Rescheduled') &&
              _renderResultAction()}
            {(appointmentItem.patientState === 'Examined' ||
              appointmentItem.patientState === 'Cancelled') &&
              _backToAppointmentList()}
          </View>
        )}
      </SafeAreaView>
      <LoadingScreen visible={isLoading} />
      {_renderModalCancel()}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white
  }
});

export default AppointmentDetail;
