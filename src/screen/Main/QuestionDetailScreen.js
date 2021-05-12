import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  Keyboard,
  SafeAreaView
} from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { scaledSize, RNToast } from '@utils';
import { AppColor } from '@theme';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { URL } from '@constant';
import moment from 'moment';
import { LocaleStorageManager } from '@utils';
import { API } from '@services';
import I18n from '@locale';
import { Header } from '@component';

const QuestionDetailScreen = ({ route, navigation }) => {
  const { listAnswer } = route.params;
  const [questionItem, setQuestionItem] = React.useState(listAnswer.item);
  const [isLoading, setLoading] = React.useState(false);
  const [answer, setAnswer] = React.useState('');
  const _renderAnswer = (data) => {

    const doctorInfo = questionItem.askToDoctorExtra;
    console.log("doctor info: ",doctorInfo)
    let avatarDoctor = '';
    if (doctorInfo.avatarFull) {
      if (doctorInfo.avatarFull[0].path) {
        const filename =  doctorInfo.avatarFull[0].path.split('uploads/')[1];
        avatarDoctor = URL.host + '/resources/' + filename;
      }
    }

    return (
      <View style={{ flexDirection: 'column' }}>
        {data.map((value, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                paddingVertical: scaledSize(12),
                borderBottomColor: '#ebebeb',
                borderBottomWidth: scaledSize(0.1)
              }}>
              {avatarDoctor !== '' ? (
                <Avatar
                  source={{ uri: avatarDoctor }}
                  size={50}
                  containerStyle={{ backgroundColor: AppColor.color_main }}
                />
              ) : (
                <Avatar
                  title={doctorInfo.name ? doctorInfo.name.split('')[0] : 'U'}
                  size={50}
                  containerStyle={{ backgroundColor: AppColor.color_main }}
                />
              )}
              <View style={{ flexDirection: 'column', paddingHorizontal: scaledSize(10), flex: 1 }}>
                <Text
                  style={{
                    fontSize: scaledSize(14),
                    color: AppColor.grey,
                    marginBottom: scaledSize(3)
                  }}>
                  {doctorInfo.name && doctorInfo.name}
                </Text>
                <Text
                  style={{ fontSize: scaledSize(14), color: 'grey', marginBottom: scaledSize(8) }}>
                  {moment(value.createdAt).format('HH:mm - DD/MM/yyyy')}
                </Text>
                <View
                  style={{
                    backgroundColor: 'rgba(51, 98, 105,0.1)',
                    padding: scaledSize(8),
                    borderRadius: scaledSize(2),
                    width: '100%'
                  }}>
                  {/* <Text>{value.content}</Text> */}
                  <Text style={{ fontSize: scaledSize(14), color: '#808080', lineHeight: 25 }}>
                    Tăng huyết áp thứ phát(Tăng huyết áp là triệu chứng của một số bệnh khác): Liên
                    quan đến một số bệnh trên thận, động mạch, bệnh van tim và một số bệnh nội tiết;
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const _renderFollowUp = (data) => {
    const patientInfo = questionItem.patientExtra;
    const avatarPatient = '';
    if (patientInfo.avatar) {
      if (patientInfo.avatar.path) {
        const filename = patientInfo.avatar.path.split('uploads/')[1];
        patientInfo = URL.host + '/resources/' + filename;
      }
    }

    return (
      <View style={{ flexDirection: 'column' }}>
        {data.map((value, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                paddingVertical: scaledSize(12),
                borderBottomColor: '#ebebeb',
                borderBottomWidth: scaledSize(0.1)
              }}>
              {avatarPatient !== '' ? (
                <Avatar
                  source={{ uri: avatarPatient }}
                  size={50}
                  containerStyle={{ backgroundColor: AppColor.color_main }}
                />
              ) : (
                <Avatar
                  title={patientInfo.name ? patientInfo.name.split('')[0] : 'U'}
                  size={50}
                  containerStyle={{ backgroundColor: AppColor.color_main }}
                />
              )}
              <View style={{ flexDirection: 'column', paddingHorizontal: scaledSize(10), flex: 1 }}>
                <Text
                  style={{
                    fontSize: scaledSize(14),
                    color: AppColor.grey,
                    marginBottom: scaledSize(3)
                  }}>
                  {patientInfo.name && patientInfo.name}
                </Text>
                <Text
                  style={{ fontSize: scaledSize(14), color: 'grey', marginBottom: scaledSize(8) }}>
                  {moment(value.createdAt).format('HH:mm - DD/MM/yyyy')}
                </Text>
                <View
                  style={{
                    backgroundColor: 'rgba(51, 98, 105,0.1)',
                    padding: scaledSize(8),
                    borderRadius: scaledSize(2),
                    width: '100%'
                  }}>
                  {/* <Text>{value.content}</Text> */}
                  <Text style={{ fontSize: scaledSize(14), color: '#808080', lineHeight: 25 }}>
                    Tăng huyết áp thứ phát(Tăng huyết áp là triệu chứng của một số bệnh khác): Liên
                    quan đến một số bệnh trên thận, động mạch, bệnh van tim và một số bệnh nội tiết;
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const _renderQuestionDetail = () => {
    const data = questionItem;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: AppColor.white,
          marginBottom: scaledSize(5),
          paddingHorizontal: scaledSize(16)
        }}>
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
          <Icon
            name="chatbubbles"
            type="ionicon"
            size={22}
            color="grey"
            style={{ marginTop: scaledSize(3) }}
          />
          <View
            style={{
              flex: 1,
              paddingLeft: scaledSize(10),
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
              <View
                style={{
                  marginTop: scaledSize(16),
                  backgroundColor: 'rgba(51, 98, 105,0.1)',
                  padding: scaledSize(8),
                  borderRadius: scaledSize(2),
                  width: '100%'
                }}>
                <Text style={{ fontSize: scaledSize(14), color: AppColor.grey }}>
                  {data.askContent}
                </Text>
              </View>
            </View>

            <ScrollView>
              {data.followups && _renderFollowUp(data.followups)}
              {data.answers && data.answers.length > 0 ? (
                _renderAnswer(data.answers)
              ) : (
                <View style={{ flex: 1, paddingTop: scaledSize(20) }}>
                  <Text style={{ fontSize: scaledSize(15), color: 'grey', fontWeight: '500' }}>
                    {I18n.t('no_answer')}
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  };

  const _handleComment = async () => {
    const doctorId = await LocaleStorageManager.getUserId();
    if (answer === '') {
      Alert.alert('Thông báp', 'Bạn chưa điền câu trả lời!');
    } else {
      const formData = new FormData();
      formData.append('content', answer);
      formData.append('type', 'reply');
      formData.append('targetId', questionItem._id);
      formData.append('createdBy', doctorId);
      try {
        setLoading(true);
        const resComment = await API.createComment(formData);
        if (resComment.status === 200) {
          setLoading(false);
          Keyboard.dismiss();
          const data = resComment.data.data;
          const message = resComment.data.message;
          const newQuestionItem = { ...questionItem, answers: questionItem.answers.concat(data) };
          setQuestionItem(newQuestionItem);
          setAnswer('');
          RNToast.showText(message);
        }
      } catch (error) {
        console.log('err: ', error);
      }
    }
  };
  const _rendeChatInput = () => {
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: scaledSize(38),
          paddingHorizontal: scaledSize(20),
          alignItems: 'center',
          paddingTop: scaledSize(10),
          backgroundColor: AppColor.white
        }}>
        <TextInput
          placeholder={I18n.t("write_answer")}
          placeholderTextColor="black"
          value={answer}
          multiline
          onChangeText={(text) => setAnswer(text)}
          style={{
            width: '80%',
            color: AppColor.grey,
            fontSize: scaledSize(15),
            borderBottomWidth: 0.3,
            paddingBottom: scaledSize(10),
            paddingHorizontal: scaledSize(5)
          }}
        />
        {isLoading ? (
          <ActivityIndicator animating={isLoading} />
        ) : (
          <TouchableOpacity onPress={() => _handleComment()}>
            <Text
              style={{ fontSize: scaledSize(15), color: AppColor.color_main, fontWeight: 'bold' }}>
              {I18n.t("send")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      behavior={Platform.select({ ios: 'padding', android: null })}
      style={{ flex: 1 }}>
      {/* <View
        style={{
          backgroundColor: AppColor.white,
          paddingTop: isIphoneX ? scaledSize(55) : scaledSize(10),
          paddingBottom: scaledSize(10),
          flexDirection: 'row'
        }}>
        <Icon
          name="chevron-back-outline"
          onPress={() => navigation.goBack()}
          type="ionicon"
          containerStyle={{ width: scaledSize(36) }}
        />
        <Text
          style={{
            marginRight: scaledSize(36),
            flex: 1,
            fontWeight: '600',
            fontSize: scaledSize(20),
            color: AppColor.color_main,
            paddingBottom: scaledSize(6),
            width: '100%',
            textAlign: 'center'
          }}>
          {I18n.t("content_question")}
        </Text>
      </View> */}
        <Header
        navigation
        title={I18n.t("content_question")}
        isRightButton={false}
        isLeftButton={true}
        onPressLeftButton={() => navigation.goBack()}
      />
      {_renderQuestionDetail()}
      {_rendeChatInput()}
    </KeyboardAvoidingView>
    </SafeAreaView>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:AppColor.white
  }
});

export default QuestionDetailScreen;
