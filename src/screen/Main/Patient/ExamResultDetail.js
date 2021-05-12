import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Modal,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { scaledSize } from '@utils';
import { AppColor } from '@theme';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { API } from '@services';
import { URL } from '@constant';
import moment from 'moment';
import ImageViewer from 'react-native-image-zoom-viewer';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import I18n from "@locale";
import {Header,MedicalDetail} from  '@component';

const ExamResultDetail = ({ route, navigation }) => {
  const { examInfo } = route.params;
  console.log("exam info: ",examInfo)
  const [isOpenModal, setOpenModal] = React.useState(false);
  const [imagesViewFull, setImagesViewFull] = React.useState(null);
  // const viewerModal = React.useRef(null)
  const _renderExamInfo = () => {
    return (
      <View
        style={{
          backgroundColor: AppColor.white,
          marginTop: scaledSize(16),
          padding: scaledSize(16),
          width: '100%',
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
          <Text style={{ fontWeight: '500', fontSize: scaledSize(14) }}>Thông tin</Text>
        </View>

        <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
          <Text style={{ fontSize: scaledSize(14) }}>Tên xét nghiệm</Text>
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
            value={examInfo.medicalCateId.medicalCateName}
            editable={false}
          />
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
            value={moment(examInfo.createdAt).format('DD/MM/yyyy')}
            editable={false}
          />
        </View>
        <View style={{ flexDirection: 'column', marginTop: scaledSize(16) }}>
          <Text style={{ fontSize: scaledSize(14) }}>Kết quả</Text>
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
            value={examInfo.examResult}
            editable={false}
          />
        </View>
      </View>
    );
  };

  const renderImage = (items) => {
    const images = items.map((item) => {
      if (item.path) {
        const filename = item.path.split('uploads/')[1];
        return {
          url: URL.host + '/resources/' + filename
        };
      }
    });
    return (
      <View style={{ flexDirection: 'row', width: '100%', flexWrap: 'wrap' }}>
        {items.map((item, index) => {
          let avatar;
          if (item.path) {
            const filename = item.path.split('uploads/')[1];
            avatar = URL.host + '/resources/' + filename;
          }
          return (
            <TouchableOpacity
              key={index}
              style={{ marginHorizontal: scaledSize(5), marginVertical: scaledSize(5) }}
              onPress={() => {
                setImagesViewFull(images);
                setOpenModal(true);
                // viewerModal.current.open()
              }}>
              <Avatar source={{ uri: avatar }} size={60} />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderFiles = (items) => {
    return (
      <View style={{ flexDirection: 'column', width: '100%' }}>
        {items.map((item, index) => {
          const filename = item.path?.split('uploads/')[1];

          let url = URL.host + '/resources/' + filename;
          const localFile = `${RNFS.DocumentDirectoryPath}/${item.filename}`;
          const options = {
            fromUrl: url,
            toFile: localFile
          };
          return (
            <TouchableOpacity
              style={{ marginVertical: scaledSize(5) }}
              key={index}
              onPress={() => {
                RNFS.downloadFile(options)
                  .promise.then(() => FileViewer.open(localFile))
                  .then(() => {
                    // success
                  })
                  .catch((error) => {
                    // error
                  });
              }}>
              <Text
                style={{
                  fontSize: scaledSize(14),
                  fontStyle: 'italic',
                  borderBottomWidth: 0.5,
                  color: AppColor.color_main
                }}>
                {item.filename}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const _renderListResult = () => {
    const details = examInfo.detail;
    return (
      <ScrollView
        style={{
          marginTop: scaledSize(16),
          flexDirection: 'column'
          // paddingHorizontal: scaledSize(16)
        }}>
        {details.map((item, index) => {
          let files = [];
          let images = [];
          item.files.map((item) => {
            const spilitItem = item.path.split('.');
            const type = spilitItem[spilitItem.length - 1];
            if (type === 'png' || type === 'jpg' || type === 'jpeg') {
              images.push(item);
            } else {
              files.push(item);
            }
          });
          return (
            <View
              key={index}
              style={{
                backgroundColor: AppColor.white,
                borderWidth: scaledSize(0.1),
                borderColor: '#d1d1d1',
                marginVertical: scaledSize(5)
              }}>
              <View
                style={{
                  width: '100%',
                  borderBottomColor: '#d7d7d9',
                  borderBottomWidth: scaledSize(0.1)
                }}>
                <View
                  style={{
                    width: '100%',
                    paddingVertical: scaledSize(8),
                    paddingHorizontal: scaledSize(16),
                    // justifyContent: 'space-between',
                    flexDirection: 'row'
                  }}>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: scaledSize(13),
                      color: 'blue',
                      marginRight: scaledSize(16)
                    }}>
                    {index + 1}.
                  </Text>
                  <Text style={{ fontWeight: '500', fontSize: scaledSize(13), color: 'blue' }}>
                    {item.patientCateId.name}
                  </Text>
                </View>
              </View>
              {item.files.length > 0 ? (
                <View style={{ padding: scaledSize(16), flexDirection: 'column' }}>
                  {images.length > 0 && renderImage(images)}
                  {files.length > 0 && renderFiles(files)}
                </View>
              ) : (
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: scaledSize(16)
                  }}>
                  <Text style={{ fontSize: scaledSize(14), color: 'grey' }}>
                    không có file đính kèm
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    );
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
         <Header
          navigation
          title= {I18n.t("exam_result")}
          isRightButton={false}
          isLeftButton={true}
          onPressLeftButton={() => navigation.goBack()}
          // rightIconName="add-circle"
        />
        <ScrollView style={{ flex: 1, flexDirection: 'column', backgroundColor: AppColor.background,marginBottom:scaledSize(16) }}>
          {_renderExamInfo()}
          {examInfo.medical && <MedicalDetail mediaclCateCode={examInfo.medicalCateId._id} medicalInfo={examInfo.medical} />}
          {examInfo.detail.length > 0 && _renderListResult()}
        </ScrollView>
      </SafeAreaView>
      {imagesViewFull && (
        <Modal style={{ flex: 1 }} visible={isOpenModal}>
          {/* <View style={{height: '100%',backgroundColor:'black',justifyContent:'center',position:'relative' }}> */}
          {/* <View style={{height: '80%' }}> */}
          <ImageViewer
            style={{ flex: 1 }}
            //  ref={imageViewer}
            imageUrls={imagesViewFull}
            saveToLocalByLongPress={false}
          />
          {/* </View> */}
          <TouchableOpacity
            onPress={() => {
              setOpenModal(false);
            }}
            style={{
              backgroundColor: 'white',
              borderRadius: 30,
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 36,
              right: 16,
              zIndex: 1000
            }}>
            <Icon name="close" color="black" type="ionicon" size={25} />
          </TouchableOpacity>
          {/* </View> */}
        </Modal>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white
  }
});

export default ExamResultDetail;
