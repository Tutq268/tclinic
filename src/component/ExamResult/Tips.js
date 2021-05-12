import React from 'react';
import { View, Text, StyleSheet,ScrollView,TextInput,KeyboardAvoidingView} from 'react-native';
import { ListItem, Avatar, Button, Icon } from 'react-native-elements';
import { AppColor } from '@theme';
import { scaledSize } from '@utils';
import { ButtonText } from '@component';


const Tips = ({ medicalIndex }) => {

  const [clinicalExamination,setClinicalExamination] = React.useState('')
  const [treatment,setTreatment] = React.useState('')
  const [supportMethod,setSupportMethod] = React.useState('')
  const [examAgain,setExamAgain] = React.useState('')
  const [arrError, setArrError] = React.useState([]);

  const handleAddMedicalIndex = () => {
    let err = [];
    if (clinicalExamination === '') err.push('clinicalExamination');
    if (supportMethod === '') err.push('supportMethod');

    if (err.length > 0) {
      setArrError(err);
    } else {
      const medical = {
        clinicalExamination,
        treatment,
        supportMethod,
        examAgain
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
          <Text style={{ fontSize: scaledSize(14) }}>Khám lâm sàng</Text>
          <TextInput
            style={styles.inputForm}
            value={clinicalExamination}
            onChangeText={(text) => {
              if (arrError.includes('clinicalExamination')) {
                clearError('clinicalExamination');
              }
              setClinicalExamination(text);
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
               setTreatment(text);
             }}
           />
        
        </View>
        <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
          <Text style={{ fontSize: scaledSize(14) }}>Phương pháp hỗ trợ</Text>
          <TextInput
            style={styles.inputForm}
            value={supportMethod}
            onChangeText={(text) => {
              if (arrError.includes('supportMethod')) {
                clearError('supportMethod');
              }
              setSupportMethod(text);
            }}
          />
          {arrError.includes('supportMethod') && (
            <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
        </View>
        <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
          <Text style={{ fontSize: scaledSize(14) }}>Hẹn khám lại</Text>
          <TextInput
             style={styles.inputForm}
             value={examAgain}
             onChangeText={(text) => {
               setExamAgain(text);
             }}
           />
        
        </View>
        
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          margin: scaledSize(20),
          paddingBottom: scaledSize(20)
        }}>
          
          <ButtonText
            buttonStyle={{ paddingHorizontal: scaledSize(10), width: '100%' }}
            textStyle={{ fontWeight: '500' }}
            title="XÁC NHÂN"
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
export default Tips;
