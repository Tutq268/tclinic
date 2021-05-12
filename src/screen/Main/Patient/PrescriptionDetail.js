import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView,SafeAreaView } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { scaledSize } from '@utils';
import { AppColor } from '@theme';
import { isIphoneX } from 'react-native-iphone-x-helper';
import moment from 'moment';
import API from '@services';
import I18n from '@locale';
import { Header } from '@component';

const PrescriptionDetail = ({ route, navigation }) => {
  const { prescriptionInfo } = route.params;
  const _renderPatientProfile = () => {
    return (
      <View
        style={{
          marginTop: scaledSize(16),
          padding: scaledSize(16),
          backgroundColor: AppColor.white,
          flexDirection: 'column'
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name="person"
            type="ionicon"
            size={18}
            color={AppColor.color_main}
            style={{
              backgroundColor: `rgba(78, 154, 230, 0.2)`,
              width: scaledSize(25),
              height: scaledSize(25),
              borderRadius: scaledSize(25),
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />
          <Text
            style={{
              marginLeft: scaledSize(10),
              fontSize: scaledSize(14),
              fontWeight: '500'
            }}>
            Thông tin bệnh nhân
          </Text>
        </View>
        <View style={{ marginTop: scaledSize(16), flexDirection: 'row' }}>
          <View style={{ flex: 0.3 }}>
            <Text style={{ fontSize: scaledSize(13) }}>Tên bệnh nhân:</Text>
          </View>
          <View style={{ flex: 0.7 }}>
            <Text style={{ fontSize: scaledSize(13) }}>
              {prescriptionInfo.patientId.name && prescriptionInfo.patientId.name}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: scaledSize(12), flexDirection: 'row' }}>
          <View style={{ flex: 0.3 }}>
            <Text style={{ fontSize: scaledSize(13) }}>Tuổi:</Text>
          </View>
          <View style={{ flex: 0.7 }}>
            <Text style={{ fontSize: scaledSize(13) }}>
              {prescriptionInfo.patientId.age && prescriptionInfo.patientId.age}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: scaledSize(12), flexDirection: 'row' }}>
          <View style={{ flex: 0.3 }}>
            <Text style={{ fontSize: scaledSize(13) }}>Giới tính:</Text>
          </View>
          <View style={{ flex: 0.7 }}>
            <Text style={{ fontSize: scaledSize(13) }}>
              {prescriptionInfo.patientId.gender && prescriptionInfo.patientId.gender}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: scaledSize(12), flexDirection: 'row' }}>
          <View style={{ flex: 0.3 }}>
            <Text style={{ fontSize: scaledSize(13) }}>Địa chỉ:</Text>
          </View>
          <View style={{ flex: 0.7 }}>
            <Text style={{ fontSize: scaledSize(13) }}>
              {prescriptionInfo.patientId.address && prescriptionInfo.patientId.address}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: scaledSize(12), flexDirection: 'row' }}>
          <View style={{ flex: 0.3 }}>
            <Text style={{ fontSize: scaledSize(13) }}>Nơi công tác:</Text>
          </View>
          <View style={{ flex: 0.7 }}>
            <Text style={{ fontSize: scaledSize(13) }}>57 huỳnh thúc kháng - hà nội</Text>
          </View>
        </View>
        <View style={{ marginTop: scaledSize(12), flexDirection: 'row' }}>
          <View style={{ flex: 0.3 }}>
            <Text style={{ fontSize: scaledSize(13) }}>Chuẩn đoán:</Text>
          </View>
          <View style={{ flex: 0.7 }}>
            <Text style={{ fontSize: scaledSize(13) }}>
              {prescriptionInfo.prescriptionNote && prescriptionInfo.prescriptionNote}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const _renderItem = (item, index) => {
    const data = item.item;
    return (
      <View
        key={item.index}
        style={{
          flexDirection: 'column',
          marginTop: scaledSize(16),
          borderBottomWidth: 0.3,
          borderBottomColor: 'gray',
          paddingBottom: scaledSize(10)
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            paddingBottom: scaledSize(10),
            alignItems: 'flex-start'
          }}>
          <View style={{ flex: 0.1, justifyContent: 'flex-start' }}>
            <Text style={{ fontWeight: '500' }}>{item.index + 1}</Text>
          </View>
          <View style={{ flex: 0.5, justifyContent: 'flex-start' }}>
            <Text style={{ fontWeight: '500' }}>{data.drugCateId.tenhh}</Text>
          </View>
          <View style={{ flex: 0.2, justifyContent: 'flex-start' }}>
            <Text style={{ fontWeight: '500' }}>{data.drugCateId.tendonvitinh}</Text>
          </View>
          <View style={{ flex: 0.2, justifyContent: 'flex-start' }}>
            <Text style={{ fontWeight: '500' }}>{data.quantity}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <View style={{ flex: 0.1 }}></View>
          <View
            style={{
              flex: 0.9,
              backgroundColor: 'rgba(193, 204, 110,0.6)',
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingHorizontal: scaledSize(16),
              borderWidth: 0.5,
              borderStyle: 'dashed'
            }}>
            <Text
              style={{
                fontSize: scaledSize(13),
                fontStyle: 'italic',
                color: 'gray',
                paddingVertical: scaledSize(6)
              }}>
              {data.howtouse}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const _renderPrescriptionDetail = () => {
    return (
      <View
        style={{
          marginTop: scaledSize(16),
          padding: scaledSize(16),
          flexDirection: 'column',
          backgroundColor: AppColor.white
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name="medical"
            type="ionicon"
            size={18}
            color={AppColor.color_main}
            style={{
              backgroundColor: `rgba(78, 154, 230, 0.2)`,
              width: scaledSize(25),
              height: scaledSize(25),
              borderRadius: scaledSize(25),
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />
          <Text
            style={{
              marginLeft: scaledSize(10),
              fontSize: scaledSize(14),
              fontWeight: '500'
            }}>
            Thông tin thuốc kê đơn
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            borderBottomWidth: 0.3,
            paddingBottom: scaledSize(10),
            borderBottomColor: 'gray',
            alignItems: 'flex-start',
            marginTop: scaledSize(16)
          }}>
          <View style={{ flex: 0.1, justifyContent: 'flex-start' }}>
            <Text style={{ fontWeight: '500' }}>STT</Text>
          </View>
          <View style={{ flex: 0.5, justifyContent: 'flex-start' }}>
            <Text style={{ fontWeight: '500' }}>Tên thuốc</Text>
          </View>
          <View style={{ flex: 0.2, justifyContent: 'flex-start' }}>
            <Text style={{ fontWeight: '500' }}>ĐVT</Text>
          </View>
          <View style={{ flex: 0.2, justifyContent: 'flex-start' }}>
            <Text style={{ fontWeight: '500' }}>Số lượng</Text>
          </View>
        </View>
        <FlatList
          style={{ width: '100%', paddingVertical: scaledSize(10) }}
          data={prescriptionInfo.drugs}
          renderItem={(item, index) => _renderItem(item, index)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={{ marginTop: scaledSize(10) }}>
          <Text style={{ fontWeight: '500', fontStyle: 'italic', fontSize: scaledSize(13) }}>
            Lời dặn: {prescriptionInfo.prescriptionNote}
          </Text>
        </View>
      </View>
    );
  };

  const _renderDoctorInfo = () => {
    return (
      <View
        style={{
          marginTop: scaledSize(16),
          padding: scaledSize(16),
          backgroundColor: AppColor.white,
          flexDirection: 'column',
          alignItems: 'flex-end'
        }}>
        <Text style={{ fontStyle: 'italic', fontSize: scaledSize(13), color: 'gray' }}>
          Ngày {moment(prescriptionInfo.createdAt).format('DD')} tháng{' '}
          {moment(prescriptionInfo.createdAt).format('MM')} năm{' '}
          {moment(prescriptionInfo.createdAt).format('yyyy')}
        </Text>
        <Text
          style={{
            fontSize: scaledSize(13),
            color: 'grey',
            marginTop: scaledSize(16),
            marginRight: scaledSize(16)
          }}>
          Bác sĩ điều trị
        </Text>
        <Text style={{ fontSize: scaledSize(13), marginTop: scaledSize(36) }}>
          {prescriptionInfo.createdBy.name}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>


      <Header
        navigation
        title={I18n.t('medical_prescription')}
        isRightButton={false}
        isLeftButton={true}
        onPressLeftButton={() => navigation.goBack()}
        // rightIconName="add-circle"
      />
      <ScrollView style={{ backgroundColor: AppColor.background }}>
        {_renderPatientProfile()}
        {_renderPrescriptionDetail()}
        {_renderDoctorInfo()}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white
  }
});

export default PrescriptionDetail;
