import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView
} from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { scaledSize } from '@utils';
import { AppColor } from '@theme';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { API } from '@services';
import moment from 'moment';
import { ScreenName } from '@constant';
import { SiteMap } from "@navigation";
import I18n from "@locale";
import { Header } from '@component';

const Prescription = ({ route, navigation }) => {
  const { patientInfo,newPrescription } = route.params;
  const [isLoading, setLoading] = React.useState(false);
  const [prescription, setPrescription] = React.useState(null);
  const [total, setTotal] = React.useState(null);

  React.useEffect(() =>{
    console.log("new: ",newPrescription)
    if(newPrescription){
      console.log("new 2: ",newPrescription)
      let newPrescriptionList = prescription.concat(newPrescription)
      console.log("new 3: ",newPrescriptionList)
      setPrescription(newPrescriptionList)
    }
  },[newPrescription])

  React.useEffect(() => {
    setLoading(true);
    API.getPrescription(patientInfo._id)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          setPrescription(data.data);
          setTotal(data.total);
          setLoading(false);
          console.log('data: ', data.data);
        }
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  }, []);

  const _renderItem = (item, index) => {
    const data = item.item;
    return (
      <TouchableOpacity
      onPress={() =>   SiteMap.showScreen(navigation, ScreenName.PRESCRIPTION_DETAIL, { prescriptionInfo: data })}
        key={item.indexs}
        style={{
          flexDirection: 'row',
          width: '100%',
          borderBottomWidth: 0.3,
          paddingBottom: scaledSize(10),
          marginTop:scaledSize(10),
          borderBottomColor: 'gray',
          alignItems: 'flex-start'
        }}>
        <View style={{ flex: 0.3, justifyContent: 'flex-start' }}>
          <Text style={{ fontWeight: '400' }}>{moment(data.createdAt).format('DD/MM/yyyy')}</Text>
        </View>
        <View style={{ flex: 0.3, justifyContent: 'flex-start' }}>
          <Text style={{ fontWeight: '400' }}>{data.createdBy.name && data.createdBy.name}</Text>
        </View>
        <View style={{ flex: 0.3, justifyContent: 'flex-start' }}>
          <Text style={{ fontWeight: '400' }}>{data.prescriptionName}</Text>
        </View>
        <View style={{ flex: 0.2, justifyContent: 'flex-start' }}>
          <Text style={{ fontWeight: '400' }}>{data.prescriptionNote}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const _renderPrescription = () => {
    return (
      <View
        style={{
          marginTop: scaledSize(10),
          flex: 1,
          flexDirection: 'column',
          backgroundColor: AppColor.white,
          padding: scaledSize(12)
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            borderBottomWidth: 0.3,
            paddingBottom: scaledSize(10),
            borderBottomColor: 'gray'
          }}>
          <View style={{ flex: 0.3, justifyContent: 'flex-start' }}>
            <Text style={{ fontWeight: '500' }}>Ngày tháng</Text>
          </View>
          <View style={{ flex: 0.3, justifyContent: 'flex-start' }}>
            <Text style={{ fontWeight: '500' }}>Người kê đơn</Text>
          </View>
          <View style={{ flex: 0.3, justifyContent: 'flex-start' }}>
            <Text style={{ fontWeight: '500' }}>Tên đơn thuốc</Text>
          </View>
          <View style={{ flex: 0.2, justifyContent: 'flex-start' }}>
            <Text style={{ fontWeight: '500' }}>Chú thích</Text>
          </View>
        </View>
        <FlatList
          style={{ flex: 1, width: '100%', paddingVertical: scaledSize(10) }}
          data={prescription}
          renderItem={(item, index) => _renderItem(item, index)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  const _renderEmtyView = () => {
    return (
      <View
        style={{
          marginTop: scaledSize(20),
          width: '100%',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center'
        }}>
        <Text style={{ fontSize: scaledSize(16), fontWeight: '500', color: 'grey' }}>
          Bệnh nhân chưa có đơn thuốc nào!
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
       <Header
        navigation
        title={I18n.t("list_prescription")}
        isRightButton={true}
        isLeftButton={true}
        onPressLeftButton={() => navigation.goBack()}
        onPress={() =>  SiteMap.showScreen(navigation,ScreenName.ADD_NEW_PRESCRIPTION,{patientInfo})}
        rightIconName="add-circle"
      />
          <View style={{backgroundColor:AppColor.background,flex:1}}>
          {isLoading ? (
        <ActivityIndicator
          style={{ marginTop: scaledSize(20) }}
          animating={isLoading}
          size="large"
          color={AppColor.color_main}
        />
      ) : prescription && prescription.length > 0 ? (
        _renderPrescription()
      ) : (
        _renderEmtyView()
      )}
          </View>

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:AppColor.white
  }
});

export default Prescription;
