import React from 'react';
import { View, Image, TouchableOpacity,Dimensions } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import Svg, { Path } from 'react-native-svg';
import {
  HomeScreen,
  AppointmentScreen,
  PatientScreen,
  ProfileScreen,
  QuestionListScreen
} from '@screen';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { AppColor } from '@theme';
import { Icon } from 'react-native-elements';
// import { TabbarIcon } from '@component';
import TabIcon from './../component/TabbarIcon'

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialLayout={{ width: Dimensions.get('window').width }}
      tabBarPosition="top"
      backBehavior="none"
      headerMode="none"
      initialRouteName="home"
      tabBarOptions={{
        inactiveBackgroundColor: 'white',
        inactiveTintColor: 'grey',
        activeTintColor: AppColor.color_main,
        labelStyle:{
            fontSize:12
        },
        style: {
            paddingTop:5,
          shadowColor: AppColor.color_main,
          shadowOffset: {
            width: 0,
            height: -1
          },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 3
        }
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel:"Trang chủ",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} name={'home'} color={color} />
          ),
         
        }}
      />
      <Tab.Screen
         name="appointment"
         component={AppointmentScreen}
        options={{
          tabBarLabel: "Lịch hẹn",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} name={'calendar'} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="patient"
        component={PatientScreen}
        options={{
          tabBarLabel: 'Bệnh nhân',
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} name={'thermometer'} color={color} />
          )
        }}
      />
      <Tab.Screen
         name="question"
         component={QuestionListScreen}
        options={{
          tabBarLabel:"Tư vấn",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} name={'chatbubbles'} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="User"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Hồ sơ',
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} name={'person-circle'} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
