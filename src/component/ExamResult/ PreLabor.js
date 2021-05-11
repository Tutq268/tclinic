import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import { ListItem, Avatar, Button, Icon } from 'react-native-elements';
import { AppColor } from '@theme';
import { scaledSize } from '@utils';
import { SiteMap } from '@navigation';
import { ScreenName } from '@constant';
import { LocaleStorageManager } from '@utils';
import DropDownPicker from 'react-native-dropdown-picker';
import I18n from '@locale';
import moment from 'moment';

const MedicalIndexScreen = ({ medicalIndex }) => {
  const uterineContractionsData = [
    {
      label: 'Có',
      value: 1
    },
    {
      label: 'Không',
      value: 2
    }
  ];

  const uterineCondition1 = [
    {
      label: 'Dài',
      value: 1
    },
    {
      label: 'Ngắn',
      value: 2
    }
  ];

  const uterineCondition2 = [
    {
      label: 'Mở',
      value: 1
    },
    {
      label: 'Đóng kín',
      value: 2
    }
  ];

  const [examTimes, setExamTimes] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [edemaStatus, setEdemaStatus] = React.useState('');
  const [pulse, setPulse] = React.useState('');
  const [bloodPressure, setBloodPressure] = React.useState('');
  const [uterus, setUterus] = React.useState('');
  const [waistCircumference, setWaistCircumference] = React.useState('');
  const [uterineContractions, setUterineContractions] = React.useState(null);
  const [isCervicalShort, setIsCervicalShort] = React.useState(null);
  const [isCervicalOpen, setIsCervicalOpen] = React.useState(null);
  const [otherSignal, setOtherSignal] = React.useState('');
  const [careAdvice, setCareAdvice] = React.useState('');
  const [treatment, setTreatment] = React.useState('');
  const [arrError, setArrError] = React.useState([]);
  const [isOpenDrop1, setOpenDrop1] = React.useState(false);
  const [isOpenDrop2, setOpenDrop2] = React.useState(false);
  const [isOpenDrop3, setOpenDrop3] = React.useState(false);

  const handleAddMedicalIndex = () => {
    let err = [];
    if (!uterineContractions) err.push('uterineContractions');
    if (!isCervicalShort) err.push('isCervicalShort');
    if (!isCervicalOpen) err.push('isCervicalOpen');
    if (examTimes === '') err.push('examTimes');
    if (height === '') err.push('height');
    if (weight === '') err.push('weight');
    if (pulse === '') err.push('pulse');
    if (bloodPressure === '') err.push('bloodPressure');
    if (edemaStatus === '') err.push('edemaStatus');
    if (uterus === '') err.push('uterus');
    if (waistCircumference === '') err.push('waistCircumference');
    if (otherSignal === '') err.push('otherSignal');
    if (careAdvice === '') err.push('careAdvice');

    if (err.length > 0) {
      setArrError(err);
    } else {
      const medical = {
        examTimes,
        height,
        weight,
        edemaStatus,
        uterus,
        waistCircumference,
        otherSignal,
        careAdvice,
        uterineContractions: uterineContractions === 1 ? true : false,
        isCervicalShort: isCervicalShort === 1 ? true : false,
        isCervicalOpen: isCervicalOpen === 1 ? true : false
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
            backgroundColor: AppColor.white,
            paddingBottom: scaledSize(32)
          }}>
          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Khám thai lần</Text>
            <TextInput
              style={styles.inputForm}
              value={examTimes}
              onChangeText={(text) => {
                if (arrError.includes('examTimes')) {
                  clearError('examTimes');
                }
                setExamTimes(text);
              }}
              keyboardType="numeric"
            />

            {arrError.includes('examTimes') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>

          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Chiều cao</Text>
            <TextInput
              style={styles.inputForm}
              value={height}
              onChangeText={(text) => {
                if (arrError.includes('height')) {
                  clearError('height');
                }
                setHeight(text);
              }}
              keyboardType="numeric"
            />
            {arrError.includes('height') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>

          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Cân nặng</Text>
            <TextInput
              style={styles.inputForm}
              value={weight}
              onChangeText={(text) => {
                if (arrError.includes('weight')) {
                  clearError('weight');
                }
                setWeight(text);
              }}
              keyboardType="numeric"
            />
            {arrError.includes('weight') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>

          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Tình trạng phù nề</Text>
            <TextInput
              style={styles.inputForm}
              value={edemaStatus}
              onChangeText={(text) => {
                if (arrError.includes('edemaStatus')) {
                  clearError('edemaStatus');
                }
                setEdemaStatus(text);
              }}
            />
            {arrError.includes('edemaStatus') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>

          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>mạch đập</Text>
            <TextInput
              style={styles.inputForm}
              value={pulse}
              onChangeText={(text) => {
                if (arrError.includes('pulse')) {
                  clearError('pulse');
                }
                setPulse(text);
              }}
              keyboardType="numeric"
            />
            {arrError.includes('pulse') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>
          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Huyết áp</Text>
            <TextInput
              style={styles.inputForm}
              value={bloodPressure}
              onChangeText={(text) => {
                if (arrError.includes('bloodPressure')) {
                  clearError('bloodPressure');
                }
                setBloodPressure(text);
              }}
              keyboardType="numeric"
            />
            {arrError.includes('bloodPressure') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>
          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Cao tử cung</Text>
            <TextInput
              style={styles.inputForm}
              value={uterus}
              onChangeText={(text) => {
                if (arrError.includes('uterus')) {
                  clearError('uterus');
                }
                setUterus(text);
              }}
              keyboardType="numeric"
            />
            {arrError.includes('uterus') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>
          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Vòng bụng</Text>
            <TextInput
              style={styles.inputForm}
              value={waistCircumference}
              onChangeText={(text) => {
                if (arrError.includes('waistCircumference')) {
                  clearError('waistCircumference');
                }
                setWaistCircumference(text);
              }}
              keyboardType="numeric"
            />
            {arrError.includes('waistCircumference') && (
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
            <Text style={{ fontSize: scaledSize(14) }}>Cơn co tử cung</Text>

            <DropDownPicker
              onOpen={() => setOpenDrop1(true)}
              onClose={() => setOpenDrop1(false)}
              items={uterineContractionsData}
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
                if (arrError.includes('uterineContractions')) {
                  clearError('uterineContractions');
                }
                setUterineContractions(item.value);
              }}
            />
            {arrError.includes('uterineContractions') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>
          <View
            style={{
              flexDirection: 'column',
              marginTop: scaledSize(16),
              zIndex: 999,
              minHeight: isOpenDrop2 ? 150 : 0
            }}>
            <Text style={{ fontSize: scaledSize(14) }}>Tình trạng tử cung</Text>

            <DropDownPicker
              onOpen={() => setOpenDrop2(true)}
              onClose={() => setOpenDrop2(false)}
              items={uterineCondition1}
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
                if (arrError.includes('isCervicalShort')) {
                  clearError('isCervicalShort');
                }
                setIsCervicalShort(item.value);
              }}
            />
            {arrError.includes('isCervicalShort') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginTop: scaledSize(16),
              zIndex: 998,
              minHeight: isOpenDrop3 ? 150 : 0
            }}>
            <Text style={{ fontSize: scaledSize(14) }}>Tình trạng tử cung</Text>

            <DropDownPicker
              onOpen={() => setOpenDrop3(true)}
              onClose={() => setOpenDrop3(false)}
              items={uterineCondition2}
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
                if (arrError.includes('isCervicalOpen')) {
                  clearError('isCervicalOpen');
                }
                setIsCervicalOpen(item.value);
              }}
            />
            {arrError.includes('isCervicalOpen') && (
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
            <Text style={{ fontSize: scaledSize(14) }}>Điều trị (nếu có)</Text>
            <TextInput
              style={styles.inputForm}
              value={treatment}
              onChangeText={(text) => {
                setTreatment(text);
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
    flex: 1,
    paddingBottom: scaledSize(32)
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
export default MedicalIndexScreen;
