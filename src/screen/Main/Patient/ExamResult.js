import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { scaledSize } from '@utils';
import { AppColor } from '@theme';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { API } from '@services';
import { SiteMap } from '@navigation';
import { ScreenName } from '@constant';
import {Header} from  '@component';
import I18n from "@locale";

import moment from 'moment';
const ExamResult = ({ route, navigation }) => {
  const { patientInfo } = route.params;
  const [isLoading, setLoading] = React.useState(false);
  const [examResult, setExamResult] = React.useState(null);
  const [total, setTotal] = React.useState(null);
  React.useEffect(() => {
    setLoading(true);
    API.getExamResultOfPatient(patientInfo._id)
      .then((res) => {
        console.log('Res exam result: ', res);
        if (res.status === 200) {
          const data = res.data;
          setLoading(false);
          setExamResult(data.docs);
          setTotal(data.totalDocs);
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
        key={item.indexs}
        style={{
          flexDirection: 'row',
          width: '100%',
          borderBottomWidth: 0.3,
          paddingBottom: scaledSize(12),
          borderBottomColor: 'gray',
          alignItems: 'flex-start',
          paddingTop: scaledSize(12)
        }}
        onPress={() =>
          SiteMap.showScreen(navigation, ScreenName.EXAM_RESULT_DETAIL, { examInfo: data })
        }>
        <View style={{ flex: 0.3, justifyContent: 'flex-start' }}>
          <Text style={{ fontWeight: '400', color: AppColor.secondary }}>
            {moment(data.examDate).format('DD/MM/yyyy')}
          </Text>
        </View>

        <View style={{ flex: 0.3, justifyContent: 'flex-start', paddingHorizontal: scaledSize(2) }}>
          <Text style={{ fontWeight: '400', color: AppColor.secondary }}>
            {data.medicalCateId.medicalCateName}
          </Text>
        </View>
        <View style={{ flex: 0.3, justifyContent: 'flex-start', paddingHorizontal: scaledSize(2) }}>
          <Text style={{ fontWeight: '400', color: AppColor.secondary }}>{data.examResult}</Text>
        </View>
        <View style={{ flex: 0.1, justifyContent: 'flex-start' }}>
          <Icon name="chevron-forward" type="ionicon" size={22} color={AppColor.color_main} />
        </View>
      </TouchableOpacity>
    );
  };

  const _renderExamResult = () => {
    return (
      <View
        style={{
          marginTop: scaledSize(10),
          flex: 1,
          flexDirection: 'column',
          backgroundColor: AppColor.white,
          padding: scaledSize(12)
        }}>
       { examResult && examResult.length > 0 && <View
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
            <Text style={{ fontWeight: '500' }}>Tên xét nghiệm</Text>
          </View>
          <View style={{ flex: 0.3, justifyContent: 'flex-start' }}>
            <Text style={{ fontWeight: '500' }}>Kết quả</Text>
          </View>
        </View>}
        <FlatList
          style={{ flex: 1, width: '100%', paddingVertical: scaledSize(10) }}
          data={examResult}
          renderItem={(item, index) => _renderItem(item, index)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>{'Chưa có kết quả khám bệnh'}</Text>
            </View>
          )}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>

      <Header
          navigation
          title={I18n.t("exam_result")}
          isRightButton={false}
          isLeftButton={true}
          onPressLeftButton={() => navigation.goBack()}
          // rightIconName="add-circle"
        />
      {isLoading ? (
        <ActivityIndicator
          style={{ marginTop: scaledSize(20) }}
          animating={isLoading}
          size="large"
          color={AppColor.color_main}
        />
      ) : (
        <View style={{ backgroundColor: AppColor.background, flex: 1 }}>{_renderExamResult()}</View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white
  }
});

export default ExamResult;
