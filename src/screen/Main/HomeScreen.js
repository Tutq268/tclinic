import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { AppColor, AppStyle } from '@theme';
import { scaledSize, LocaleStorageManager } from '@utils';
import icon from './../../assets/images/icon.png';
import { useSelector } from 'react-redux';
import { SiteMap } from '@navigation';
import I18n from '@locale';
import { ButtonText } from '@component';

const HomeScreen = ({ navigation }) => {
  const { width: screenWidth } = Dimensions.get('screen');
  const { userProfile } = useSelector((state) => state.auth);

  const renderFullName = () => {
    let fullName = '';
    if (userProfile.firstname) {
      fullName = fullName + userProfile.firstname + ' ';
    }
    if (userProfile.lastname) {
      fullName = fullName + userProfile.lastname;
    }
    return (
      <Text
        style={{
          fontWeight: '800',
          textAlign: 'center',
          color: 'white',
          fontSize: scaledSize(30),
          marginTop: scaledSize(10)
        }}>
        {fullName}
      </Text>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            position: 'absolute',
            width: screenWidth * 2,
            height: screenWidth * 2,
            bottom: 0,
            marginLeft: -(screenWidth / 2),
            borderRadius: screenWidth,
            backgroundColor: AppColor.color_main
          }}>
          <View
            style={{
              position: 'absolute',
              width: screenWidth,
              height: screenWidth,
              bottom: scaledSize(-64),
              marginLeft: screenWidth / 2,
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}>
            <View style={{ flex: 1, justifyContent: 'center', paddingTop: scaledSize(100) }}>
              <Text
                style={{
                  fontWeight: '600',
                  textAlign: 'center',
                  color: 'white',
                  fontSize: scaledSize(18)
                }}>
                {I18n.t('hello')}
              </Text>
              {userProfile && renderFullName()}
            </View>

            <Image
              source={icon}
              resizeMode="contain"
              style={{
                width: scaledSize(128),
                height: scaledSize(128),
                borderRadius: scaledSize(128)
              }}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: scaledSize(120),
          paddingHorizontal: scaledSize(32),
          paddingBottom: scaledSize(40)
        }}>
        <Text style={{ fontSize: scaledSize(15) }}>{I18n.t('welcom_back')}!</Text>

        <ButtonText
          buttonStyle={{ width: '100%' }}
          title={I18n.t('go_to_appointment')}
          onPress={() => SiteMap.showScreen(navigation, 'appointment')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default HomeScreen;
