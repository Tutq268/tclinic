import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { Icon, Avatar, Button } from 'react-native-elements';
import { scaledSize, RNToast } from '@utils';
import { AppColor } from '@theme';
// import { Dropdown } from 'react-native-material-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import { API } from '@services';
import { useSelector, useDispatch } from 'react-redux';
import { SiteMap } from '@navigation';
import { ScreenName } from '@constant';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { AppointmentAction } from '@redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import I18n from '@locale';
import { Header, ButtonText, LoadingScreen } from '@component';

const CreateAppointmentScreen = ({ route, navigation }) => {
  const closeDate = React.useRef(null);
  const dispatch = useDispatch();
  const { patientInfo } = route.params;
  const { addFromPatientNavigation } = route.params;
  const { userProfile } = useSelector((state) => state.auth);
  const [dateChoose, setDateChoose] = React.useState(new Date());
  const [isOpenDropdown, setOpenDropdown] = React.useState(false);
  const [isOpenDatePicker, setOpenDatePicker] = React.useState(false);
  const [error, setError] = React.useState([]);
  const [mode, setMode] = React.useState('date');
  const [appointmentType, setAppointmentType] = React.useState(null);
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [reason, setReason] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (userProfile) {
      if (userProfile.telephone) setPhone(userProfile.telephone);
      if (userProfile.email) setEmail(userProfile.email);
    }
  }, []);
  const _renderPatientChoose = () => {
    let avatarUrl = '';
    if (patientInfo.patientId) {
      if (patientInfo.patientId.avatar) {
        const filename = patientInfo.patientId.avatar.path.split('uploads/')[1];
        avatarUrl = URL.host + '/resources/' + filename;
      }
    }
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: scaledSize(20) }}>
        {patientInfo.patientId &&
        patientInfo.patientId.avatar &&
        patientInfo.patientId.avatar.path ? (
          <Avatar
            source={{ uri: avatarUrl }}
            size={50}
            rounded
            containerStyle={{ backgroundColor: AppColor.color_main }}
          />
        ) : (
          <Avatar
            title={
              patientInfo.patientId && patientInfo.patientId.name
                ? patientInfo.patientId.name.split('')[0]
                : 'U'
            }
            size={50}
            rounded
            containerStyle={{ backgroundColor: AppColor.color_main }}
          />
        )}
        <View style={{ flexDirection: 'column', marginLeft: scaledSize(10) }}>
          <Text
            style={{ fontSize: scaledSize(14), fontWeight: '500', marginBottom: scaledSize(3) }}>
            {patientInfo.name && patientInfo.name}
          </Text>
          <Text>{patientInfo.email && patientInfo.email}</Text>
        </View>
      </View>
    );
  };
  const _renderInfoAppointment = () => {
    return (
      <View
        style={{
          marginTop: scaledSize(16),
          backgroundColor: AppColor.white,
          padding: scaledSize(16),
          flexDirection: 'column'
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name="albums"
            type="ionicon"
            size={26}
            color={AppColor.color_main}
            style={{
              backgroundColor: `rgba(78, 154, 230, 0.2)`,
              width: scaledSize(28),
              height: scaledSize(28),
              borderRadius: scaledSize(28),
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: scaledSize(10)
            }}
          />
          <Text style={{ fontWeight: '500', fontSize: scaledSize(14) }}>Thông tin phòng khám</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginTop: scaledSize(16),
            paddingLeft: scaledSize(6)
          }}>
          <View
            style={{ flexDirection: 'column', zIndex: 1000, minHeight: isOpenDropdown ? 150 : 0 }}>
            <Text
              style={{ fontWeight: '500', fontSize: scaledSize(14), marginBottom: scaledSize(10) }}>
              Chọn dịch vụ
            </Text>
            <DropDownPicker
              onOpen={() => setOpenDropdown(true)}
              onClose={() => setOpenDropdown(false)}
              items={[
                { label: 'Tại Phòng Khám', value: 1 },
                { label: 'Khám online qua video', value: 2 }
              ]}
              labelStyle={{ fontSize: scaledSize(14), fontWeight: '400', color: AppColor.grey }}
              containerStyle={{ height: 42 }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              placeholder="Chọn hình thức khám"
              onChangeItem={(item) => setAppointmentType(item.value)}
            />
            {error.includes('type') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>
                Bạn chưa chọn loại dịch vụ!
              </Text>
            )}
          </View>

          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: scaledSize(14),
                  marginBottom: scaledSize(10),
                  marginRight: scaledSize(20)
                }}>
                Chọn bệnh nhân
              </Text>

              {!addFromPatientNavigation &&
                (patientInfo ? (
                  <TouchableOpacity
                    onPress={() => SiteMap.showScreen(navigation, ScreenName.SEARCH_USER)}>
                    <Text
                      style={{
                        color: 'red',
                        marginLeft: scaledSize(16),
                        fontSize: scaledSize(14)
                      }}>
                      Thay đổi
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => SiteMap.showScreen(navigation, ScreenName.SEARCH_USER)}>
                    <Text style={{ color: AppColor.color_main, fontSize: scaledSize(14) }}>
                      Tìm kiếm
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
            {patientInfo && _renderPatientChoose()}
            {error.includes('patient') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>
                Bạn chưa chọn bệnh nhân muốn hẹn khám!
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  const _renderInfoDoctor = () => {
    return (
      <View
        style={{
          marginTop: scaledSize(16),
          backgroundColor: AppColor.white,
          padding: scaledSize(16)
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name="person"
            type="ionicon"
            size={26}
            color={AppColor.color_main}
            style={{
              backgroundColor: `rgba(78, 154, 230, 0.2)`,
              width: scaledSize(28),
              height: scaledSize(28),
              borderRadius: scaledSize(28),
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: scaledSize(10)
            }}
          />
          <Text style={{ fontWeight: '500', fontSize: scaledSize(14) }}>Thông tin bác sĩ</Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginTop: scaledSize(16),
            paddingLeft: scaledSize(6)
          }}>
          <View style={{ flexDirection: 'column' }}>
            <Text
              style={{ fontWeight: '500', fontSize: scaledSize(14), marginBottom: scaledSize(10) }}>
              Ngày hẹn khám
            </Text>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View
                style={{
                  backgroundColor: AppColor.white,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: scaledSize(8),
                  paddingHorizontal: scaledSize(10),
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
                    moment(dateChoose)
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
                  alignItems: 'center',
                  paddingVertical: scaledSize(8),
                  paddingHorizontal: scaledSize(15),
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
                    moment(dateChoose)
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
            {error.includes('date') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>
                Bạn chưa chọn thời gian hẹn khám!
              </Text>
            )}
          </View>
          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text
              style={{ fontWeight: '500', fontSize: scaledSize(14), marginBottom: scaledSize(10) }}>
              Điện thoại
            </Text>
            <TextInput
              style={{
                paddingVertical: scaledSize(8),
                paddingHorizontal: scaledSize(10),
                borderWidth: 0.3,
                borderColor: '#ababab',
                width: '100%',
                backgroundColor: AppColor.white,
                fontSize: scaledSize(14)
              }}
              value={userProfile?.telephone && userProfile.telephone}
              onChangeText={(text) => setPhone(text)}
            />
            {error.includes('phone') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>
                Bạn chưa nhập số điện thoại!
              </Text>
            )}
          </View>
          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text
              style={{ fontWeight: '500', fontSize: scaledSize(14), marginBottom: scaledSize(10) }}>
              Email
            </Text>
            <TextInput
              style={{
                paddingVertical: scaledSize(8),
                paddingHorizontal: scaledSize(10),
                borderWidth: 0.3,
                borderColor: '#ababab',
                width: '100%',
                backgroundColor: AppColor.white,
                fontSize: scaledSize(14)
              }}
              value={userProfile?.email}
              onChangeText={(text) => setEmail(text)}
            />
            {error.includes('email') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>
                Bạn chưa nhập địa chỉ email!
              </Text>
            )}
          </View>
          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text
              style={{ fontWeight: '500', fontSize: scaledSize(14), marginBottom: scaledSize(10) }}>
              Lý do đặt lịch
            </Text>
            <TextInput
              style={{
                paddingVertical: scaledSize(8),
                paddingHorizontal: scaledSize(10),
                borderWidth: 0.3,
                borderColor: '#ababab',
                width: '100%',
                backgroundColor: AppColor.white,
                fontSize: scaledSize(14)
              }}
              multiline
              value={reason}
              onChangeText={(text) => setReason(text)}
            />
            {error.includes('reason') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>
                Bạn nhập lý do hẹn khám!
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  const _handleCreateNew = () => {
    let arrError = [];
    if (!appointmentType) arrError.push('type');
    if (dateChoose.getTime() < Date.now()) {
      arrError.push('date');
    }
    if (reason === '') arrError.push('reason');
    if (email === '') arrError.push('email');
    if (phone === '') arrError.push('phone');
    if (!patientInfo) arrError.push('patient');

    if (arrError.length === 0) {
      let params;
      if (appointmentType === 1) {
        params = {
          patientId: patientInfo._id,
          doctorId: userProfile._id,
          type: 'appointment',
          serviceOfferingId: '',
          appointmentDate: dateChoose.getTime(),
          phone: phone,
          appointmentEmail: 'anhdenday82@gmail.com',
          sessionDuration: 25,
          reason: reason,
          doctorState: '',
          isReschedule: false,
          isAppointmentBookedByAdmin: false,
          isAppointmentRescheduledByDoctor: false,
          rescheduleNote: '',
          createdBy: userProfile._id,
          patieneState: 'New'
        };
        setLoading(true);
        API.createAppointment(params)
          .then((res) => {
            console.log('Res: ', res);
            if (res.status === 200) {
              setLoading(false);
              const data = res.data;
              const result = data.data;
              const message = data.message;
              alert(message);
              if (result) {
                dispatch(AppointmentAction.createNewAppointment(result));
                navigation.goBack();
              }
            }
          })
          .catch((err) => {
            console.log('err: ', err);
          });
      } else if (appointmentType === 2) {
        params = {
          appointmentDate: dateChoose.getTime(),
          appointmentEmail: email,
          createdBy: userProfile._id,
          doctorId: userProfile._id,
          doctorState: '',
          patientId: patientInfo._id,
          patientState: 'New',
          phone: phone,
          reason: reason,
          serviceOfferingId: '',
          sessionDuration: 15,
          type: 'video',
          _id: '0'
        };
        console.log('params: ', params);
        setLoading(true);
        API.createAppointmentVideo(params)
          .then((res) => {
            if (res.status === 200) {
              setLoading(false);
              const data = res.data;
              const result = data.data;
              const message = data.message;
              alert(message);
              if (result) {
                dispatch(AppointmentAction.createNewAppointmentVideo(result));
                navigation.goBack();
              }
            }
          })
          .catch((err) => {
            console.log('err: ', err);
          });
      }
    } else {
      setError(arrError);
    }
  };

  const _renderButtonAction = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
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
            title={I18n.t('confirm')}
            onPress={() => _handleCreateNew()}
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
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    );
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          navigation
          title={I18n.t('create_appointment')}
          isRightButton={false}
          isLeftButton={true}
          onPressLeftButton={() => navigation.goBack()}
          // rightIconName="add-circle"
        />
        <KeyboardAwareScrollView style={{ backgroundColor: AppColor.background }}>
          {_renderInfoAppointment()}
          {_renderInfoDoctor()}
          {_renderButtonAction()}
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <LoadingScreen visible={isLoading} />
      <DateTimePickerModal
        date={dateChoose}
        isVisible={isOpenDatePicker}
        minimumDate={new Date()}
        mode={mode}
        onConfirm={(date) => {
          setOpenDatePicker(false);
          setDateChoose(date);
        }}
        onCancel={() => setOpenDatePicker(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white
  }
});

export default CreateAppointmentScreen;
