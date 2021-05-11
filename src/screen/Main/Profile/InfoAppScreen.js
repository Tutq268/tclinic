import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  I18nManager
} from 'react-native';
import { ListItem, Avatar, SearchBar, Icon } from 'react-native-elements';
import { API } from '@services';
import { AppColor } from '@theme';
import { scaledSize } from '@utils';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { SiteMap } from '@navigation';
import { ScreenName } from '@constant';
import I18n from "@locale";
import { Header } from '@component';

const InfoAppScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>

       <Header
        navigation
        title={I18n.t("info_app")}
        isRightButton={false}
        isLeftButton={true}
        onPressLeftButton={() => navigation.goBack()}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:AppColor.background }}>
        <Text style={{ fontWeight: '500', fontSize: 16, color: AppColor.color_main }}>
          Tính năng đang được phát triển
        </Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:AppColor.white
  }
});
export default InfoAppScreen;
