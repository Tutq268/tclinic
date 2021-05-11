import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { Icon } from 'react-native-elements';
import { scaledSize } from '@utils';
import { AppColor } from '@theme';
import { AppointmentList, AppointmentListVideo, Header } from '@component';
import { SiteMap } from '@navigation';
import { API } from '@services';
import { ScreenName } from '@constant';
import I18n from '@locale';

const AppointmentScreen = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: I18n.t('at_room') },
    { key: 'second', title: I18n.t('at_video') }
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'blue', height: 1 }}
      style={{ backgroundColor: 'transparent', textColor: 'red' }}
      renderLabel={({ route, focused, color }) => {
        return (
          <Text
            style={{
              color: focused ? AppColor.color_main : 'gray',
              fontSize: scaledSize(14),
              fontWeight: 'bold'
            }}>
            {route.title}
          </Text>
        );
      }}
      style={{ backgroundColor: 'white' }}
      //   onTabPress={(route) =>alert(JSON.stringify(route.route.key))}
    />
  );

  const AppointmentListComponent = React.useCallback(() => {
    return (
      <>
        <AppointmentList
          showAppointmentDetail={(data) => {
            SiteMap.showScreen(navigation, ScreenName.APPOINTMENT_DETAIL, {
              appointmentInfo: data
            });
          }}
        />
      </>
    );
  }, []);

  const AppointmentListVideoComponent = React.useCallback(() => {
    return (
      <>
        <AppointmentListVideo
          showAppointmentDetail={(data) =>
            SiteMap.showScreen(navigation, ScreenName.APPOINTMENT_DETAIL, { appointmentInfo: data })
          }
        />
      </>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation
        title={I18n.t('your_appointment')}
        isRightButton={true}
        isLeftButton={false}
        onPress={() => SiteMap.showScreen(navigation, ScreenName.CREATE_APPOINTMENT)}
        rightIconName="add-circle"
      />
      <TabView
        style={{ flex: 1 }}
        sceneContainerStyle={{ backgroundColor: AppColor.background }}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={SceneMap({
          first: AppointmentListComponent,
          second: AppointmentListVideoComponent
        })}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});
export default AppointmentScreen;
