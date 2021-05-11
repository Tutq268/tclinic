import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useDispatch } from 'react-redux'
import { scaledSize,RNToast } from '@utils';
import { AppStyle, AppColor } from '@theme';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {API} from '@services'
import {AuthAction} from '@redux'
import { SiteMap } from "@navigation";
import I18n from "@locale";


const SignInScreen = ({navigation}) => {
  const [isLoading,setLoading] = React.useState(false)
  const dispatch = useDispatch()
  const handleLogin = values =>{
    setLoading(true)
    API.loginWithTelephone(values).then(res =>{
      
      if(res.status === 200){
        setLoading(false)
        const data = res.data
        if(data.user.role !== "doctor"){
          RNToast.showText("Ứng dụng này chỉ dành cho bác sĩ!")
        }else{
          
          dispatch(AuthAction.loginSuccess(data))
          SiteMap.showScreen(navigation, 'App')

        }
      }
    }).catch(err =>{
      setLoading(false)
      if(err.response.status === 401){
        RNToast.showText("Sai tên đăng nhập hoặc mật khẩu!")
      }
      console.log("err: ",err)
    })
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      behavior={Platform.select({ ios: 'padding', android: null })}
      style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text
          style={{
            marginBottom: scaledSize(8),
            fontSize: 40,
            fontWeight: '900',
            fontFamily: 'Lato-Black'
          }}>
          {I18n.t("sign_in")}
        </Text>
        <Text
          style={{
            ...AppStyle.BaseText,
            marginBottom: scaledSize(20),
            fontSize: 17,
            color: AppColor.grey
          }}>
          Đăng nhập hệ thống tClinic
        </Text>
        <Formik
          initialValues={{
            telephone: '',
            password: ''
          }}
          onSubmit={(values) => handleLogin(values)}
          validationSchema={ Yup.object({
            telephone: Yup.string()
              .label('Số di động')
              .required('${label} không được để trống')
              .min(10,'${label} phải có ít nhất 10 số')
              .max(12,'Số điện thoại quá dài'),
            password: Yup.string()
              .label('Mật khẩu')
              .required('${label} không được để trống')
              .min(3, '${label} yêu cầu ít nhất ${min} ký tự')
          })}>
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid={'transparent'}
                placeholderTextColor={'rgba(55,55,55,0.6)'}
                style={[styles.textInput, { marginBottom: scaledSize(10) }]}
                maxLength={32}
                selectionColor={'#333'}
                placeholder="Nhập số điện thoại"
                value={values.telephone}
                onChangeText={handleChange('telephone')}
                onBlur={() => setFieldTouched('telephone')}
                keyboardType="phone-pad"
              />
              {touched.telephone && errors.telephone && (
                <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.telephone}</Text>
              )}
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid={'transparent'}
                placeholderTextColor={'rgba(55,55,55,0.6)'}
                style={[styles.textInput]}
                maxLength={32}
                selectionColor={'#333'}
                placeholder="Nhập mật khẩu"
                secureTextEntry={true}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
              />
              {touched.password && errors.password && (
                <Text style={{ fontSize: 12, color: '#FF0D10',marginTop:scaledSize(10) }}>{errors.password}</Text>
              )}
              <TouchableOpacity style={styles.buttonLogin} onPress={handleSubmit}  disabled={!isValid}>
                {isLoading ? <ActivityIndicator animating={isLoading} /> :
                <Text
                  style={{ fontWeight: 'bold', color: AppColor.white, fontSize: scaledSize(14) }}>
                  {I18n.t("sign_in")}
                </Text>}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingHorizontal: scaledSize(20)
  },
  textInput: {
    color: '#333',
    paddingVertical: scaledSize(5),
    paddingHorizontal: scaledSize(10),
    fontSize: scaledSize(14),
    backgroundColor: '#f2f1f0',
    borderRadius: scaledSize(3),
    borderWidth: 0.3,
    borderColor: '#b8b6b6',
    marginTop: scaledSize(5),
    height: scaledSize(40)
  },
  buttonLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaledSize(3),
    backgroundColor: AppColor.color_main,
    paddingVertical: scaledSize(5),
    height: scaledSize(40),
    marginTop:scaledSize(26)
  }
});

export default SignInScreen;
