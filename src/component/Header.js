import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppColor } from '@theme';
import { scaledSize } from '@utils';

const Header = ({
  onPressLeftButton,
  title,
  isRightButton,
  isLeftButton,
  onPress,
  rightIconName
}) => {
  return (
    <View
      style={{
        paddingTop: scaledSize(10),
        paddingBottom: scaledSize(10),
        paddingRight: scaledSize(10),
        // paddingLeft: !isLeftButton ? 10 : 0,
        flexDirection: 'row',
        // justifyContent: !isLeftButton ? 'space-between' : 'flex-start',
        alignItems: 'center'
      }}>
      {isLeftButton && (
        <Icon
          name="chevron-back-outline"
          onPress={() => onPressLeftButton && onPressLeftButton()}
          type="ionicon"
          size={36}
          style={{ marginTop: 2 }}
        />
      )}
      <Text
        style={{
          marginLeft: isRightButton ? 36 : 0,
          marginRight: isLeftButton ? 36 :0,
          flex: 1,
          fontWeight: '600',
          fontSize: scaledSize(22),
          color: AppColor.color_main,
          paddingBottom: scaledSize(6),
          width: '100%',
          textAlign: 'center'
        }}>
          {title}
      </Text>
      {isRightButton && (
        <TouchableOpacity onPress={() => onPress && onPress()}>
          <Icon name={rightIconName} type="ionicon" size={36} color={AppColor.color_main} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 5,
    borderColor: AppColor.grey_line,
    borderWidth: 0.5,
    backgroundColor: 'white',
    paddingHorizontal: 14,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 36
  },
  textTitle: {
    color: 'black',
    fontSize: 14,
    fontWeight: '700',
    alignItems: 'center',
    textAlign: 'center'
  }
});
