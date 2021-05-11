import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Switch,
  Alert,
  SafeAreaView
} from 'react-native';
import { ListItem, Avatar, SearchBar, Icon } from 'react-native-elements';
import { API } from '@services';
import { AppColor } from '@theme';
import { scaledSize } from '@utils';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { SiteMap } from '@navigation';
import { ScreenName } from '@constant';
import { LocaleStorageManager } from '@utils';
import I18n from "@locale";
import { Header } from '@component';
import moment from 'moment'
const SettingScreen = ({ navigation }) => {
  const [isEnableNotification, setIsEnableNotification] = React.useState(false);
  const [isSelectLang, setIsSelectLang] = React.useState(false);
  const [language,setLanguage] = React.useState(null)

  React.useEffect(() =>{
    getlang()
  },[])
  const getlang = async () =>{
    const lang = await LocaleStorageManager.getLang();
    setLanguage(lang ? lang : "vi")
  }
  const lang = [
    {
      id: 0,
      name: 'Tiếng Việt',
      value: 'vi'
    },
    {
      id: 1,
      name: 'Tiếng Anh',
      value: 'en'
    }
  ];
  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: scaledSize(15),
          borderBottomWidth: item.id + 1 < lang.length ?  0.2 : 0
        }}
        onPress={() =>{
          LocaleStorageManager.setLang(item.value)
          I18n.locale = item.value
          setLanguage(item.value)
          setIsSelectLang(false)
          Alert.alert(I18n.t('success'),
          I18n.t('updated'),
          [
              { text: 'OK', onPress: () =>  SiteMap.showScreen(navigation,"LOADING_SCREEN") }
          ]);
        }}
        >
        <Text style={{ fontSize: scaledSize(14),color: AppColor.color_main }}>{item.name}</Text>
        {language === item.value && <Icon
            name='checkmark-circle-sharp'
            type="ionicon"
            size={20}
            color={AppColor.color_main}
          />}
       
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
       <Header
          onPressLeftButton={() => navigation.goBack()}
          title= {I18n.t("setting")}
          // isRightButton={true}
          isLeftButton={true}
          // rightIconName="add-circle"
        />
        <View style={{flexDirection:'column',flex:1,backgroundColor:AppColor.background}}>

      
      <View style={styles.settingItem}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center'
          }}>
          <Text style={{ fontSize: scaledSize(15), fontWeight: '400' }}>{I18n.t("get_notification")}</Text>
          <Switch
            trackColor={{ false: '#767577', true: AppColor.color_main }}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsEnableNotification(!isEnableNotification)}
            value={isEnableNotification}
          />
        </View>
      </View>
      <View style={[styles.settingItem,{borderBottomWidth:0}]}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center'
          }}
          onPress={() => setIsSelectLang(!isSelectLang)}>
          <Text style={{ fontSize: scaledSize(15), fontWeight: '400' }}>{I18n.t("language")}</Text>
          <Icon
            name={isSelectLang ? 'chevron-up-outline' : 'chevron-down-outline'}
            type="ionicon"
            size={20}
          />
        </TouchableOpacity>
       {isSelectLang && <View style={{ marginTop: scaledSize(10) }}>
          <FlatList
            style={{ width: '100%' }}
            data={lang}
            renderItem={_renderItem}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => 'key' + index}
          />
        </View> }
      </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:AppColor.white
  },
  settingItem: {
    padding: scaledSize(16),
    flexDirection: 'column',
    backgroundColor: AppColor.white,
    borderBottomWidth: 0.5,
    borderBottomColor: '#919191'
  }
});
export default SettingScreen;
