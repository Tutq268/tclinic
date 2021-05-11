import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView
} from 'react-native';
import { Icon, Avatar, Button } from 'react-native-elements';
import { scaledSize,RNToast } from '@utils';
import { AppColor } from '@theme';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { API } from '@services';
import moment from 'moment';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { date } from 'yup';
import { LocaleStorageManager } from '@utils';
import { SiteMap } from "@navigation";
import { ScreenName } from '@constant';
import { Header,ButtonText,LoadingScreen } from '@component';
import I18n from "@locale";

const AddNewPrescription = ({ route, navigation }) => {
  React.useEffect(() => {
    API.getDrugGroup()
      .then((res) => {
        const data = res.data.data;
        const drugGroup = data.map((item) => {
          return {
            label: item.drugGroupName,
            value: item._id
          };
        });
        setDrugGroup(drugGroup);
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  }, []);

  const { patientInfo } = route.params;
  const [drugGroup, setDrugGroup] = React.useState(null);
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [prescriptionName, setPrescriptionName] = React.useState('');
  const [drugItem, setDrugItem] = React.useState(null);
  const [advice, setAdvice] = React.useState('');
  const [diseases, setDiseases] = React.useState('');
  const [loadingChooseDrugGroup, setLoadingChooseDrugGroup] = React.useState(false);
  const [drugCategory, setDrugCategory] = React.useState(null);
  const [drugCount, setDrugCount] = React.useState('');
  const [drugUse, setDrugUse] = React.useState('');
  const [drugChoose, setDrugChoose] = React.useState(null);
  const [errAddDrug, setErrAddDrug] = React.useState([]);
  const [listDrug, setListDrug] = React.useState([]);
  const [listDiseases, setListDiseases] = React.useState(null);
  const [isEmptyDiseases, setIsEmptyDiseases] = React.useState(false);
  const [diseasesChoose, setDiseasesChoose] = React.useState(null);
  const [errCreate, setErrCreate] = React.useState([]);
  const diseasesRef = React.useRef(null);
  const [isLoading,setLoading] = React.useState(false)
  const [isOpenDrop1,setIsOpenDrop1] = React.useState(false)
  const [isOpenDrop2,setIsOpenDrop2] = React.useState(false)
  const handleFindDiseases = (searchText) => {
    setDiseases(searchText);
    if (diseasesRef) {
      clearTimeout(diseasesRef.current);
    }
    const keySearchLength = searchText.split('').length;
    diseasesRef.current = setTimeout(() => {
      if (keySearchLength > 3) {
        API.findiseases(searchText)
          .then((res) => {
            console.log("res: ",res)
            if (res.status === 200) {
              const data = res.data;
            
              if (data.data.length > 0) {
                const listDiseases = data.data.map((item) => {
                  return {
                    ...item,
                    label: item.diseaseName,
                    value: item._id
                  };
                });
                setListDiseases(listDiseases);
                setIsEmptyDiseases(false);
              } else {
                setIsEmptyDiseases(true);
              }
            }
          })
          .catch((err) => {
            console.log('Err: ', err);
          });
      } else if (keySearchLength === 0) {
        setListDiseases(null);
        setIsEmptyDiseases(false);
      }
    }, 600);
  };

  const _renderInfoPrescription = () => {
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
          <Text style={{ fontWeight: '500', fontSize: scaledSize(14) }}>Thông tin đơn thuốc</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginTop: scaledSize(20),
            paddingLeft: scaledSize(6)
          }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: scaledSize(14) }}>Tên đơn thuốc</Text>
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
              value={prescriptionName}
              onChangeText={(text) => {
                const newArrError = errCreate.filter((item) => item !== 'name');
                setErrCreate(newArrError);
                setPrescriptionName(text);
              }}
            />
            {errCreate.includes('name') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>
                Bạn chưa điền tên đơn thuốc
              </Text>
            )}
          </View>
          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Lời dặn</Text>
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
              value={advice}
              onChangeText={(text) => {
                const newArrError = errCreate.filter((item) => item !== 'advice');
                setErrCreate(newArrError);
                setAdvice(text);
              }}
            />
            {errCreate.includes('advice') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>
                Bạn chưa điền lời khuyên
              </Text>
            )}
          </View>

          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text style={{ fontSize: scaledSize(14) }}>Chuẩn đoán</Text>
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
              value={diseases}
              onChangeText={(text) => {
                const newArrError = errCreate.filter((item) => item !== 'diseases');
                setErrCreate(newArrError);
                handleFindDiseases(text);
              }}
            />
            {errCreate.includes('diseases') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Bạn chưa chọn bệnh</Text>
            )}
          </View>
          {listDiseases && (
            <View style={{ flexDirection: 'column', marginTop: scaledSize(16), zIndex: 1000 }}>
              <Text style={{ fontSize: scaledSize(14), marginBottom: scaledSize(10) }}>
                Chọn chuẩn đoán bệnh
              </Text>
              <DropDownPicker
                items={listDiseases}
                labelStyle={{
                  fontSize: scaledSize(14),
                  fontWeight: '400',
                  color: AppColor.grey,
                  zIndex: 1000
                }}
                containerStyle={{ height: 42 }}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                placeholder="Chọn bệnh"
                onChangeItem={(item) => setDiseasesChoose(item)}
              />
            </View>
          )}
          {isEmptyDiseases && (
            <View style={{ marginTop: scaledSize(10) }}>
              <Text style={{ fontSize: scaledSize(14), textAlign: 'center', color: 'grey' }}>
                Không tìm thấy bệnh
              </Text>
            </View>
          )}
          {_renderListPrescription()}
        </View>
      </View>
    );
  };
  const _renderListPrescription = () => {
    return (
      <View
        style={{
          marginTop: scaledSize(26),
          backgroundColor: AppColor.white,
          flexDirection: 'column',
          zIndex: 100
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
          <Text style={{ fontWeight: '500', fontSize: scaledSize(14) }}>Danh sách thuốc</Text>
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: scaledSize(10)
          }}>
          <Button
            title="Thêm thuốc"
            type="clear"
            containerStyle={{
              backgroundColor: AppColor.color_main,
              paddingHorizontal: scaledSize(6),
              borderWidth: 0,
              width: '50%'
            }}
            titleStyle={{ color: AppColor.white, fontSize: scaledSize(13), fontWeight: '500' }}
            onPress={() => {
              setIsOpenModal(true);
              setErrCreate([]);
            }}
          />
        </View>
        {errCreate.includes('drug') && (
          <Text style={{ color: 'red', marginTop: scaledSize(5) }}>
            Danh sách thuốc không được để trống
          </Text>
        )}
        {listDrug.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              borderBottomWidth: 0.3,
              paddingBottom: scaledSize(10),
              borderBottomColor: 'gray',
              alignItems: 'flex-start',
              marginTop: scaledSize(16)
            }}>
            <View style={{ flex: 0.1, justifyContent: 'flex-start' }}>
              <Text style={{ fontWeight: '500' }}>STT</Text>
            </View>
            <View style={{ flex: 0.5, justifyContent: 'flex-start' }}>
              <Text style={{ fontWeight: '500' }}>Tên thuốc</Text>
            </View>
            <View style={{ flex: 0.2, justifyContent: 'flex-start' }}>
              <Text style={{ fontWeight: '500' }}>ĐVT</Text>
            </View>
            <View style={{ flex: 0.2, justifyContent: 'flex-start' }}>
              <Text style={{ fontWeight: '500' }}>Số lượng</Text>
            </View>
          </View>
        )}

        {listDrug.length > 0 && (
          <FlatList
            style={{ width: '100%', paddingVertical: scaledSize(10) }}
            data={listDrug}
            renderItem={(item, index) => _renderItem(item, index)}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    );
  };

  const handleChooseDrug = (item) => {
    const drugGroupId = item.value;
    setLoadingChooseDrugGroup(true);
    setDrugChoose(null);
    setDrugCategory(null);
    API.getDrugCategory(drugGroupId)
      .then((res) => {
        const data = res.data.data;
        const drugCategory = data.map((item) => {
          return {
            ...item,
            label: item.tenhh,
            value: item._id
          };
        });
        setDrugCategory(drugCategory);
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  };

  const _handleAddDrugItem = () => {
    let addDrugErr = [];
    if (!drugChoose) addDrugErr.push('drugname');
    if (drugCount === "") addDrugErr.push('drugcount');
    if (drugUse === '') addDrugErr.push('druguse');
    if (addDrugErr.length === 0) {
      const drugItem = {
        _id: drugChoose._id,
        tenhh: drugChoose.tenhh,
        tendonvitinh: drugChoose.tendonvitinh,
        quantity: drugCount,
        howtouse: drugUse
      };
      const newListDrug = listDrug.concat([drugItem]);
      setListDrug(newListDrug);
      setIsOpenModal(false);
      setDrugChoose(null);
      setDrugCategory(null);
      setDrugCount(0);
      setDrugUse('');
    } else {
      setErrAddDrug(addDrugErr);
    }
  };

  const _renderItem = (item, index) => {
    const data = item.item;
    return (
      <View
        key={item.index}
        style={{
          flexDirection: 'column',
          marginTop: scaledSize(16),
          borderBottomWidth: 0.3,
          borderBottomColor: 'gray',
          paddingBottom: scaledSize(10)
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            paddingBottom: scaledSize(10),
            alignItems: 'flex-start'
          }}>
          <View style={{ flex: 0.1, justifyContent: 'flex-start' }}>
            <Text style={{ fontWeight: '500' }}>{item.index + 1}</Text>
          </View>
          <View style={{ flex: 0.5, justifyContent: 'flex-start' }}>
            <Text style={{ fontWeight: '500' }}>{data.tenhh}</Text>
          </View>
          <View style={{ flex: 0.2, justifyContent: 'flex-start' }}>
            <Text style={{ fontWeight: '500' }}>{data.tendonvitinh}</Text>
          </View>
          <View style={{ flex: 0.2, justifyContent: 'flex-start' }}>
            <Text style={{ fontWeight: '500' }}>{data.quantity}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <View style={{ flex: 0.1 }}></View>
          <View
            style={{
              flex: 0.9,
              backgroundColor: 'rgba(193, 204, 110,0.6)',
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingHorizontal: scaledSize(16),
              borderWidth: 0.5,
              borderStyle: 'dashed'
            }}>
            <Text
              style={{
                fontSize: scaledSize(13),
                fontStyle: 'italic',
                color: 'gray',
                paddingVertical: scaledSize(6)
              }}>
              {data.howtouse}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const _renderModal = () => {
    return (
      <Modal
        isVisible={isOpenModal}
        onModalHide={() => setIsOpenModal(false)}
        containerStyle={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'column',
            padding: scaledSize(32),
            backgroundColor: AppColor.white
          }}>
          <Text
            style={{
              fontSize: scaledSize(26),
              color: AppColor.color_main,
              fontWeight: '500',
              textAlign: 'center'
            }}>
            Thêm thuốc
          </Text>
          <View style={{ flexDirection: 'column', zIndex: 1000, marginTop: scaledSize(20),minHeight: isOpenDrop1 ? 220 :0 }}>
            <Text
              style={{ fontWeight: '500', fontSize: scaledSize(14), marginBottom: scaledSize(10) }}>
              Chọn nhóm thuốc
            </Text>
            {drugGroup && (
              <DropDownPicker
              onOpen={() => setIsOpenDrop1(true)}
              onClose={() => setIsOpenDrop1(false)}
                items={drugGroup}
                labelStyle={{
                  fontSize: scaledSize(14),
                  fontWeight: '400',
                  color: AppColor.grey,
                  zIndex: 1000
                }}
                containerStyle={{ height: 42 }}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                placeholder="Chọn nhóm thuốc"
                onChangeItem={(item) => handleChooseDrug(item)}
              />
            )}
          </View>

          {drugCategory && (
            <View style={{ flexDirection: 'column', zIndex: 999, marginTop: scaledSize(12),minHeight: isOpenDrop2 ? 220 : 0 }}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: scaledSize(14),
                  marginBottom: scaledSize(10)
                }}>
                Chọn thuốc
              </Text>

              <DropDownPicker
                items={drugCategory}
                onOpen={() => setIsOpenDrop2(true)}
                onClose={() => setIsOpenDrop2(false)}
                labelStyle={{ fontSize: scaledSize(14), fontWeight: '400', color: AppColor.grey }}
                containerStyle={{ height: 42 }}
                searchableError={() => <Text>Chưa có thuốc trong danh mục này</Text>}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                placeholder="Chọn thuốc"
                onChangeItem={(item) => setDrugChoose(item)}
              />
              {errAddDrug.includes('drugcount') && (
                <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Bạn chưa chọn thuốc</Text>
              )}
            </View>
          )}

          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text
              style={{ fontWeight: '500', fontSize: scaledSize(14), marginBottom: scaledSize(10) }}>
              Số lượng
            </Text>
            <TextInput
              style={{
                paddingVertical: scaledSize(8),
                paddingHorizontal: scaledSize(10),
                borderWidth: 0.3,
                borderColor: '#ababab',
                width: '100%',
                backgroundColor: AppColor.white,
                fontSize: scaledSize(14)
              }}
              keyboardType="numeric"
              value={drugCount}
              onChangeText={(text) => setDrugCount(text)}
            />
            {errAddDrug.includes('drugcount') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>Bạn chưa điền số lượng</Text>
            )}
          </View>

          <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
            <Text
              style={{ fontWeight: '500', fontSize: scaledSize(14), marginBottom: scaledSize(10) }}>
              Cách sử dụng
            </Text>
            <TextInput
              style={{
                paddingVertical: scaledSize(8),
                paddingHorizontal: scaledSize(10),
                borderWidth: 0.3,
                borderColor: '#ababab',
                width: '100%',
                backgroundColor: AppColor.white,
                fontSize: scaledSize(14)
              }}
              keyboardType="numeric"
              value={drugUse}
              onChangeText={(text) => setDrugUse(text)}
            />
            {errAddDrug.includes('druguse') && (
              <Text style={{ color: 'red', marginTop: scaledSize(5) }}>
                Bạn chưa điền cách dùng
              </Text>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: scaledSize(25),
              justifyContent: 'space-between'
            }}>
               <ButtonText
              buttonStyle={{ paddingHorizontal: scaledSize(10), width: '45%' }}
              textStyle={{ fontWeight: '500' }}
              title={I18n.t('confirm')}
              onPress={() => _handleAddDrugItem()}
            />
            <ButtonText
              buttonStyle={{
                paddingHorizontal: scaledSize(10),
                width: '45%',
                backgroundColor: 'transparent',
                borderWidth: 0.5
              }}
              textStyle={{ fontWeight: '500', color: 'black' }}
              title={I18n.t('cancel')}
              onPress={() => {
                setIsOpenModal(false);
              }}
            />
            {/* <Button
              title="Xác nhận"
              type="clear"
              containerStyle={{
                backgroundColor: AppColor.color_main,
                paddingHorizontal: scaledSize(6),
                borderWidth: 0,
                width: '45%'
              }}
              titleStyle={{ color: AppColor.white, fontSize: scaledSize(13), fontWeight: '500' }}
                disabled={isLoading ? true : false}
              onPress={() => _handleAddDrugItem()}
            />
            <Button
              title="Huỷ"
              type="clear"
              containerStyle={{
                paddingHorizontal: scaledSize(6),
                borderWidth: 0.5,
                marginLeft: scaledSize(10),
                width: '45%'
              }}
              titleStyle={{ color: 'black', fontSize: scaledSize(13), fontWeight: '500' }}
              onPress={() => {
                setIsOpenModal(false);
              }}
            /> */}
          </View>
        </View>
      </Modal>
    );
  };
  const handleConfirmCreateNewPrescription = async () => {
    let arrError = [];
    if (!diseasesChoose) arrError.push('diseases');
    if (prescriptionName === '') arrError.push('name');
    if (advice === '') arrError.push('advice');
    if (listDrug.length === 0) arrError.push('drug');

    if (arrError.length === 0) {
        const listDrugParams = listDrug.map(item =>{
            return{
                drugCateId: item._id,
                howtouse: item.howtouse,
                quantity: item.quantity
            }
        })
        const doctorId = await LocaleStorageManager.getUserId();
      const params = {
        createdBy: doctorId,
        diseaseId: diseasesChoose._id,
        drugs: listDrugParams,
        patientId: patientInfo._id,
        prescriptionDate: moment(Date.now()).format(),
        prescriptionName: prescriptionName,
        prescriptionNote: advice
      };
      setLoading(true)
      API.createNewPrescription(params).then(res =>{
          if(res.status === 200){
              setLoading(false)
            const data = res.data
            RNToast.showText(data.message)
            SiteMap.showScreen(navigation, ScreenName.PATIENT_PRESCRIPTION,  { newPrescription: data.data })
          }
      }).catch(err =>{
          console.log("err: ",err)
      })
    } else {
      setErrCreate(arrError);
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
              title={I18n.t('confirm')}
              onPress={() => handleConfirmCreateNewPrescription()}
            />
            <ButtonText
              buttonStyle={{
                paddingHorizontal: scaledSize(10),
                width: '45%',
                backgroundColor: 'transparent',
                borderWidth: 0.5
              }}
              textStyle={{ fontWeight: '500', color: 'black' }}
              title={I18n.t('cancel')}
              onPress={() => navigation.goBack()}
            />
        {/* <Button
          title="XÁC NHẬN"
          type="clear"
          containerStyle={{
            width: '45%',
            paddingHorizontal: scaledSize(6),
            borderWidth: 0.5,
            marginLeft: scaledSize(10),
            backgroundColor: AppColor.color_main
          }}
          titleStyle={{ color: AppColor.white, fontSize: scaledSize(13), fontWeight: '500' }}
          onPress={() => handleConfirmCreateNewPrescription()}
        />

        <Button
          title="HUỶ"
          type="clear"
          containerStyle={{
            paddingHorizontal: scaledSize(16),
            backgroundColor: '#b8b6b6',
            width: '45%'
          }}
          titleStyle={{ color: AppColor.white, fontSize: scaledSize(13), fontWeight: '500' }}
          onPress={() => navigation.goBack()}
        /> */}
      </View>
    );
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
 
         <Header
          onPressLeftButton={() => navigation.goBack()}
          title= {I18n.t("add_new_prescription")}
          // isRightButton={true}
          isLeftButton={true}
          // rightIconName="add-circle"
        />
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between',backgroundColor:AppColor.background }}>
          <KeyboardAwareScrollView>{_renderInfoPrescription()}</KeyboardAwareScrollView>
          {_renderAction()}
        </View>
      </SafeAreaView>
      <LoadingScreen visible={isLoading} />
      {_renderModal()}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:AppColor.white
  }
});

export default AddNewPrescription;
