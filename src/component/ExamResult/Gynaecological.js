import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import { ListItem, Avatar, Button, Icon } from 'react-native-elements';
import { AppColor } from '@theme';
import { scaledSize } from '@utils';
import { SiteMap } from '@navigation';
import { ScreenName } from '@constant';
import { LocaleStorageManager } from '@utils';
import I18n from '@locale';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';

const Gynaecological = ({ medicalIndex }) => {
  const menstrual = [
    {
      label: 'Đều',
      value: 1
    },
    {
      label: 'Không đều',
      value: 2
    }
  ];

  const [isEvenlyMenstrualHistory, setIsEvenlyMenstrualHistory] = React.useState(null);
  const [cycle, setCycle] = React.useState('');
  const [duringTime, setDuringTime] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [amenorrhea, setAmenorrhea] = React.useState('');
  const [menorrhagia, setMenorrhagia] = React.useState('');
  const [unusualBleeding, setUnusualBleeding] = React.useState('');
  const [reasonForExam, setReasonForExam] = React.useState('');
  const [otherSignal, setOtherSignal] = React.useState('');
  const [careAdvice, setCareAdvice] = React.useState('');
  const [vulvaAndPerineal, setVulvaAndPerineal] = React.useState('');
  const [vagina, setVagina] = React.useState('');
  const [cervical, setCervical] = React.useState('');
  const [uterusExtra, setUterusExtra] = React.useState('');
  const [arrError, setArrError] = React.useState([]);
  const [isOpenDropdown,setOpenDropdown] = React.useState(false)
  const handleAddMedicalIndex = () => {
    let err = [];
    if (!isEvenlyMenstrualHistory) err.push('isEvenlyMenstrualHistory');
    if (cycle === '') err.push('cycle');
    if (duringTime === '') err.push('duringTime');
    if (quantity === '') err.push('quantity');
    if (amenorrhea === '') err.push('amenorrhea');
    if (reasonForExam === '') err.push('reasonForExam');
    if (otherSignal === '') err.push('otherSignal');
    if (careAdvice === '') err.push('careAdvice');
    if (vulvaAndPerineal === '') err.push('vulvaAndPerineal');
    if (cervical === '') err.push('cervical');
    if (vagina === '') err.push('vagina');
    if (uterusExtra === '') err.push('uterusExtra');

    if (err.length > 0) {
      setArrError(err);
    } else {
      const medical = {
        isEvenlyMenstrualHistory: isEvenlyMenstrualHistory === 1 ? true:false,
        cycle,
        duringTime,
        quantity,
        amenorrhea,
        reasonForExam,
        otherSignal,
        careAdvice,
        vulvaAndPerineal,
        cervical,
        vagina,
        uterusExtra
      };
      medicalIndex(medical)
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
          <View style={{ flexDirection: 'column', marginTop: scaledSize(16), zIndex: 1000,minHeight: isOpenDropdown ? 150 : 0 }}>
            <Text style={{ fontSize: scaledSize(14) }}>Tiền sử kinh nguyệt</Text>
            <DropDownPicker
            onClose={() => setOpenDropdown(false)}
            onOpen={() => setOpenDropdown(true)}
              items={menstrual}
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
              onChangeItem={(item) => setIsEvenlyMenstrualHistory(item.value)}
            />
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
            <Text style={{ fontSize: scaledSize(14) }}>Thời gian</Text>
            <TextInput
              style={styles.inputForm}
              value={duringTime}
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
            <Text style={{ fontSize: scaledSize(14) }}>Số lượng</Text>
            <TextInput
              style={styles.inputForm}
              value={quantity}
              onChangeText={(text) => {
                if (arrError.includes('quantity')) {
                  clearError('quantity');
                }
                setQuantity(text);
              }}
            />
            {arrError.includes('quantity') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>
          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Kinh nguyệt hiện tại</Text>
            <TextInput
              style={styles.inputForm}
              value={amenorrhea}
              onChangeText={(text) => {
                if (arrError.includes('amenorrhea')) {
                  clearError('amenorrhea');
                }
                setAmenorrhea(text);
              }}
            />
            {arrError.includes('amenorrhea') && (
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
            {arrError.includes('reasonForExam') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>
          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Dấu hiệu khác</Text>
            <TextInput
              style={styles.inputForm}
              value={otherSignal}
              onChangeText={(text) => {
                if (arrError.includes('otherSignal')) {
                  clearError('otherSignal');
                }
                setOtherSignal(text);
              }}
            />
            {arrError.includes('otherSignal') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>
          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Tư vấn chăm sóc</Text>
            <TextInput
              style={styles.inputForm}
              value={careAdvice}
              onChangeText={(text) => {
                if (arrError.includes('careAdvice')) {
                  clearError('careAdvice');
                }
                setCareAdvice(text);
              }}
            />
            {arrError.includes('careAdvice') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>
          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Tầng sinh môn</Text>
            <TextInput
              style={styles.inputForm}
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
          </View>
          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Âm đạo</Text>
            <TextInput
              style={styles.inputForm}
              value={vagina}
              onChangeText={(text) => {
                if (arrError.includes('vagina')) {
                  clearError('vagina');
                }
                setVagina(text);
              }}
            />
            {arrError.includes('vagina') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>
          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Cổ tử cung</Text>
            <TextInput
              style={styles.inputForm}
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
          </View>
          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Tử cung - phần phụ</Text>
            <TextInput
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
            onPress={() =>handleAddMedicalIndex()}
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
export default Gynaecological;
