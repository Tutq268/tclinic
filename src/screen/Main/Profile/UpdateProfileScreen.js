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
  TextInput,
  SafeAreaView
} from 'react-native';
import { Button, Avatar, SearchBar, Icon } from 'react-native-elements';
import { API } from '@services';
import { AppColor } from '@theme';
import { scaledSize, RNToast } from '@utils';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingScreen, Header,ButtonText } from '@component';
import { AuthAction } from '@redux';
import { URL } from '@constant';
import DropDownPicker from 'react-native-dropdown-picker';
import I18n from '@locale';

const UpdateProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.auth);
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [isOpenDropdown, setOpenDropdown] = React.useState(false);
  const genderSelect = [
    {
      label: 'Nam',
      value: 'Male'
    },
    {
      label: 'Nữ',
      value: 'Female'
    },
    {
      label: 'Khác',
      value: 'Other'
    }
  ];
  const renderUserProfile = () => {
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          paddingHorizontal: scaledSize(16),
          flexDirection: 'column',
          backgroundColor: AppColor.white
        }}>
        <View style={styles.profileItem}>
          <Text style={styles.titleStyle}>Họ : </Text>
          <TextInput
            style={styles.inputForm}
            defaultValue={userProfile.firstname}
            onChangeText={(text) => setFirstname(text)}
            // editable={false}
          />
        </View>
        <View style={styles.profileItem}>
          <Text style={styles.titleStyle}>Tên: </Text>
          <TextInput
            style={styles.inputForm}
            defaultValue={userProfile.lastname}
            onChangeText={(text) => setLastname(text)}
            // editable={false}
          />
        </View>

        <View style={styles.profileItem}>
          <Text style={styles.titleStyle}>Điện thoại: </Text>
          <TextInput style={styles.inputForm} value={userProfile.telephone} editable={false} />
        </View>
        <View style={styles.profileItem}>
          <Text style={styles.titleStyle}>Năm sinh: </Text>
          <TextInput
            keyboardType="numeric"
            style={styles.inputForm}
            defaultValue={`${userProfile.dateOfBirth}`}
            onChangeText={(text) => setDateOfBirth(text)}
            // editable={false}
          />
        </View>
        <View
            style={[
              styles.profileItem,
              { minHeight: isOpenDropdown ? 180 : 0, alignItems: 'flex-start', zIndex: 1000 }
            ]}>
            <Text style={[styles.titleStyle, { marginTop: 3 }]}>Giới tính: </Text>
       
            <DropDownPicker
                onClose={() => setOpenDropdown(false)}
                onOpen={() => setOpenDropdown(true)}
              items={genderSelect}
              labelStyle={{
                fontSize: scaledSize(14),
                fontWeight: '400',
                color: AppColor.grey
              }}
              containerStyle={{ height: 42,width:'70%' }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              placeholder={userProfile.gender}
              onChangeItem={(item) => setDateOfBirth(item.value)}
            />
          </View>

        <View style={styles.profileItem}>
          <Text style={styles.titleStyle}>Email: </Text>
          <TextInput style={styles.inputForm} value={userProfile.email} editable={false} />
        </View>

        <View style={styles.profileItem}>
          <Text style={styles.titleStyle}>Địa chỉ: </Text>
          <TextInput
            style={styles.inputForm}
            defaultValue={userProfile.address}
            onChangeText={(text) => setAddress(text)}
            // editable={false}
          />
        </View>
      </View>
    );
  };

  const handleChangeInfo = () => {
    let formData = new FormData();
    formData.append('firstname', firstname !== '' ? firstname : userProfile.firstname);
    formData.append('lastname', lastname !== '' ? lastname : userProfile.lastname);
    formData.append('telephone', userProfile.telephone);
    formData.append('email', userProfile.email);
    formData.append('address', address !== '' ? address : userProfile.address);
    formData.append('gender', gender !== '' ? gender : userProfile.gender);
    formData.append('dateOfBirth', dateOfBirth !== '' ? dateOfBirth : userProfile.dateOfBirth);
    let params = {
      firstname: firstname !== '' ? firstname : userProfile.firstname,
      address:  address !== '' ? address : userProfile.address,
      lastname:  lastname !== '' ? lastname : userProfile.lastname,
      gender: gender !== '' ? gender : userProfile.gender,
      dateOfBirth: dateOfBirth !== '' ? dateOfBirth : userProfile.dateOfBirth
    }
    API.uploadAvatar(formData)
      .then((res) => {
        if (res.status === 200) {
          console.log("res: ",res)
          const data = res.data;
          RNToast.showText('Cập nhật thông tin thành công');
          dispatch(AuthAction.updateProfile(data));
          setLoading(false);
          navigation.goBack();
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log('err: ', err.response);
        navigation.goBack();
      });
  };
  const _renderConfirmButton = () => {
    return (
      <View
        style={{ paddingHorizontal: scaledSize(20), paddingBottom: scaledSize(30), width: '100%' }}>
        {/* <Button
          title="Thay đổi thông tin"
          type="clear"
          containerStyle={{
            backgroundColor: AppColor.color_main,
            paddingHorizontal: scaledSize(6),
            borderWidth: 0
          }}
          titleStyle={{
            color: AppColor.white,
            fontSize: scaledSize(14),
            fontWeight: '500',
            paddingVertical: scaledSize(5)
          }}
          onPress={() => handleChangeInfo()}
        /> */}
        <ButtonText
            buttonStyle={{ paddingHorizontal: scaledSize(10) }}
            textStyle={{ fontWeight: '500' }}
            title="Thay đổi thông tin"
            onPress={() => handleChangeInfo()}
          />
      </View>
    );
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          navigation
          title={I18n.t('personal_information')}
          isRightButton={false}
          isLeftButton={true}
          onPressLeftButton={() => navigation.goBack()}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'column',
            marginBottom: 30,
            backgroundColor: AppColor.background,
            paddingTop: 16
          }}>
          {renderUserProfile()}
          {_renderConfirmButton()}
        </View>
      </SafeAreaView>
      <LoadingScreen visible={isLoading} />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white
  },
  profileItem: {
    flexDirection: 'row',
    marginTop: scaledSize(16),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ababab',
    paddingBottom: 12
  },
  inputForm: {
    width: '70%',
    backgroundColor: AppColor.white,
    fontSize: scaledSize(14)
  },
  titleStyle: {
    fontSize: scaledSize(14),
    fontWeight: '400'
  }
});
export default UpdateProfileScreen;
