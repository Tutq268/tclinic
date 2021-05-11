import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppColor } from '@theme';
import { scaledSize } from '@utils';
import DropDownPicker from 'react-native-dropdown-picker';

const Dropdown = ({
  title,
  isRightButton,
  isLeftButton,
  onPress,
  rightIconName
}) => {
  return (
    <View style={{ flexDirection: 'column', minHeight: isOpenDropdown ? 220 : 0 }}>
      <Text style={{ fontSize: scaledSize(14) }}>{title}</Text>

      {listMedicalCate && (
        <DropDownPicker
          zIndex={99}
          items={listMedicalCate}
          onOpen={() => setOpenDropdown(true)}
          onClose={() => setOpenDropdown(false)}
          labelStyle={{
            fontSize: scaledSize(14),
            fontWeight: '400',
            color: AppColor.grey,
            zIndex: 1000
          }}
          containerStyle={{ height: 42, marginTop: scaledSize(16) }}
          itemStyle={{
            justifyContent: 'flex-start'
          }}
          placeholder="Chọn xét nghiệm"
          onChangeItem={(item) => {
            dispatch(AppointmentAction.clearMedicalIndex());
            setMedicalCateChoose(item);
          }}
        />
      )}
      {/* {listError.includes('name') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>
                Tên xét nghiệm là bắt buộc
              </Text>
            )} */}
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({

});
