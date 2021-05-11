import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { scaledSize } from '@utils';
import { AppColor } from '@theme';
import { API } from '@services';
import { icons } from '@constant';
import I18n from "@locale";
import { Header } from '@component';

const fitnessAndWellBeing = [
  {
    id: 0,
    title: 'Exercise'
  },
  {
    id: 1,
    title: 'Food'
  },
  {
    id: 2,
    title: 'Chiều cao'
  },
  {
    id: 3,
    title: 'Ngủ'
  },
  {
    id: 4,
    title: 'Số vòng eo'
  },
  {
    id: 5,
    title: 'Cân nặng'
  }
];

const HealthIndexScreen = ({ route, navigation }) => {
  const bloodIndicator = [
    {
      id: 0,
      icon: icons.bloodPresure,
      title: 'Huyết áp'
    },
    {
      id: 1,
      icon: icons.bloodSugar,
      title: 'Đường huyết'
    },
    {
      id: 2,
      icon: icons.bloodOxi,
      title: 'Mức ô xi'
    },
    {
      id: 3,
      icon: icons.bloodVessel,
      title: 'Mạch đập'
    },
    {
      id: 4,
      icon: icons.respo,
      title: 'Hô hấp'
    },
    {
      id: 5,
      icon: icons.temp,
      title: 'Nhiệt độ'
    }
  ];
  const { patientInfo } = route.params;
  const [patientHealth, setPatientHealth] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    API.getPatientProfileDashboard(patientInfo._id)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          console.log('data: ', data);
          setPatientHealth(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log('Err: ', err);
        setLoading(false);
      });
  }, []);

  const renderPatientHeathDashboard = () => {
    return (
      <ScrollView containerStyle={{ flex: 1, flexDirection: 'column' }}>
        <View
          style={{
            marginTop: scaledSize(16),
            backgroundColor: AppColor.white,
            flexDirection: 'column',
            width: '100%',
            padding: scaledSize(16)
          }}>
          <Text
            style={{ fontWeight: '500', fontSize: scaledSize(14), marginBottom: scaledSize(8) }}>
            Nhóm chỉ số sinh tồn
          </Text>
          {bloodIndicator.map((value, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: scaledSize(8),
                  borderBottomWidth: index < 5 ? 1 : 0,
                  borderBottomColor: index < 5 ? '#b5b5b5' : 'transparent',
                  paddingBottom: scaledSize(8)
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <Image
                    source={value.icon}
                    style={{
                      width: scaledSize(25),
                      height: scaledSize(25),
                      marginRight: scaledSize(10)
                    }}
                    resizeMode="contain"
                  />
                  <Text style={{ fontSize: scaledSize(13) }}>{value.title}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View
          style={{
            marginTop: scaledSize(16),
            backgroundColor: AppColor.white,
            flexDirection: 'column',
            width: '100%',
            padding: scaledSize(16)
          }}>
          <Text style={{ fontWeight: '500', fontSize: scaledSize(14) }}>Nhóm hồ sơ Lipid</Text>
          <Text
            style={{
              fontSize: scaledSize(13),
              paddingHorizontal: scaledSize(16),
              paddingTop: scaledSize(16)
            }}>
            Cholesterol
          </Text>
        </View>

        <View
          style={{
            marginTop: scaledSize(16),
            backgroundColor: AppColor.white,
            flexDirection: 'column',
            width: '100%',
            padding: scaledSize(16)
          }}>
          <Text style={{ fontWeight: '500', fontSize: scaledSize(14) }}>Các nhóm triệu chứng</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: scaledSize(16),
              paddingVertical: scaledSize(10),
              borderBottomWidth: 0.5,
              borderBottomColor: '#b5b5b5'
            }}>
            <Text style={{ fontSize: scaledSize(13) }}>Joint Stiffines</Text>
            <Icon name="chevron-forward-outline" type="ionicon" size={20} color="#8a8a8a" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: scaledSize(16),
              paddingVertical: scaledSize(10)
            }}>
            <Text style={{ fontSize: scaledSize(13) }}>Paint</Text>
            <Icon name="chevron-forward-outline" type="ionicon" size={20} color="#8a8a8a" />
          </View>
        </View>

        <View
          style={{
            marginTop: scaledSize(16),
            backgroundColor: AppColor.white,
            flexDirection: 'column',
            width: '100%',
            padding: scaledSize(16)
          }}>
          <Text style={{ fontWeight: '500', fontSize: scaledSize(14) }}>
            Fitness and Well-being
          </Text>
          {fitnessAndWellBeing.map((value, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingLeft: scaledSize(16),
                  paddingVertical: scaledSize(10),
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#b5b5b5'
                }}>
                <Text style={{ fontSize: scaledSize(13) }}>{value.title}</Text>
                <Icon name="chevron-forward-outline" type="ionicon" size={20} color="#8a8a8a" />
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  };
  return (
    <SafeAreaView style={styles.container}>

      <Header
        navigation
        title= {I18n.t("health_index")}
        isRightButton={false}
        isLeftButton={true}
        onPressLeftButton={() => navigation.goBack()}
      />
      <View style={{ backgroundColor: AppColor.background, flex: 1 }}>
        {renderPatientHeathDashboard()}
      </View>
      {/* {isLoading ? (
        <ActivityIndicator
          style={{ marginTop: scaledSize(20) }}
          animating={isLoading}
          size="large"
          color={AppColor.color_main}
        />
      ) : (
        renderPatientHeathDashboard()
      )} */}
      {/* <Text>123</Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white
  }
});

export default HealthIndexScreen;
