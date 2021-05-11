import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import { API } from '@services';
import { Avatar, Icon } from 'react-native-elements';
import { AppColor } from '@theme';
import { scaledSize,LocaleStorageManager } from '@utils';
import { URL } from '@constant';
import moment from 'moment';
import {AppointmentAction} from '@redux'
import {useDispatch,useSelector } from 'react-redux'


const AppointmentList = ({showAppointmentDetail}) => {
  // const [listAppointment, setListAppointment] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const {listAppointment,isLoading,totalAppointment} = useSelector(state => state.appointment) 
  const dispatch = useDispatch()
  
  React.useEffect(() => {
        dispatch(AppointmentAction.getListAppointment(1))
        getToken()
  }, []);
const getToken = async () =>{
  let token = await LocaleStorageManager.getAccessToken();
}
  

  const _renderItem = ({item}) => {
    const data = item;
    let avatarUrl = '';
    if(data.patientId){
      if (data.patientId.avatar) {
        if (data.patientId.avatar.path) {
          const filename = data.patientId.avatar.path.split('uploads/')[1];
          avatarUrl = URL.host + '/resources/' + filename;
        }
       
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
        onPress={() =>{
           showAppointmentDetail(data)
            dispatch(AppointmentAction.chooseAppointItem(data))
          }}
        >
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
            {data.patientState === "New" &&
              <Text style={{ fontWeight: '500', fontSize: scaledSize(13), color: "blue" }}>
                  Chờ xác nhận
                  </Text>
              }
               {data.patientState === "Examined" &&
              <Text style={{ fontWeight: '500', fontSize: scaledSize(13), color: AppColor.color_main }}>
                 Đã khám
                  </Text>
              }
               {data.patientState === "Rescheduled" &&
              <Text style={{ fontWeight: '500', fontSize: scaledSize(13), color: '#cfab1f' }}>
                  Đã đặt lại lịch
                  </Text>
              }
               {data.patientState === "Cancelled" &&
              <Text style={{ fontWeight: '500', fontSize: scaledSize(13), color: 'red' }}>
                  Đã huỷ lịch
                  </Text>
              }
               {data.patientState === "Confirmed" &&
              <Text style={{ fontWeight: '500', fontSize: scaledSize(13), color: "green" }}>
                  Đã xác nhận
                  </Text>
              }
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
            title={data.patientId && data.patientId.name ? data.patientId.name.split("")[0] : "U"}
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
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const onRefresh = React.useCallback(() => {
    dispatch(AppointmentAction.getListAppointment(1))
  }, []);
  const renderListAppointment = () => {
    return (
      <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
        style={{
          flex: 1,
          width: '100%',
          paddingHorizontal: scaledSize(10),
          paddingVertical: scaledSize(10)
        }}
        data={listAppointment}
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
          setPage(newPage)
          if (totalAppointment - listAppointment.length > 0 && !isLoading) {
            dispatch(AppointmentAction.fetchMoreAppointment(newPage))
          } else {
            return;
          }
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      {(isLoading && !listAppointment) ? (
        <ActivityIndicator
          style={{ marginTop: scaledSize(20) }}
          animating={isLoading}
          size="large"
          color={AppColor.color_main}
        />
      ) : (
        renderListAppointment()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default AppointmentList;
