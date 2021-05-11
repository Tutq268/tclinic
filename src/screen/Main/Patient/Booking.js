import React from 'react'
import { View,Text,StyleSheet,ActivityIndicator } from 'react-native'
import { Icon, Avatar } from 'react-native-elements';
import { scaledSize } from '@utils';
import { AppColor } from '@theme';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { SiteMap } from '@navigation';
import I18n from "@locale";

const Booking = ({ route, navigation }) =>{
    const { patientInfo } = route.params;

    return(
        <View style={styles.container}>
        <View
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
            Đặt lịch khám bệnh
          </Text>
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1
    }
})

export default Booking