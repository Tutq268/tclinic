import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { scaledSize } from '@utils';
import { AppColor } from '@theme';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { API } from '@services';
import { SiteMap } from '@navigation';
import moment from 'moment';
import { ScreenName } from '@constant';
import I18n from '@locale';
import { Header } from '@component';

const Question = ({ route, navigation }) => {
  const { patientInfo } = route.params;
  const [listQuestion, setListQuestion] = React.useState(null);
  const [total, setTotal] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    API.getPatientQuestion(patientInfo._id)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          setListQuestion(data.data);
          setTotal(data.total);
          setLoading(false);
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
        style={{
          flex: 1,
          backgroundColor: AppColor.white,
          marginVertical: scaledSize(5),
          paddingHorizontal: scaledSize(16)
        }}
        onPress={() =>
          SiteMap.showScreen(navigation, ScreenName.QUESTION_DETAIL, { listAnswer: item })
        }>
        <View
          style={{
            width: '100%',
            borderBottomColor: '#ebebeb',
            borderBottomWidth: scaledSize(0.1)
          }}>
          <View
            style={{
              width: '100%',
              padding: scaledSize(8)
            }}>
            <Text style={{ textAlign: 'right', color: 'grey' }}>
              Lúc: {moment(data.createdAt).format(' HH:mm-DD/MM/yyyy')}{' '}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingVertical: scaledSize(8),
            justifyContent: 'space-between'
          }}>
          <Icon name="chatbubbles" type="ionicon" size={25} color="grey" />
          <View
            style={{
              flex: 1,
              paddingLeft: scaledSize(16),
              paddingTop: scaledSize(3),
              flexDirection: 'column',
              justifyContent: 'flex-start'
            }}>
            <View
              style={{
                paddingBottom: scaledSize(10),
                borderBottomColor: '#ebebeb',
                borderBottomWidth: scaledSize(0.1)
              }}>
              <Text
                style={{
                  fontSize: scaledSize(14),
                  color: '#404040',
                  fontWeight: '500'
                }}>
                {data.title}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: scaledSize(8)
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="chatbox-ellipses" type="ionicon" size={18} color="grey" />
                <Text
                  style={{
                    fontSize: scaledSize(12),
                    color: 'grey',
                    fontWeight: '500',
                    paddingLeft: scaledSize(5)
                  }}>
                  {data.answers.length}
                </Text>
              </View>
              <View>
                <Text style={{ color: '#404040', fontWeight: '500' }}>
                  Từ: {data.patientExtra && data.patientExtra.name}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderQuestion = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          width: '100%'
          //   paddingHorizontal: scaledSize(10),
        }}
        data={listQuestion}
        renderItem={(item, index) => _renderItem(item, index)}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '500',marginTop:scaledSize(18) }}>Bạn chưa có câu hỏi nào!</Text>
          </View>
        )}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation
        title={I18n.t('Consultation_question')}
        isRightButton={false}
        isLeftButton={true}
        onPressLeftButton={() => navigation.goBack()}
      />
      <View style={{ backgroundColor: AppColor.background, flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator
            style={{ marginTop: scaledSize(20) }}
            animating={isLoading}
            size="large"
            color={AppColor.color_main}
          />
        ) : (
          _renderQuestion()
        )}
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

export default Question;
