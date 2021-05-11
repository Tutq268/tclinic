import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { API } from '@services';
import { Avatar, Icon } from 'react-native-elements';
import { AppColor } from '@theme';
import { scaledSize, RNToast } from '@utils';
import { URL } from '@constant';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { AppointmentAction } from '@redux';
import ZoomUs from 'react-native-zoom-us';

// import {ZoomUs} from '@modules'

const AppointmentListVideo = ({ showAppointmentDetail }) => {
  const [page, setPage] = React.useState(1);
  const { listAppointmentVideo, isLoading, totalAppointmentVideo } = useSelector(
    (state) => state.appointment
  );
  const { userProfile } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(AppointmentAction.getListAppointmentVideo(1));
  }, []);

  const joinMeeting = async (meetingId) => {
    let fullName = '';
    if (userProfile.firstname) {
      fullName = fullName + userProfile.firstname + ' ';
    }
    if (userProfile.lastname) {
      fullName = fullName + userProfile.lastname;
    }
    try {
      const joinMeetingResult = await ZoomUs.joinMeeting({
        userName: fullName,
        meetingNumber: meetingId,
        password: "123456",
      });

      console.log({joinMeetingResult});
    } catch (e) {
      Alert.alert('Error', 'Could not execute joinMeeting');
      console.error(e);
    }
  };


  const _renderItem = ({item}) => {
    const data = item;
    const meetingId = data.meetingId
    let avatarUrl = '';
    if (data.patientId) {
      if (data.patientId.avatar) {
        const filename = data.patientId.avatar.path.split('uploads/')[1];
        avatarUrl = URL.host + '/resources/' + filename;
      }
    }
    const thirtyMinutes = 1800000;
    const timeNow = Date.now();
    const appointmentDate = data.appointmentDate;
    let isShowButtonStartVideo = false;
    if (timeNow - appointmentDate > 0 ) {
      if(timeNow - appointmentDate < thirtyMinutes){
        isShowButtonStartVideo = true;
      }
    }
    if (appointmentDate - timeNow > 0) {
      if (appointmentDate - timeNow < thirtyMinutes) {
        isShowButtonStartVideo = true;
      }
    }
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: AppColor.white,
          borderWidth: scaledSize(0.1),
          borderColor: '#d1d1d1',
          marginVertical: scaledSize(5)
        }}
        onPress={() => {
          showAppointmentDetail(data);
          dispatch(AppointmentAction.chooseAppointItem(data));
        }}>
        <View
          style={{
            width: '100%',
            borderBottomColor: '#d7d7d9',
            borderBottomWidth: scaledSize(0.1)
          }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: scaledSize(16)
            }}>
            <Text style={{ fontWeight: '500', fontSize: scaledSize(13) }}>
              {moment(data.appointmentDate).format('DD/MM/yyyy HH:mm')}
            </Text>
            {data.patientState === 'New' && (
              <Text style={{ fontWeight: '500', fontSize: scaledSize(13), color: 'blue' }}>
                Chờ xác nhận
              </Text>
            )}
            {data.patientState === 'Examined' && (
              <Text
                style={{ fontWeight: '500', fontSize: scaledSize(13), color: AppColor.color_main }}>
                Đã khám
              </Text>
            )}
            {data.patientState === 'Rescheduled' && (
              <Text style={{ fontWeight: '500', fontSize: scaledSize(13), color: '#cfab1f' }}>
                Đã đặt lại lịch
              </Text>
            )}
            {data.patientState === 'Cancelled' && (
              <Text style={{ fontWeight: '500', fontSize: scaledSize(13), color: 'red' }}>
                Đã huỷ lịch
              </Text>
            )}
            {data.patientState === 'Confirmed' && (
              <Text style={{ fontWeight: '500', fontSize: scaledSize(13), color: 'green' }}>
                Đã xác nhận
              </Text>
            )}
          </View>
        </View>
        <View style={{ flex: 1, padding: scaledSize(16), flexDirection: 'row' }}>
          {data.patientId.avatar && data.patientId.avatar.path ? (
            <Avatar
              source={{ uri: avatarUrl }}
              size={86}
              rounded
              containerStyle={{ backgroundColor: AppColor.color_main }}
            />
          ) : (
            <Avatar
              title={data.patientId && data.patientId.name ? data.patientId.name.split('')[0] : 'U'}
              size={86}
              rounded
              containerStyle={{ backgroundColor: AppColor.color_main }}
            />
          )}
          <View style={{ flex: 1, flexDirection: 'column', marginLeft: scaledSize(20) }}>
            <Text style={{ fontWeight: '800', fontSize: scaledSize(17) }}>
              {data.patientId.name}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: scaledSize(6) }}>
              <Icon name="call-outline" type="ionicon" size={20} />
              <Text style={{ color: AppColor.color_main, marginLeft: scaledSize(6) }}>
                {data.phone}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: scaledSize(6) }}>
              <Icon name="document-text-outline" type="ionicon" size={20} />
              <Text style={{ color: '#222', marginLeft: scaledSize(6) }}>{data.reason}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: scaledSize(6) }}>
              <Icon name="time-outline" type="ionicon" size={20} />
              <Text style={{ color: AppColor.grey, marginLeft: scaledSize(6) }}>
                {data.sessionDuration ? data.sessionDuration : 0} phút
              </Text>
            </View>
            {/* && isShowButtonStartVideo */}
            {/* {(data.patientState === 'Confirmed' && isShowButtonStartVideo ) && ( */}
              <TouchableOpacity
                style={{
                  marginTop: scaledSize(20),
                  flexDirection: 'row',
                  borderColor: AppColor.color_main,
                  paddingHorizontal: scaledSize(10),
                  paddingVertical: scaledSize(5),
                  width: '70%',
                  borderWidth: 0.5,
                  alignItems:'center'
                }}
                onPress={() =>joinMeeting(meetingId)}
                >
                <Icon name="videocam" type="ionicon" color={AppColor.color_main} size={20} />
                <Text
                  style={{
                    marginLeft: scaledSize(10),
                    fontSize: scaledSize(13),
                    color: AppColor.color_main,
                    fontWeight:'500'
                  }}>
                  Bắt đầu video
                </Text>
              </TouchableOpacity>
            {/* )} */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const onRefresh = React.useCallback(() => {
    dispatch(AppointmentAction.getListAppointmentVideo(1));
  }, []);
  const renderListAppointmentVideo = () => {
    return (
      <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
        style={{
          flex: 1,
          width: '100%',
          paddingHorizontal: scaledSize(10),
          paddingVertical: scaledSize(10)
        }}
        data={listAppointmentVideo}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => 'key' + index}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>Hiện tại chưa có cuộc hẹn</Text>
          </View>
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          let newPage = page + 1;
          setPage(newPage);
          if (totalAppointmentVideo - listAppointmentVideo.length > 0 && !isLoading) {
            dispatch(AppointmentAction.fetchMoreAppointmentVideo(newPage));
          } else {
            return;
          }
        }}
      />
    );
  };

  return <View style={styles.container}>{renderListAppointmentVideo()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default AppointmentListVideo;
