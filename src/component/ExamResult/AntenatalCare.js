import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import { Button, Avatar, SearchBar, Icon } from 'react-native-elements';
import { AppColor } from '@theme';
import { scaledSize } from '@utils';
import { SiteMap } from '@navigation';
import { ScreenName } from '@constant';
import { LocaleStorageManager } from '@utils';
import I18n from '@locale';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
const AntenatalCare = ({ medicalIndex }) => {
  const [hight, setHight] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [edemaStatus, setEdemaStatus] = React.useState('');
  const [pulse, setPulse] = React.useState('');
  const [bloodPressure, setBloodPressure] = React.useState('');
  const [temperature, setTemperature] = React.useState('');
  const [uterus, setUterus] = React.useState('');
  const [uterineContractions, setUterineContractions] = React.useState(null);
  const [waistCircumference, setWaistCircumference] = React.useState('');
  const [arrError, setArrError] = React.useState([]);
  const [isOpenDrop, setOpenDrop] = React.useState(false);
  const [isOpenDrop1, setOpenDrop1] = React.useState(false);

  const handleAddMedicalIndex = () => {
    let err = [];
    if (!uterineContractions) err.push('uterineContractions');
    if (hight === '') err.push('hight');
    if (edemaStatus === '') err.push('edemaStatus');
    if (weight === '') err.push('weight');
    if (pulse === '') err.push('pulse');
    if (bloodPressure === '') err.push('bloodPressure');
    if (uterus === '') err.push('uterus');
    if (waistCircumference === '') err.push('waistCircumference');
    if (temperature === '') err.push('temperature');

    if (err.length > 0) {
      setArrError(err);
    } else {
      const medical = {
        hight,
        edemaStatus,
        weight,
        pulse,
        bloodPressure,
        uterus,
        waistCircumference,
        temperature,
        uterineContractions: uterineContractions === 1 ? true : false
      };
      medicalIndex(medical);
    }
  };
  const clearError = (item) => {
    const newError = arrError.filter((i) => i !== item);
    setArrError(newError);
  };
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
            <Text style={{ fontSize: scaledSize(14) }}>Chiều cao</Text>
            <TextInput
              style={styles.inputForm}
              value={hight}
              onChangeText={(text) => {
                if (arrError.includes('hight')) {
                  clearError('hight');
                }
                setHight(text);
              }}
            />
            {arrError.includes('hight') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>

          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Cân nặng</Text>
            <TextInput
              value={weight}
              onChangeText={(text) => {
                if (arrError.includes('weight')) {
                  clearError('weight');
                }
                setWeight(text);
              }}
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
            />
            {arrError.includes('bloodPressure') && (
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
          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Nhiệt độ</Text>
            <TextInput
              style={styles.inputForm}
              value={temperature}
              onChangeText={(text) => {
                if (arrError.includes('temperature')) {
                  clearError('temperature');
                }
                setTemperature(text);
              }}
            />
            {arrError.includes('temperature') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>
          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Mạch</Text>
            <TextInput
              style={styles.inputForm}
              value={pulse}
              onChangeText={(text) => {
                if (arrError.includes('pulse')) {
                  clearError('pulse');
                }
                setPulse(text);
              }}
            />
            {arrError.includes('pulse') && (
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
            />
            {arrError.includes('uterus') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Đây là trường bắt buộc</Text>
            )}
          </View>

         

          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Chu vi vòng eo</Text>
            <TextInput
              style={styles.inputForm}
              value={waistCircumference}
              onChangeText={(text) => {
                if (arrError.includes('waistCircumference')) {
                  clearError('waistCircumference');
                }
                setWeight(text);
              }}
            />
            {arrError.includes('waistCircumference') && (
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
            onPress={() => handleAddMedicalIndex()}
            titleStyle={{ color: AppColor.white, fontSize: scaledSize(13), fontWeight: '500' }}
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
export default AntenatalCare;
