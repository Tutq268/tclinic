import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator,RefreshControl,TouchableOpacity, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { scaledSize } from '@utils';
import { AppColor } from '@theme';
import { API } from '@services';
import moment from 'moment';
import { SiteMap } from "@navigation";
import { ScreenName } from '@constant';
import I18n from "@locale";
import { Header } from '@component';

const QuestionListScreen = ({navigation}) => {
  const [listQuestion, setListQuestion] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(null);
  const [firstLoad, setFirstLoad] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setFirstLoad(true);
    setLoading(true);
    API.getListQuestion(1)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          setListQuestion(data.data);
          setTotal(data.total);
          setFirstLoad(false);
          setLoading(false);
        }
      })
      .catch((err) => {
        setFirstLoad(false);
        setLoading(false);
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
          paddingHorizontal:scaledSize(16)
        }}
        onPress={() => SiteMap.showScreen(navigation,ScreenName.QUESTION_DETAIL,{listAnswer: item})}
        >
        <View
          style={{
            width: '100%',
            borderBottomColor: '#ebebeb',
            borderBottomWidth: scaledSize(0.1),
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
                <Text style={{color:'#404040',fontWeight:'500'}}>Từ: {data.patientExtra && data.patientExtra.name }</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const onRefresh = React.useCallback(() => {
    setLoading(true);
    API.getListQuestion(1)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          setListQuestion(data.data);
          setTotal(data.total);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log('err: ', err);
      });
  }, []);
  const renderListQuestion = () => {
    return (
      <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
        style={{
          flex: 1,
          width: '100%',
        //   paddingHorizontal: scaledSize(10),
        }}
        data={listQuestion}
        renderItem={(item, index) => _renderItem(item, index)}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>Bạn chưa có câu hỏi nào!</Text>
          </View>
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          let newPage = page + 1;
          if (total - listQuestion.length > 0 && !isLoading) {
            setLoading(true);
            API.getListQuestion(newPage)
              .then((res) => {
                if (res.status === 200) {
                  const data = res.data;
                  console.log("data: ",data)
                  const newListQuestion = listQuestion.concat(data.data);
                  setListQuestion(newListQuestion);
                  setLoading(false);
                  setPage(newPage);
                }
              })
              .catch((err) => {
                setLoading(false);
                console.log('Err: ', err);
              });
          } else {
            return;
          }
        }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <View
        style={{
          backgroundColor: AppColor.white,
          paddingVertical: scaledSize(10),
        }}>
        <Text
          style={{
            fontWeight: '600',
            fontSize: scaledSize(20),
            color: AppColor.color_main,
            paddingBottom: scaledSize(6),
            width: '100%',
            textAlign: 'center'
          }}>
          {I18n.t("list_question")}
        </Text>

       
      </View> */}
        <Header
        navigation
        title={I18n.t("list_question")}
        isRightButton={false}
        isLeftButton={false}
      />
      <View style={{flex:1,backgroundColor:AppColor.background}}>
      {firstLoad ? (
          <ActivityIndicator
            style={{ marginTop: scaledSize(20) }}
            animating={firstLoad}
            size="large"
            color={AppColor.color_main}
          />
        ) : (
          renderListQuestion()
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
export default QuestionListScreen;
