import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Platform,
  SafeAreaView
} from 'react-native';
import { Icon, Avatar, Button } from 'react-native-elements';
import { scaledSize, RNToast } from '@utils';
import { AppColor } from '@theme';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { SiteMap } from '@navigation';
import { ScreenName } from '@constant';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import DocumentPicker from 'react-native-document-picker';
import * as ImagePicker from 'react-native-image-picker';
import { API } from '@services';
import ActionSheet from 'react-native-actionsheet';
import { useSelector, useDispatch } from 'react-redux';
import { AppointmentAction } from '@redux';
import { LoadingScreen } from '@component';
import I18n from '@locale';
import { Header, ButtonText } from '@component';

const ReturnExamResultScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { medicalIndex } = useSelector((state) => state.appointment);
  const medicalIndexFormData = [
    '6077e8c8adc39165484fe82d',
    '6077e85badc39165484fe82b',
    '6077e687adc39165484fe829',
    '6077e654adc39165484fe828',
    '6077e45b21bc3759c41a4a8f',
    '6077e44d21bc3759c41a4a8e',
    '6077e42921bc3759c41a4a8d'
  ];
  const { appointmentInfo } = route.params;
  const [testName, setTestName] = React.useState('');
  const [testResult, setTestResult] = React.useState('');
  const [docsChoose, setDocsChoose] = React.useState(null);
  const [imageUri, setImageUri] = React.useState(null);
  const [listCategories, setListCategories] = React.useState(null);
  const [listMedicalCate, setListMedicalCate] = React.useState(null);
  const [medicalCateChoose, setMedicalCateChoose] = React.useState(null);
  const [arrExam, setArrExam] = React.useState([0]);
  const [examIndex, setExamIndex] = React.useState(0);
  const [listError, setListError] = React.useState([]);
  const [listCateId, setListCateId] = React.useState(null);
  const [avatar, setAvatr] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  const [isOpenDropdown, setOpenDropdown] = React.useState(false);
  const [isOpenDropdown2, setOpenDropdown2] = React.useState(false);
  const delayRef = React.useRef(null);
  React.useEffect(() => {
    API.getPatientCategories()
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          const list = data.data.map((item) => {
            return {
              ...item,
              label: item.name,
              value: item._id
            };
          });
          setListCategories(list);
        }
      })
      .catch((err) => {
        console.log('err: ', err);
      });
    getListMedicalCate();
  }, []);

  const getListMedicalCate = () => {
    API.getListMedicalCate()
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          const list = data.data.map((item) => {
            return {
              ...item,
              label: item.medicalCateName,
              value: item._id
            };
          });
          setListMedicalCate(list);
        }
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  };

  const _renderTestInfo = () => {
    return (
      <View
        style={{
          marginTop: scaledSize(16),
          backgroundColor: AppColor.white,
          padding: scaledSize(16),
          flexDirection: 'column'
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name="information"
            type="ionicon"
            size={26}
            color={AppColor.color_main}
            style={{
              backgroundColor: `rgba(78, 154, 230, 0.2)`,
              width: scaledSize(28),
              height: scaledSize(28),
              borderRadius: scaledSize(28),
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: scaledSize(10)
            }}
          />
          <Text style={{ fontWeight: '500', fontSize: scaledSize(14) }}>Thông tin xét nghiệm</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginTop: scaledSize(20),
            paddingLeft: scaledSize(6)
          }}>
          <View style={{ flexDirection: 'column', minHeight: isOpenDropdown ? 220 : 0 }}>
            <Text style={{ fontSize: scaledSize(14) }}>Tên xét nghiệm</Text>

            {listMedicalCate && (
              <DropDownPicker
                zIndex={99}
                items={listMedicalCate}
                onOpen={() => setOpenDropdown(true)}
                onClose={() => setOpenDropdown(false)}
                labelStyle={{
                  fontSize: scaledSize(14),
                  fontWeight: '400',
                  color: AppColor.grey,
                  zIndex: 1000
                }}
                containerStyle={{ height: 42, marginTop: scaledSize(16) }}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                placeholder="Chọn xét nghiệm"
                onChangeItem={(item) => {
                  dispatch(AppointmentAction.clearMedicalIndex());
                  setMedicalCateChoose(item);
                }}
              />
            )}
            {/* {listError.includes('name') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>
                Tên xét nghiệm là bắt buộc
              </Text>
            )} */}
          </View>

          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Ngày xét nghiệm</Text>
            <TextInput
              style={{
                paddingVertical: scaledSize(8),
                paddingHorizontal: scaledSize(10),
                marginTop: scaledSize(10),
                borderWidth: 0.3,
                borderColor: '#ababab',
                width: '100%',
                backgroundColor: AppColor.white,
                fontSize: scaledSize(14)
              }}
              value={moment(appointmentInfo.appointmentDate).format('DD/MM/yyyy')}
              editable={false}
            />
          </View>
          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Bác sĩ</Text>
            <TextInput
              style={{
                paddingVertical: scaledSize(8),
                paddingHorizontal: scaledSize(10),
                marginTop: scaledSize(10),
                borderWidth: 0.3,
                borderColor: '#ababab',
                width: '100%',
                backgroundColor: AppColor.white,
                fontSize: scaledSize(14)
              }}
              value={appointmentInfo.doctorId.firstname + ' ' + appointmentInfo.doctorId.lastname}
              editable={false}
            />
          </View>
          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Kết quả xét nghiệm</Text>
            <TextInput
              style={{
                paddingVertical: scaledSize(8),
                paddingHorizontal: scaledSize(10),
                marginTop: scaledSize(10),
                borderWidth: 0.3,
                borderColor: '#ababab',
                width: '100%',
                backgroundColor: AppColor.white,
                fontSize: scaledSize(14)
              }}
              value={testResult}
              placeholder="Nhập kết quả xét nghiệm"
              onChangeText={(text) => {
                setTestResult(text);
              }}
            />
            {listError.includes('result') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>
                Kết quả xét nghiệm là bắt buộc
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };
  const handleChooseDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images]
      });
      const docs = {
        uri: Platform.OS === 'ios' ? res.uri.replace('file://', '') : res.uri,
        type: res.type,
        name: res.fileName || res.uri.substr(res.uri.lastIndexOf('/') + 1)
      };
      if (!docsChoose) {
        const data = {
          index: examIndex,
          data: [docs]
        };
        setDocsChoose([data]);
      } else {
        const findExamIndex = docsChoose.findIndex((item) => item.index === examIndex);
        if (findExamIndex < 0) {
          const data = {
            index: examIndex,
            data: [docs]
          };

          let newDocs = docsChoose.concat([data]);
          setDocsChoose(newDocs);
        } else {
          const newDocsUrl = docsChoose.map((item, index) => {
            if (item.index === examIndex) {
              return {
                ...item,
                data: item.data.concat([docs])
              };
            }
            return item;
          });
          setDocsChoose(newDocsUrl);
        }
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const handleChooseCamera = () => {
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
        const img = {
          uri: Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.uri,
          type: response.type,
          name: response.fileName || response.uri.substr(response.uri.lastIndexOf('/') + 1)
        };
        if (!imageUri) {
          const data = {
            index: examIndex,
            data: [img]
          };
          setImageUri([data]);
        } else {
          const findExamIndex = imageUri.findIndex((item) => item.index === examIndex);
          if (findExamIndex < 0) {
            const data = {
              index: examIndex,
              data: [img]
            };

            let newArrImage = imageUri.concat(data);
            console.log('new arr image: ', newArrImage);
            setImageUri(newArrImage);
          } else {
            const newArrImageUrl = imageUri.map((item, index) => {
              if (item.index === examIndex) {
                return {
                  ...item,
                  data: item.data.concat([img])
                };
              }
              return item;
            });
            console.log('new arr image url: ', newArrImageUrl);
            setImageUri(newArrImageUrl);
          }
        }
      }
    });
  };

  const handleChoosePhotoLibrary = () => {
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
        const img = {
          uri: Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.uri,
          type: response.type,
          name: response.fileName || response.uri.substr(response.uri.lastIndexOf('/') + 1)
        };
        setAvatr(img);
        if (!imageUri) {
          const data = {
            index: examIndex,
            data: [img]
          };
          setImageUri([data]);
        } else {
          const findExamIndex = imageUri.findIndex((item) => item.index === examIndex);
          if (findExamIndex < 0) {
            const data = {
              index: examIndex,
              data: [img]
            };

            let newArrImage = imageUri.concat(data);
            setImageUri(newArrImage);
          } else {
            const newArrImageUrl = imageUri.map((item, index) => {
              if (item.index === examIndex) {
                return {
                  ...item,
                  data: item.data.concat([img])
                };
              }
              return item;
            });
            setImageUri(newArrImageUrl);
          }
        }
      }
    });
  };

  const _handleChooseFile = (index) => {
    if (index === 0) {
      handleChooseDocument();
    } else if (index === 1) {
      handleChooseCamera();
    } else if (index === 2) {
      handleChoosePhotoLibrary();
    }
  };

  const renderImage = (dataImage) => {
    if (dataImage) {
      if (dataImage[0]) {
        if (dataImage[0].data) {
          const data = dataImage[0].data;
          return (
            <ScrollView
              horizontal
              style={{ flexDirection: 'row', paddingVertical: scaledSize(20) }}>
              {data.map((item, i) => {
                return (
                  <View key={i} style={{ paddingHorizontal: scaledSize(8), position: 'relative' }}>
                    <Avatar
                      source={{ uri: item.uri }}
                      style={{ width: scaledSize(80), height: scaledSize(80) }}
                    />

                    <Icon
                      name="close-circle"
                      type="ionicon"
                      color="black"
                      size={26}
                      containerStyle={{ position: 'absolute', right: -8, top: -18, zIndex: 1000 }}
                      onPress={() => _handleRemoveImage(dataImage[0], i)}
                    />
                  </View>
                );
              })}
            </ScrollView>
          );
        }
      }
      return;
    }
    return;
  };
  const _handleRemoveImage = (data, i) => {
    const findImageIndex = imageUri.findIndex((item) => item.index === data.index);
    const newListImage = imageUri.map((item, index) => {
      if (index === findImageIndex) {
        return {
          ...item,
          data: item.data.filter((item, indexItem) => indexItem !== i)
        };
      }
      return item;
    });
    setImageUri(newListImage);
  };

  const handleRemoveDocsItem = (docsData, indexRemove) => {
    const findDocs = docsChoose.findIndex((item) => item.index === docsData.index);
    const newListDocs = docsChoose.map((item, index) => {
      if (index === findDocs) {
        return {
          ...item,
          data: item.data.filter((item, i) => indexRemove !== i)
        };
      }
      return item;
    });
    setDocsChoose(newListDocs);
  };
  const renderDocuments = (docsData) => {
    if (docsData) {
      if (docsData[0]) {
        if (docsData[0].data) {
          const data = docsData[0].data;
          return (
            <View horizontal style={{ flexDirection: 'column' }}>
              {data.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      paddingVertical: scaledSize(3),
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                    <Text
                      style={{
                        fontSize: scaledSize(14),
                        fontStyle: 'italic',
                        borderBottomWidth: 0.5,
                        color: AppColor.color_main,
                        marginRight: scaledSize(20)
                      }}>
                      {item.name}
                    </Text>
                    <Icon
                      name="trash"
                      type="ionicon"
                      color="red"
                      size={20}
                      onPress={() => handleRemoveDocsItem(docsData[0], index)}
                    />
                  </View>
                );
              })}
              <Text
                style={{
                  fontSize: scaledSize(14),
                  fontStyle: 'italic',
                  borderBottomWidth: 0.5,
                  color: AppColor.color_main
                }}>
                {docsChoose.name}
              </Text>
            </View>
          );
        }
        return;
      }
      return;
    }
    return;
  };

  const handleChooseCateId = (item, i) => {
    if (!listCateId) {
      const data = {
        index: i,
        patientCateId: item.value
      };
      setListCateId([data]);
    } else {
      let findIndexCateId = listCateId.findIndex((item) => item.index === i);
      const data = {
        index: i,
        patientCateId: item.value
      };
      if (findIndexCateId < 0) {
        const newListCateId = listCateId.concat([data]);
        setListCateId(newListCateId);
      } else {
        const newListCate = listCateId.map((item, index) => {
          if (index === findIndexCateId) {
            return data;
          }
          return item;
        });
        setListCateId(newListCate);
      }
    }
  };

  const _renderTestContainer = () => {
    return (
      <View
        style={{
          marginTop: scaledSize(26),
          backgroundColor: AppColor.white,
          flexDirection: 'column',
          padding: scaledSize(16)
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name="medical"
            type="ionicon"
            size={26}
            color={AppColor.color_main}
            style={{
              backgroundColor: `rgba(78, 154, 230, 0.2)`,
              width: scaledSize(28),
              height: scaledSize(28),
              borderRadius: scaledSize(28),
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: scaledSize(10)
            }}
          />
          <Text style={{ fontWeight: '500', fontSize: scaledSize(14) }}>Kết quả xét nghiệm</Text>
        </View>
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'flex-end' }}>
          <TouchableOpacity
            style={{
              marginTop: scaledSize(10),
              borderRadius: scaledSize(5),
              paddingHorizontal: scaledSize(10),
              paddingVertical: scaledSize(5),
              backgroundColor: AppColor.color_main,
              width: '40%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            // onPress={() =>_handleChooseFile()}
            onPress={() => {
              const newArrExam = arrExam.concat(arrExam.length);
              setArrExam(newArrExam);
            }}>
            <Text style={{ color: AppColor.white }}>Thêm xét nghiệm</Text>
          </TouchableOpacity>
        </View>

        {arrExam.map((item, index) => {
          let findImageExam;
          if (imageUri) {
            findImageExam = imageUri.filter((item) => item.index === index);
          }
          let findDocs;
          if (docsChoose) {
            findDocs = docsChoose.filter((item) => item.index === index);
          }
          return (
            <View
              style={{
                flexDirection: 'column',
                paddingBottom: scaledSize(10),
                borderBottomWidth: index !== arrExam.length - 1 ? 0.5 : 0
              }}
              key={index}>
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: scaledSize(16),
                  paddingHorizontal: scaledSize(6),
                  zIndex: 1000,
                  minHeight: isOpenDropdown2 ? 220 : 0
                }}>
                <Text style={{ fontSize: scaledSize(14) }}>Loại xét nghiệm</Text>
                {listCategories && (
                  <DropDownPicker
                    items={listCategories}
                    onOpen={() => setOpenDropdown2(true)}
                    onClose={() => setOpenDropdown2(false)}
                    labelStyle={{
                      fontSize: scaledSize(14),
                      fontWeight: '400',
                      color: AppColor.grey
                    }}
                    containerStyle={{ height: 42, marginTop: scaledSize(16) }}
                    itemStyle={{
                      justifyContent: 'flex-start'
                    }}
                    placeholder="Chọn xét nghiệm"
                    onChangeItem={(item) => handleChooseCateId(item, index)}
                  />
                )}
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: scaledSize(16),
                  paddingHorizontal: scaledSize(6)
                }}>
                <Text style={{ fontSize: scaledSize(14) }}>File đính kèm</Text>
                <TouchableOpacity
                  style={{
                    marginTop: scaledSize(10),
                    borderRadius: scaledSize(5),
                    paddingHorizontal: scaledSize(10),
                    paddingVertical: scaledSize(5),
                    backgroundColor: AppColor.color_main,
                    width: '30%'
                  }}
                  onPress={() => {
                    setExamIndex(index);

                    if (delayRef) {
                      clearTimeout(delayRef.current);
                    }
                    delayRef.current = setTimeout(() => {
                      ActionSheetRef.current.show();
                    }, 300);
                  }}>
                  <Text style={{ color: AppColor.white }}>Chọn file</Text>
                </TouchableOpacity>

                {/* {renderFileData()} */}
                {/* <View style={{ marginTop: scaledSize(16), flexDirection: 'row' }}> */}
                {renderImage(findImageExam)}
                {renderDocuments(findDocs)}
                {/* </View> */}
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const _handleCreateNewExamnination = () => {
    let arrError = [];
    if (!medicalCateChoose) arrError.push('name');
    if (testResult === '') arrError.push('result');
    if (arrError.length > 0) {
      setListError(arrError);
    } else {
      let formData = new FormData();
      formData.append('medicalCateId', medicalCateChoose.value);
      formData.append('examName', testName);
      formData.append('examResult', testResult);
      formData.append('examDate', appointmentInfo.appointmentDate);
      formData.append('appointId', appointmentInfo._id);
      const medical = { ...medicalIndex, lastPeriod: appointmentInfo.appointmentDate };

      for (let [key, value] of Object.entries(medical)) {
        formData.append(`medical[${key}]`, value);
      }

      formData.append(
        'prescribedBy',
        appointmentInfo.doctorId.name && appointmentInfo.doctorId.name
      );
      formData.append('patientId', appointmentInfo.patientId._id);
      if (listCateId) {
        listCateId.map((item, index) => {
          formData.append(`detail[${index}].patientCateId`, item.patientCateId);
          if (imageUri) {
            const findImageExam = imageUri.filter((item) => item.index === index);
            if (findImageExam.length > 0) {
              const imageData = findImageExam[0].data;
              for (let i = 0; i < imageData.length; i++) {
                console.log('image: ', imageData[i]);
                formData.append(`detail[${index}].images`, imageData[i]);
              }
            }
          }
          if (docsChoose) {
            const findDocsExam = docsChoose.filter((item) => item.index === index);
            const docsData = findDocsExam[0].data;
            for (let i = 0; i < docsData.length; i++) {
              formData.append(`detail[${index}].files`, docsData[i]);
            }
            // formData.append(`detail[${index}].files`,findDocsExam[0].data)
          }
        });
      }
      setLoading(true);
      API.createExamination(formData)
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            alert('Trả kết quả thành công');
            const appointmentUpdate = {
              ...appointmentInfo,
              patientState: 'Examined'
            };

            dispatch(AppointmentAction.updateAppointmentItem(appointmentUpdate));
            SiteMap.showScreen(navigation, 'appointment');
          }
        })
        .catch((err) => {
          console.log('Error: ', err);
        });
    }
  };

  const _renderAction = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          margin: scaledSize(20),
          paddingBottom: scaledSize(20)
        }}>
        <ButtonText
          buttonStyle={{ paddingHorizontal: scaledSize(10), width: '45%' }}
          textStyle={{ fontWeight: '500' }}
          title="XÁC NHẬN"
          onPress={() => {
            _handleCreateNewExamnination();
          }}
        />
        <ButtonText
          buttonStyle={{
            paddingHorizontal: scaledSize(10),
            width: '45%',
            backgroundColor: '#b8b6b6'
          }}
          textStyle={{ fontWeight: '500' }}
          title="HUỶ"
          onPress={() => navigation.goBack()}
        />

  
      </View>
    );
  };

  const _renderInputMedicalIndexAction = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          margin: scaledSize(20),
          paddingBottom: scaledSize(20)
        }}>
        {medicalCateChoose && medicalIndexFormData.includes(medicalCateChoose._id) && (
    
          <ButtonText
            buttonStyle={{ paddingHorizontal: scaledSize(10), width: '100%' }}
            textStyle={{ fontWeight: '500' }}
            title="NHẬP CHỈ SỐ"
            onPress={() =>
              SiteMap.showScreen(navigation, ScreenName.MEDICAL_INDEX, {
                code: medicalCateChoose.mediaclCateCode
              })
            }
          />
        )}
      </View>
    );
  };

  const ActionSheetRef = React.useRef();
  return (
    <>
      <SafeAreaView style={styles.container}>
   
        <Header
          navigation
          title={I18n.t('return_exam')}
          isRightButton={false}
          isLeftButton={true}
          onPressLeftButton={() => navigation.goBack()}
          // rightIconName="add-circle"
        />
        <ScrollView style={{ backgroundColor: AppColor.background }}>
          {_renderTestInfo()}
          {_renderTestContainer()}
          {!medicalIndex ? _renderInputMedicalIndexAction() : _renderAction()}
        </ScrollView>
      </SafeAreaView>
      <LoadingScreen visible={isLoading} />
      <ActionSheet
        ref={ActionSheetRef}
        title={'Chọn địa chỉ file'}
        options={['Tài liệu', 'Chụp ảnh', 'Thư viện ảnh', 'Huỷ']}
        cancelButtonIndex={3}
        destructiveButtonIndex={2}
        onPress={(index) => _handleChooseFile(index)}
      />
      
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white
  }
});

export default ReturnExamResultScreen;
