import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,SafeAreaView } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { scaledSize } from '@utils';
import { AppColor } from '@theme';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { SiteMap } from '@navigation';
import { ScreenName } from '@constant';
import I18n from "@locale";
import { Header } from '@component';

const PatientInfoScreen = ({ route, navigation }) => {
  const { patientInfo } = route.params;
  const _renderPatientInfo = () => {
    let avatarUrl = '';
    if (patientInfo.avatar) {
      const filename = patientInfo.avatar.path?.split('uploads/')[1];
      avatarUrl = URL.host + '/resources/' + filename;
    }
    return (
      <View style={{ paddingTop: scaledSize(16), flexDirection: 'column' }}>
        <View
          style={{
            backgroundColor: AppColor.white,
            flexDirection: 'row',
            padding: scaledSize(16),
            alignItems: 'center'
          }}>
          {avatarUrl !== '' ? (
            <Avatar
              source={{ uri: avatarUrl }}
              size={86}
              rounded
              containerStyle={{ backgroundColor: AppColor.color_main }}
            />
          ) : (
            <Avatar
              title={patientInfo.name && patientInfo.name ? patientInfo.name.split('')[0] : 'U'}
              size={86}
              rounded
              containerStyle={{ backgroundColor: AppColor.color_main }}
            />
          )}
          <Text
            style={{
              color: AppColor.grey,
              fontSize: scaledSize(15),
              marginLeft: scaledSize(10),
              fontWeight: '600'
            }}>
            {patientInfo.name ? patientInfo.name : ''}
          </Text>
        </View>

        <View
          style={{
            padding: scaledSize(16),
            marginTop: scaledSize(16),
            backgroundColor: AppColor.white,
            flexDirection: 'column'
          }}>
          <View
            style={{
              paddingBottom: scaledSize(5),
              borderBottomColor: AppColor.grey,
              borderBottomWidth: 0.1
            }}>
            <Text style={{ fontWeight: '600', fontSize: scaledSize(13), color: AppColor.grey }}>
              Thông tin chi tiết
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              paddingTop: scaledSize(5),
              paddingRight: scaledSize(20)
            }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', flex: 0.3, alignItems: 'center' }}>
                <Icon name="location" type="ionicon" size={20} color={AppColor.grey} />
                <Text
                  style={{
                    marginLeft: scaledSize(5),
                    color: AppColor.grey,
                    fontSize: scaledSize(12)
                  }}>
                  Địa chỉ:
                </Text>
              </View>

              <View style={{ flex: 0.7 }}>
                <Text style={{ color: AppColor.grey }}>
                  {patientInfo.address ? patientInfo.address : ''}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: scaledSize(16) }}>
              <View style={{ flexDirection: 'row', flex: 0.3, alignItems: 'center' }}>
                <Icon name="mail" type="ionicon" size={20} color={AppColor.grey} />
                <Text
                  style={{
                    marginLeft: scaledSize(5),
                    color: AppColor.grey,
                    fontSize: scaledSize(12)
                  }}>
                  Email:
                </Text>
              </View>

              <View style={{ flex: 0.7 }}>
                <Text style={{ color: AppColor.grey }}>
                  {patientInfo.email ? patientInfo.email : ''}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: scaledSize(16) }}>
              <View style={{ flexDirection: 'row', flex: 0.3, alignItems: 'center' }}>
                <Icon name="call" type="ionicon" size={20} color={AppColor.grey} />
                <Text
                  style={{
                    marginLeft: scaledSize(5),
                    color: AppColor.grey,
                    fontSize: scaledSize(12)
                  }}>
                  Điện thoại:
                </Text>
              </View>

              <View style={{ flex: 0.7 }}>
                <Text style={{ color: AppColor.grey }}>
                  {patientInfo.telephone ? patientInfo.telephone : ''}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const _renderMedicalInfo = () => {
    return (
      <View
        style={{
          marginTop: scaledSize(16),
          backgroundColor: AppColor.white,
          flexDirection: 'column',
          padding: scaledSize(16)
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: scaledSize(10),
            borderBottomColor: '#878787',
            borderBottomWidth: 0.5
          }}
          onPress={() =>
            SiteMap.showScreen(navigation, ScreenName.HEALTH_INDEX, { patientInfo: patientInfo })
          }>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="document"
              type="ionicon"
              size={20}
              color={AppColor.color_main}
              style={{
                backgroundColor: `rgba(78, 154, 230, 0.2)`,
                width: scaledSize(28),
                height: scaledSize(28),
                borderRadius: scaledSize(28),
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
            <Text
              style={{
                marginLeft: scaledSize(5),
                color: AppColor.color_main,
                fontSize: scaledSize(14),
                fontWeight: '500'
              }}>
              Hồ sơ sức khoẻ
            </Text>
          </View>
          <Icon name="chevron-forward" type="ionicon" size={26} color={AppColor.grey} />
        </TouchableOpacity>



        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: scaledSize(10),
            borderBottomColor: '#878787',
            borderBottomWidth: 0.5
          }}
          onPress={() =>  SiteMap.showScreen(navigation, ScreenName.PATIENT_EXAMRESULT, { patientInfo: patientInfo })}
          >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="medkit"
              type="ionicon"
              size={20}
              color={AppColor.color_main}
              style={{
                backgroundColor: `rgba(78, 154, 230, 0.2)`,
                width: scaledSize(28),
                height: scaledSize(28),
                borderRadius: scaledSize(28),
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
            <Text
              style={{
                marginLeft: scaledSize(5),
                color: AppColor.color_main,
                fontSize: scaledSize(14),
                fontWeight: '500'
              }}>
              Kết quả khám bệnh
            </Text>
          </View>
          <Icon name="chevron-forward" type="ionicon" size={26} color={AppColor.grey} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: scaledSize(10),
            borderBottomColor: '#878787',
            borderBottomWidth: 0.5
          }}
          onPress={() =>  SiteMap.showScreen(navigation, ScreenName.PATIENT_MEDICAL_HISTORY,  { patientInfo: patientInfo })}
          >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="bed"
              type="ionicon"
              size={20}
              color={AppColor.color_main}
              style={{
                backgroundColor: `rgba(78, 154, 230, 0.2)`,
                width: scaledSize(28),
                height: scaledSize(28),
                borderRadius: scaledSize(28),
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
            <Text
              style={{
                marginLeft: scaledSize(5),
                color: AppColor.color_main,
                fontSize: scaledSize(14),
                fontWeight: '500'
              }}
              >
              Lịch sử khám chữa bệnh
            </Text>
          </View>
          <Icon name="chevron-forward" type="ionicon" size={26} color={AppColor.grey} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: scaledSize(10),
            borderBottomColor: '#878787',
            borderBottomWidth: 0.5
          }}
          onPress={() =>  SiteMap.showScreen(navigation, ScreenName.PATIENT_PRESCRIPTION,  { patientInfo: patientInfo })}
          >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="bandage"
              type="ionicon"
              size={20}
              color={AppColor.color_main}
              style={{
                backgroundColor: `rgba(78, 154, 230, 0.2)`,
                width: scaledSize(28),
                height: scaledSize(28),
                borderRadius: scaledSize(28),
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
            <Text
              style={{
                marginLeft: scaledSize(5),
                color: AppColor.color_main,
                fontSize: scaledSize(14),
                fontWeight: '500'
              }}>
              Kê đơn thuốc
            </Text>
          </View>
          <Icon name="chevron-forward" type="ionicon" size={26} color={AppColor.grey} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: scaledSize(10),
            borderBottomColor: '#878787',
            borderBottomWidth: 0.5
          }}
          onPress={() =>  SiteMap.showScreen(navigation, ScreenName.PATIENT_QUESTION,  { patientInfo: patientInfo })}
          >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="chatbubbles"
              type="ionicon"
              size={20}
              color={AppColor.color_main}
              style={{
                backgroundColor: `rgba(78, 154, 230, 0.2)`,
                width: scaledSize(28),
                height: scaledSize(28),
                borderRadius: scaledSize(28),
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
            <Text
              style={{
                marginLeft: scaledSize(5),
                color: AppColor.color_main,
                fontSize: scaledSize(14),
                fontWeight: '500'
              }}>
              Câu hỏi tư vấn
            </Text>
          </View>
          <Icon name="chevron-forward" type="ionicon" size={26} color={AppColor.grey} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: scaledSize(10)
          }}
          onPress={() =>
            SiteMap.showScreen(navigation, ScreenName.CREATE_APPOINTMENT, { patientInfo: patientInfo,addFromPatientNavigation:true })
          }
          >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="add-circle"
              type="ionicon"
              size={20}
              color={AppColor.color_main}
              style={{
                backgroundColor: `rgba(78, 154, 230, 0.2)`,
                width: scaledSize(28),
                height: scaledSize(28),
                borderRadius: scaledSize(28),
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
            <Text
              style={{
                marginLeft: scaledSize(5),
                color: AppColor.color_main,
                fontSize: scaledSize(14),
                fontWeight: '500'
              }}>
              Đặt lịch khám
            </Text>
          </View>
          <Icon name="chevron-forward" type="ionicon" size={26} color={AppColor.grey} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
 
         <Header
        navigation
        title={I18n.t("patient_details")}
        isRightButton={false}
        isLeftButton={true}
        onPressLeftButton={() => navigation.goBack()}
      />
      <ScrollView style={{backgroundColor:AppColor.background}}>
        {_renderPatientInfo()}
        {_renderMedicalInfo()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:AppColor.white
  },
  textColorInfo: {
    color: '#666565'
  }
});

export default PatientInfoScreen;
