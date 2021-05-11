import React from 'react';
import { View, Image } from 'react-native';
import splash from './../../assets/images/splash.png';
import { LocaleStorageManager } from '@utils';
import { useDispatch, useSelector } from 'react-redux';
import { AuthAction } from '@redux';
import { API } from '@services';
import ZoomUs from 'react-native-zoom-us';
import I18n from '@locale';
import axios from 'axios';

const skdKey = 'm8p96jon2priOrMo9X83zAnhGlLVt163s0C5';
const sdkSecret = 'U1ZBUNBu1PRh0yU6Z6diwfxZr5WeYXsZapHt';

const AuthLoadingScreen = ({ navigation }) => {
  React.useEffect(() => {
    getLanguage();
  }, []);

  const getLanguage = async () => {
    const lang = await LocaleStorageManager.getLang();
    I18n.locale = lang ? lang : 'vi';
  };
  const dispatch = useDispatch();
  React.useEffect(() => {
    (async () => {
      try {
        const initializeResult = await ZoomUs.initialize({
          clientKey: skdKey,
          clientSecret: sdkSecret
        });
        console.log({ initializeResult });
      } catch (e) {
        Alert.alert('Error', 'Could not execute initialize');
        console.error(e);
      }
    })();
  }, []);

  React.useEffect( () =>{
     const getToken = async () =>{
      let token = await LocaleStorageManager.getAccessToken();
      let userId = await LocaleStorageManager.getUserId()
      if(token){
          API.getUserProfile(userId).then(res =>{
              if(res.status === 200){
                  const data = res.data.data[0]
                  dispatch(AuthAction.getUserProfile(data))
              }
          }).catch(err =>{
              console.log("err: ",err) 
          })
      }
      navigation.replace(token ? 'App' : 'SIGNIN_SCREEN');
      // await LocaleStorageManager.clearAccessToken()
     }
     getToken()
  },[])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={splash} resizeMode="contain" style={{ flex: 1 }} />
    </View>
  );
};
export default AuthLoadingScreen;
