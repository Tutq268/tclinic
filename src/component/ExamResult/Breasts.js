import React from 'react';
import { View, Text, StyleSheet,ScrollView,TextInput,KeyboardAvoidingView} from 'react-native';
import { ListItem, Avatar, Button, Icon } from 'react-native-elements';
import { AppColor } from '@theme';
import { scaledSize } from '@utils';
import { SiteMap } from '@navigation';
import { ScreenName } from '@constant';
import { LocaleStorageManager } from '@utils';
import I18n from '@locale';
import moment from 'moment';
const Breasts = ({ medicalIndex }) => {

  const [breastHistory,setBreastHistory] = React.useState('')
  const [currentMenstrual,setCurrentMenstrual] = React.useState('')
  const [reasonForExam,setReasonForExam] = React.useState('')
  const [clinicalExamination,setClinicalExamination] = React.useState('')
  const [treatment,setTreatment] = React.useState('')
  const [arrError, setArrError] = React.useState([]);

  const handleAddMedicalIndex = () => {
    let err = [];
    if (breastHistory === '') err.push('breastHistory');
    if (currentMenstrual === '') err.push('currentMenstrual');
    if (reasonForExam === '') err.push('reasonForExam');
    if (clinicalExamination === '') err.push('clinicalExamination');
    if (treatment === '') err.push('treatment');
   
    if (err.length > 0) {
      setArrError(err);
    } else {
      const medical = {
        breastHistory,
        currentMenstrual,
        reasonForExam,
        clinicalExamination,
        treatment,
      };
      medicalIndex(medical)
    }
  };
  const clearError = (item) => {
    const newError = arrError.filter((i) => i !== item);
    setArrError(newError);
  };
  return (
    <KeyboardAvoidingView
    enabled={Platform.OS == 'ios'}
    behavior={'padding'}
    style={{flex: 1}}>
    <ScrollView
      keyboardShouldPersistTaps="always"
      style={styles.container}>
      <View
        style={{
          marginTop: scaledSize(16),
          paddingHorizontal: scaledSize(16),
          flexDirection: 'column',
         backgroundColor:AppColor.white
        }}>
        <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
          <Text style={{ fontSize: scaledSize(14) }}>Tiền sử các bệnh về vú</Text>
          <TextInput
            style={styles.inputForm}
            value={breastHistory}
            onChangeText={(text) => {
              if (arrError.includes('breastHistory')) {
                clearError('breastHistory');
              }
              setWeight(text);
            }}
          />
          {arrError.includes('breastHistory') && (
            <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
          )}
        </View>

        <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
          <Text style={{ fontSize: scaledSize(14) }}>Tình trạng kinh nguyệt hiện tại</Text>
          <TextInput
            style={styles.inputForm}
            value={currentMenstrual}
            onChangeText={(text) => {
              if (arrError.includes('currentMenstrual')) {
                clearError('currentMenstrual');
              }
              setWeight(text);
            }}
          />
          {arrError.includes('currentMenstrual') && (
            <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
          )}
        </View>
        <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
          <Text style={{ fontSize: scaledSize(14) }}>Lý do đến khám</Text>
          <TextInput
            style={styles.inputForm}
            value={reasonForExam}
            onChangeText={(text) => {
              if (arrError.includes('reasonForExam')) {
                clearError('reasonForExam');
              }
              setWeight(text);
            }}
          />
          {arrError.includes('reasonForExam') && (
            <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
          )}
        </View>
        <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
          <Text style={{ fontSize: scaledSize(14) }}>Khám lâm sàng</Text>
          <TextInput
            style={styles.inputForm}
            value={clinicalExamination}
            onChangeText={(text) => {
              if (arrError.includes('clinicalExamination')) {
                clearError('clinicalExamination');
              }
              setWeight(text);
            }}
          />
          {arrError.includes('clinicalExamination') && (
            <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
          )}
        </View>

        <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
          <Text style={{ fontSize: scaledSize(14) }}>Điều trị</Text>
          <TextInput
            style={styles.inputForm}
            value={treatment}
            onChangeText={(text) => {
              if (arrError.includes('treatment')) {
                clearError('treatment');
              }
              setWeight(text);
            }}
          />
          {arrError.includes('treatment') && (
            <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          margin: scaledSize(20),
          paddingBottom: scaledSize(20)
        }}>
          <Button
            title="XÁC NHẬN"
            type="clear"
            containerStyle={{
              width: '100%',
              paddingHorizontal: scaledSize(6),
              borderWidth: 0.5,
              marginLeft: scaledSize(10),
              backgroundColor: AppColor.color_main
            }}
            titleStyle={{ color: AppColor.white, fontSize: scaledSize(13), fontWeight: '500' }}
            onPress={() => handleAddMedicalIndex()}
          />
      </View>
    </ScrollView>

    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputForm: {
    paddingVertical: scaledSize(8),
    paddingHorizontal: scaledSize(10),
    marginTop: scaledSize(10),
    borderWidth: 0.3,
    borderColor: '#ababab',
    width: '100%',
    backgroundColor: AppColor.white,
    fontSize: scaledSize(14)
  }
});
export default Breasts;
