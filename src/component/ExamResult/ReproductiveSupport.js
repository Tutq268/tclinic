import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import { ListItem, Avatar, Button, Icon } from 'react-native-elements';
import { AppColor } from '@theme';
import { scaledSize } from '@utils';
import { ButtonText } from '@component';
import DropDownPicker from 'react-native-dropdown-picker';

const ReproductiveSupport = ({ medicalIndex }) => {

  const evenlyMenstrualHistory = [
    {
      label: 'Đều',
      value: 1
    },
    {
      label: 'Không đều',
      value: 2
    }
  ];
  const [normalBorn, setNormalBorn] = React.useState('');
  const [caesarean, setCaesarean] = React.useState('');
  const [isEvenlyMenstrualHistory, setIsEvenlyMenstrualHistory] = React.useState(null);
  const [cycle, setCycle] = React.useState('');
  const [duringTime, setDuringTime] = React.useState('');
  const [currentMenstrual, setCurrentMenstrual] = React.useState('');
  const [reasonForExam, setReasonForExam] = React.useState('');
  const [vulvaAndPerineal, setVulvaAndPerineal] = React.useState('');
  const [cervical, setCervical] = React.useState('');
  const [uterusExtra, setUterusExtra] = React.useState('');
  const [otherSignal, setOtherSignal] = React.useState('');
  const [treatment, setTreatment] = React.useState('');
  const [supportMethod, setSupportMethod] = React.useState('');
  const [examAgain, setExamAgain] = React.useState('');
  const [arrError, setArrError] = React.useState([]);
  const [isOpenDrop1, setOpenDrop1] = React.useState(false);

  const handleAddMedicalIndex = () => {
    let err = [];
    if (normalBorn === '') err.push('normalBorn');
    if (caesarean === '') err.push('caesarean');
    if (cycle === '') err.push('cycle');
    if (duringTime === '') err.push('duringTime');
    if (currentMenstrual === '') err.push('currentMenstrual');
    if (reasonForExam === '') err.push('reasonForExam');
    if (vulvaAndPerineal === '') err.push('vulvaAndPerineal');
    if (cervical === '') err.push('cervical');
    if (uterusExtra === '') err.push('uterusExtra');
    if (supportMethod === '') err.push('supportMethod');
    if (examAgain === '') err.push('examAgain');
    if (!isEvenlyMenstrualHistory) err.push('isEvenlyMenstrualHistory');


    if (err.length > 0) {
      setArrError(err);
    } else {
      const medical = {
        normalBorn,
        caesarean,
        isEvenlyMenstrualHistory,
        cycle,
        duringTime,
        currentMenstrual,
        reasonForExam,
        vulvaAndPerineal,
        cervical,
        uterusExtra,
        otherSignal,
        treatment,
        supportMethod,
        examAgain
      };
      medicalIndex(medical);
    }
  };
  const clearError = (item) => {
    const newError = arrError.filter((i) => i !== item);
    setArrError(newError);
  };
  return (
    <KeyboardAvoidingView enabled={Platform.OS == 'ios'} behavior={'padding'} style={{ flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <View
          style={{
            marginTop: scaledSize(16),
            paddingHorizontal: scaledSize(16),
            flexDirection: 'column',
            backgroundColor: AppColor.white
          }}>
          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Đẻ thường</Text>
            <TextInput
              style={styles.inputForm}
              value={normalBorn}
              keyboardType="numeric"
              onChangeText={(text) => {
                if (arrError.includes('normalBorn')) {
                  clearError('normalBorn');
                }
                setNormalBorn(text);
              }}
            />
            {arrError.includes('normalBorn') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>

          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Đẻ mổ</Text>
            <TextInput
              style={styles.inputForm}
              value={caesarean}
              keyboardType="numeric"
              onChangeText={(text) => {
                if (arrError.includes('caesarean')) {
                  clearError('caesarean');
                }
                setCaesarean(text);
              }}
            />
            {arrError.includes('caesarean') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>
     
          <View
            style={{
              flexDirection: 'column',
              marginTop: scaledSize(16),
              zIndex: 1000,
              minHeight: isOpenDrop1 ? 150 : 0
            }}>
            <Text style={{ fontSize: scaledSize(14) }}>Tiền sử kinh nguyệt</Text>

            <DropDownPicker
              onOpen={() => setOpenDrop1(true)}
              onClose={() => setOpenDrop1(false)}
              items={evenlyMenstrualHistory}
              labelStyle={{
                fontSize: scaledSize(14),
                fontWeight: '400',
                color: AppColor.grey
              }}
              containerStyle={{ height: 42, marginTop: scaledSize(16) }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              placeholder="Chọn"
              onChangeItem={(item) => {
                if (arrError.includes('isEvenlyMenstrualHistory')) {
                  clearError('isEvenlyMenstrualHistory');
                }
                setIsEvenlyMenstrualHistory(item.value);
              }}
            />
            {arrError.includes('isEvenlyMenstrualHistory') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>
          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Chu kỳ kinh nguyệt</Text>
            <TextInput
              style={styles.inputForm}
              value={cycle}
              onChangeText={(text) => {
                if (arrError.includes('cycle')) {
                  clearError('cycle');
                }
                setCycle(text);
              }}
            />
            {arrError.includes('cycle') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>

          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Thời gian hành kinh</Text>
            <TextInput
              style={styles.inputForm}
              value={duringTime}
              onChangeText={(text) => setTestResult(text)}
              onChangeText={(text) => {
                if (arrError.includes('duringTime')) {
                  clearError('duringTime');
                }
                setDuringTime(text);
              }}
            />
            {arrError.includes('duringTime') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>

          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Kinh nguyệt hiện tại</Text>
            <TextInput
              style={styles.inputForm}
              value={currentMenstrual}
              onChangeText={(text) => {
                if (arrError.includes('currentMenstrual')) {
                  clearError('currentMenstrual');
                }
                setCurrentMenstrual(text);
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
                setReasonForExam(text);
              }}
            />
            {arrError.includes('treatreasonForExamment') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>

          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Khám lâm sàng</Text>
            <TextInput
              style={styles.inputForm}
              placeholder="Âm hộ, tầng sinh môn"
              value={vulvaAndPerineal}
              onChangeText={(text) => {
                if (arrError.includes('vulvaAndPerineal')) {
                  clearError('vulvaAndPerineal');
                }
                setVulvaAndPerineal(text);
              }}
            />
            {arrError.includes('vulvaAndPerineal') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}

            <TextInput
              style={styles.inputForm}
              placeholder="Tử cung"
              value={cervical}
              onChangeText={(text) => {
                if (arrError.includes('cervical')) {
                  clearError('cervical');
                }
                setCervical(text);
              }}
            />
            {arrError.includes('cervical') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}

            <TextInput
              placeholder="Tử cung - phần phụ"
              style={styles.inputForm}
              value={uterusExtra}
              onChangeText={(text) => {
                if (arrError.includes('uterusExtra')) {
                  clearError('uterusExtra');
                }
                setUterusExtra(text);
              }}
            />
            {arrError.includes('uterusExtra') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>

          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Dấu hiệu khác</Text>
            <TextInput
              style={styles.inputForm}
              value={otherSignal}
              onChangeText={(text) => {
                setOtherSignal(text);
              }}
            />
           
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
                if (arrError.includes('examAgain')) {
                  clearError('examAgain');
                }
                setExamAgain(text);
              }}
            />
            {arrError.includes('examAgain') && (
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
export default ReproductiveSupport;
