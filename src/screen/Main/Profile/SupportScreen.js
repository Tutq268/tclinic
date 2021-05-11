import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { Icon } from 'react-native-elements';
import { AppColor } from '@theme';
import { scaledSize } from '@utils';
import I18n from "@locale";
import { Header } from '@component';

const SupportScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>

        <Header
        navigation
        title={I18n.t("support")}
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
    backgroundColor: AppColor.white
  }
});
export default SupportScreen;
