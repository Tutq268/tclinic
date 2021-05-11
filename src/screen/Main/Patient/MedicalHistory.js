import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { scaledSize } from '@utils';
import { AppColor } from '@theme';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { API } from '@services';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import { round } from 'lodash';
import I18n from "@locale";
import { Header } from '@component';

const MedicalHistory = ({ route, navigation }) => {
  const { patientInfo } = route.params;
  const [listMedical, setListMedical] = React.useState(null);
  const [medicalItem, setMedicalItem] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  const [medicalChoose, setMedicalChoose] = React.useState(null);
  const [isOpenDrop1,setIsOpenDrop1] = React.useState(false)
  React.useEffect(() => {
    setLoading(true);
    API.getExamHistory(patientInfo.patientCode)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          setListMedical(data.data);
          const item = data.data[0].makcb;
          setMedicalChoose(data.data[0].makcb);
          API.getExamHistoryItem(item)
            .then((res) => {
              if (res.status === 200) {
                const data = res.data;
                setMedicalItem(data.data);
              }
              setLoading(false);
            })
            .catch((err) => {
              console.log('err: ', err);
            });
        }
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  }, []);

  const _renderMedicalHistoryPicker = () => {
    const dropdownValue = listMedical.map((item, index) => {
      return {
        label: item.makcb + ' - ' + moment(item.ngaydk).format('HH:mm, DD/MM/yyyy'),
        value: item._id,
        makcb: item.makcb
      };
    });
    return (
      <View
        style={{
          backgroundColor: AppColor.white,
          marginTop: scaledSize(16),
          padding: scaledSize(16),
          zIndex: 1000,
          minHeight: isOpenDrop1 ? 220 : 0
        }}>
        <View style={{ flexDirection: 'column', zIndex: 1000 }}>
          <Text
            style={{ fontWeight: '500', fontSize: scaledSize(14), marginBottom: scaledSize(10) }}>
            Mã KCB - Ngày ĐK
          </Text>
        </View>
        <DropDownPicker
          items={dropdownValue}
          labelStyle={{ fontSize: scaledSize(14), fontWeight: '400', color: AppColor.grey }}
          containerStyle={{ height: 42 }}
          itemStyle={{
            justifyContent: 'flex-start'
          }}
          onOpen={() => setIsOpenDrop1(true)}
          onClose={() => setIsOpenDrop1(false)}
          placeholder={dropdownValue[0].label}
          onChangeItem={(item) => {
            setMedicalChoose(item.makcb);
            API.getExamHistoryItem(item.makcb)
              .then((res) => {
                if (res.status === 200) {
                  const data = res.data;
                  setMedicalItem(data.data);
                }
                setLoading(false);
              })
              .catch((err) => {
                console.log('err: ', err);
              });
          }}
        />
      </View>
    );
  };
  const renderMedicalItem = () => {
    return (
      <ScrollView>
        {medicalItem.map((item, index) => {
          let paymentDetail = item.PaymentDetail;
          let sophieu = item.sophieu;
          return (
            <View
              key={index}
              style={{
                marginTop: scaledSize(16),
                flexDirection: 'column'
              }}>
              <View
                style={{
                  paddingVertical: scaledSize(5),
                  backgroundColor: '#c9c9c9',
                  padding: scaledSize(16)
                }}>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: scaledSize(14),
                    color: AppColor.color_main
                  }}>
                  Ngày {moment(item.ngay).format('DD/MM/yyyy')}
                </Text>
              </View>
              <View style={{ marginVertical: scaledSize(16), paddingHorizontal: scaledSize(16) }}>
                {paymentDetail.map((item2, index) => {
                  const serviceDetail = item2.ServiceDetail[0];
                  return (
                    <View
                      key={index}
                      style={{
                        width: '100%',
                        borderWidth: scaledSize(0.1),
                        borderColor: '#d1d1d1',
                        backgroundColor: AppColor.white,
                        marginVertical: scaledSize(8)
                      }}>
                      <View
                        style={{
                          width: '100%',
                          padding: scaledSize(8),
                          borderBottomColor: '#d7d7d9',
                          borderBottomWidth: scaledSize(0.1)
                        }}>
                        <Text style={{ fontWeight: '500', fontSize: scaledSize(13) }}>
                          {sophieu}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'column',
                          width: '100%',
                          padding: scaledSize(8)
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            // alignItems: 'center',
                            width: '100%'
                          }}>
                          <View style={{ flex: 0.4 }}>
                            <Text style={{ fontSize: scaledSize(14), fontWeight: '400' }}>
                              Nhóm dịch vụ:{' '}
                            </Text>
                          </View>
                          <View style={{ flex: 0.6 }}>
                            <Text
                              style={{
                                color: AppColor.color_main,
                                marginLeft: scaledSize(6),
                                fontSize: scaledSize(14),
                                flexWrap: 'wrap'
                              }}>
                              {serviceDetail.ServiceGroupDetail.tennhomdichvu}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: scaledSize(10),
                            width: '100%'
                          }}>
                          <View style={{ flex: 0.4 }}>
                            <Text style={{ fontSize: scaledSize(14), fontWeight: '400' }}>
                              Dịch vụ
                            </Text>
                          </View>
                          <View style={{ flex: 0.6 }}>
                            <Text
                              style={{
                                color: AppColor.color_main,
                                marginLeft: scaledSize(6),
                                fontSize: scaledSize(14),
                                flexWrap: 'wrap'
                              }}>
                              {serviceDetail.tendichvu}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: scaledSize(10),
                            width: '100%'
                          }}>
                          <View style={{ flex: 0.4 }}>
                            <Text style={{ fontSize: scaledSize(14), fontWeight: '400' }}>
                              Đơn giá
                            </Text>
                          </View>
                          <View style={{ flex: 0.6 }}>
                            <Text
                              style={{
                                color: AppColor.color_main,
                                marginLeft: scaledSize(6),
                                fontSize: scaledSize(14),
                                flexWrap: 'wrap'
                              }}>
                              {round(item2.dongia)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  };
  return (
    <SafeAreaView style={styles.container}>

       <Header
          navigation
          title={I18n.t("medical_history")}
          isRightButton={false}
          isLeftButton={true}
          onPressLeftButton={() => navigation.goBack()}
          // rightIconName="add-circle"
        />
      <View style={{ flex: 1, backgroundColor: AppColor.background }}>
        {isLoading ? (
          <ActivityIndicator
            style={{ marginTop: scaledSize(20) }}
            animating={isLoading}
            size="large"
            color={AppColor.color_main}
          />
        ) : (
          listMedical && <>{_renderMedicalHistoryPicker()}</>
        )}
        {medicalItem && renderMedicalItem()}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white
  }
});

export default MedicalHistory;
