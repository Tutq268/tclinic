import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { AppColor } from '@theme';
import { scaledSize } from '@utils';
import { SiteMap } from '@navigation';
import { ScreenName } from '@constant';
import { LocaleStorageManager } from '@utils';
import I18n from '@locale';
import {
  PreLabor,
  Internal,
  Gynaecological,
  AntenatalCare,
  Breasts,
  Header,
  Tips,
  ReproductiveSupport,
  LatePeriod,
  Infertility
} from '@component';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { AppointmentAction } from '@redux';

const MedicalIndexScreen = ({ route, navigation }) => {
  const { code } = route.params;
  const dispatch = useDispatch();

  const handleGetMedicalIndex = (data) => {
    dispatch(AppointmentAction.saveMedicalIndex(data));
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation
        title={I18n.t('medical_index')}
        isRightButton={false}
        isLeftButton={true}
        onPressLeftButton={() => navigation.goBack()}
        // rightIconName="add-circle"
      />
      <View style={{ flex: 1, backgroundColor: AppColor.background }}>
        {code === 'Prelabor' && <PreLabor medicalIndex={(data) => handleGetMedicalIndex(data)} />}
        {code === 'Internal' && <Internal medicalIndex={(data) => handleGetMedicalIndex(data)} />}
        {code === 'Gynecological' && (
          <Gynaecological medicalIndex={(data) => handleGetMedicalIndex(data)} />
        )}
        {(code === 'AntenatalCareQ3' ||
          code === 'AntenatalCareQ2' ||
          code === 'AntenatalCareQ1') && (
          <AntenatalCare medicalIndex={(data) => handleGetMedicalIndex(data)} />
        )}
        {code === 'Breast' && <Breasts medicalIndex={(data) => handleGetMedicalIndex(data)} />}
        {code === 'Tips' && <Tips medicalIndex={(data) => handleGetMedicalIndex(data)} />}
        {code === 'ReproductiveSupport' && <ReproductiveSupport medicalIndex={(data) => handleGetMedicalIndex(data)} />}
        {code === 'LatePeriod' && <LatePeriod medicalIndex={(data) => handleGetMedicalIndex(data)} />}
        {code === 'Infertility' && <Infertility medicalIndex={(data) => handleGetMedicalIndex(data)} />}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white
  },
  settingItem: {
    padding: scaledSize(16),
    flexDirection: 'column',
    backgroundColor: AppColor.white,
    borderBottomWidth: 0.5,
    borderBottomColor: '#919191'
  }
});
export default MedicalIndexScreen;
