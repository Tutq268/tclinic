import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { useSelector,useDispatch } from 'react-redux';
import { AppColor } from '@theme';
import { scaledSize, RNToast, LocaleStorageManager } from '@utils';
import { ListItem, Icon } from 'react-native-elements';
import { SiteMap } from '@navigation';
import { ScreenName } from '@constant';
import * as ImagePicker from 'react-native-image-picker';
import ActionSheet from 'react-native-actionsheet';
import { API } from '@services';
import {LoadingScreen,Header} from '@component'
import {AuthAction} from '@redux'
import { URL } from '@constant';
import I18n from "@locale";

const ProfileScreen = ({ navigation }) => {
  const ActionSheetRef = React.useRef(null);
  const dispatch = useDispatch()
  const {languageApp} = useSelector(state => state.auth)

  React.useEffect(() =>{
    console.log("=================")
    console.log("language: ",languageApp)
  },[languageApp])
  const settingConfig = [
    {
      id: 0,
      title: I18n.t("person_information"),
      icon: 'person-outline'
    },
    {
      id: 1,
      title: I18n.t("setting"),
      icon: 'settings-outline'
    },
    {
      id: 2,
      title: I18n.t("support"),
      icon: 'help-circle-outline'
    },
    {
      id: 3,
      title: I18n.t("app_info"),
      icon: 'information-circle-outline'
    },
    {
      id: 4,
      title: I18n.t("logout"),
      icon: 'log-out-outline'
    }
  ];
  const { userProfile } = useSelector((state) => state.auth);
  const [isLoading,setLoading] = React.useState(false)
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
          fontSize: scaledSize(22),
          marginTop: scaledSize(26)
        }}>
        {fullName}
      </Text>
    );
  };
  const renderProfile = () => {
    let avatar = '';
    if (userProfile.avatar) {
      if (userProfile.avatar.path) {
        const filename = userProfile.avatar.path.split('uploads/')[1];
        avatar = URL.host + '/resources/' + filename;
      }
    }
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: scaledSize(20)
        }}>
        <View
          style={{
            width: 150,
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}>
            {avatar !== '' ?
            <Avatar
            size={138}
            source={{ uri: avatar }}
            rounded
            containerStyle={{ backgroundColor: AppColor.color_main }}
            avatarStyle={{ borderWidth: 8, borderColor: AppColor.white }}
          />
          :
          <Avatar
            size={138}
            rounded
            containerStyle={{ backgroundColor: AppColor.color_main }}
            avatarStyle={{ borderWidth: 8, borderColor: AppColor.white }}
            title={userProfile.firstname.split('')[0]}
          />}
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 16,
              right: 26,
              width: 30,
              height: 30,
              backgroundColor: 'grey',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30
            }}
            onPress={() => ActionSheetRef.current.show()}>
            <Icon name={'pencil-outline'} type="ionicon" size={20} color={AppColor.white} />
          </TouchableOpacity>
        </View>

        {userProfile && renderFullName()}
        {userProfile.email && (
          <Text style={{ marginTop: scaledSize(5), fontSize: scaledSize(14), fontWeight: '500' }}>
            {userProfile.email}
          </Text>
        )}
      </View>
    );
  };

  const _handleLogoutAccount = () => {
    LocaleStorageManager.clearAccessToken();
    LocaleStorageManager.clearUserId();
    SiteMap.resetToRoot(navigation, ScreenName.SIGNIN_SCREEN);
  };
  const _handleSetting = (item, index) => {
    switch (index) {
      case 0:
        // RNToast.showText('Tính Năng Đang Được Phát Triển');
        SiteMap.showScreen(navigation, ScreenName.UPDATE_PROFILE);
        break;
      case 1:
        // RNToast.showText('Tính Năng Đang Được Phát Triển');
        SiteMap.showScreen(navigation, ScreenName.SETTING);
        break;
      case 2:
        // RNToast.showText('Tính Năng Đang Được Phát Triển');
        SiteMap.showScreen(navigation, ScreenName.SUPPORT);
        break;
      case 3:
        // RNToast.showText('Tính Năng Đang Được Phát Triển');
        SiteMap.showScreen(navigation, ScreenName.INFO_APP);
        break;
      case 4:
        _handleLogoutAccount();
        break;
    }
  };

  const renderSetting = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: scaledSize(16)
        }}>
        {settingConfig.map((item, index) => {
          return (
            <ListItem
              key={index}
              bottomDivider
              style={{ width: '100%', paddingVertical: scaledSize(3) }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
                onPress={() => _handleSetting(item, index)}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                  }}>
                  <Icon
                    name={item.icon}
                    type="ionicon"
                    containerStyle={{ width: scaledSize(36) }}
                  />
                  <Text style={{ fontSize: scaledSize(14), fontWeight: '500' }}>{item.title}</Text>
                </View>
                <Icon name="chevron-forward-outline" type="ionicon" style={{ flex: 3 }} />
              </TouchableOpacity>
            </ListItem>
          );
        })}
      </View>
    );
  };

  handleChooseImageFromCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const avatar = {
          uri: Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.uri,
          type: response.type,
          name: response.fileName || response.uri.substr(response.uri.lastIndexOf('/') + 1)
        };
        let formData = new FormData();
        formData.append('firstname', userProfile.firstname);
        formData.append('lastname', userProfile.lastname);
        formData.append('telephone', userProfile.telephone);
        formData.append('email', userProfile.email);
        formData.append('address', userProfile.address);
        formData.append('gender', userProfile.gender);
        formData.append('dateOfBirth', userProfile.dateOfBirth);
        formData.append('avatar', avatar);
        setLoading(true)
        API.uploadAvatar(formData)
          .then((res) => {
            console.log("res: ",res)
            if(res.status === 200){
              const data = res.data
              RNToast.showText("Thay đổi ảnh đại diện thành công")
              dispatch(AuthAction.updateProfile(data))
              setLoading(false)
            }
          })
          .catch((err) => {
            setLoading(false)
            console.log('err: ', err.response);
          });
      
      }
    });
  };

  handleChooseImageFromLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const avatar = {
          uri: Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.uri,
          type: response.type,
          name: response.fileName || response.uri.substr(response.uri.lastIndexOf('/') + 1)
        };
        let formData = new FormData();
        formData.append('firstname', userProfile.firstname);
        formData.append('lastname', userProfile.lastname);
        formData.append('telephone', userProfile.telephone);
        formData.append('email', userProfile.email);
        formData.append('address', userProfile.address);
        formData.append('gender', userProfile.gender);
        formData.append('dateOfBirth', userProfile.dateOfBirth);
        formData.append('avatar', avatar);
        setLoading(true)
        API.uploadAvatar(formData)
          .then((res) => {
            console.log("res: ",res)
            if(res.status === 200){
              const data = res.data
              RNToast.showText("Thay đổi ảnh đại diện thành công")
              dispatch(AuthAction.updateProfile(data))
              setLoading(false)
            }
          })
          .catch((err) => {
            setLoading(false)
            console.log('err: ', err.response);
          });
      }
    });
  };

  const _handleChooseFile = (index) => {
    switch (index) {
      case 0:
        handleChooseImageFromLibrary();
        break;
      case 1:
        handleChooseImageFromCamera();
        break;
    }
  };
  return (
    <>
      <View style={styles.container}>
        {userProfile && renderProfile()}
        {renderSetting()}
      </View>
      <ActionSheet
        ref={ActionSheetRef}
        title={'Chọn ảnh'}
        options={['Thư viện ảnh', 'Chụp ảnh', 'Huỷ']}
        cancelButtonIndex={3}
        destructiveButtonIndex={2}
        onPress={(index) => _handleChooseFile(index)}
      />
      <LoadingScreen visible={isLoading} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default ProfileScreen;
