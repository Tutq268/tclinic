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
  SafeAreaView
} from 'react-native';
import { ListItem, Avatar, SearchBar, Icon } from 'react-native-elements';
import { API } from '@services';
import { AppColor } from '@theme';
import { scaledSize } from '@utils';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { SiteMap } from '@navigation';
import { ScreenName } from '@constant';
import I18n from '@locale';

const SearchUserScreen = ({ navigation }) => {
  const searchRef = React.useRef(null);
  const [searchText, setSearchText] = React.useState('');
  const [listUser, setListUser] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);

  const _handleSearchPatient = (text) => {
    setSearchText(text);
    if (searchRef) {
      clearTimeout(searchRef.current);
    }
    searchRef.current = setTimeout(() => {
      setLoading(true);
      API.searchPatient(text, 1)
        .then((res) => {
          if (res.status === 200) {
            const data = res.data.result;
            console.log('data: ', data);
            setListUser(data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log('err: ', err);
        });
    }, 600);
  };

  const renderListPatient = () => {
    return (
      <FlatList
        style={{ flex: 1, width: '100%', paddingHorizontal: scaledSize(10) }}
        data={listUser}
        renderItem={(item, index) => _renderItem(item, index)}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>{'Không tìm thấy bệnh nhân'}</Text>
          </View>
        )}
      />
    );
  };

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          SiteMap.showScreen(navigation, ScreenName.CREATE_APPOINTMENT, { patientInfo: item })
        }>
        <ListItem
          key={index}
          bottomDivider
          style={{ flex: 1, width: '100%', paddingVertical: scaledSize(5) }}>
          <Avatar
            title={item.firstname.split('')[0]}
            size={46}
            rounded
            containerStyle={{ backgroundColor: AppColor.color_main }}
          />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '500' }}>{item.name}</ListItem.Title>
            {item.email && (
              <ListItem.Subtitle style={{ color: 'grey' }}>{item.email}</ListItem.Subtitle>
            )}
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: AppColor.white,
          marginBottom: scaledSize(10),
          paddingBottom: scaledSize(10),
          paddingHorizontal: scaledSize(10)
        }}>
        <View
          style={{
            backgroundColor: AppColor.white,
            paddingBottom: scaledSize(10),
            flexDirection: 'row'
          }}>
          <Icon
            name="chevron-back-outline"
            onPress={() => navigation.goBack()}
            type="ionicon"
            containerStyle={{ width: scaledSize(36) }}
          />
          <View style={{ flex: 1, marginLeft: scaledSize(30) }}>
            <Text
              style={{ fontWeight: '800', fontSize: scaledSize(22), paddingBottom: scaledSize(6) }}>
              {I18n.t('search_patient')}
            </Text>
          </View>
        </View>
        <SearchBar
          lightTheme
          searchIcon={{ size: 24 }}
          containerStyle={{
            backgroundColor: AppColor.white,
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            paddingHorizontal: 0
          }}
          inputContainerStyle={{
            backgroundColor: '#edeef0',
            borderColor: '#d7d7d9',
            borderWidth: 1,
            borderBottomWidth: 1
          }}
          onChangeText={(text) => _handleSearchPatient(text)}
          onClear={(text) => setSearchText('')}
          placeholder="Tìm kiếm bệnh nhân"
          value={searchText}
        />
      </View>
      <View style={{ backgroundColor: AppColor.background, flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator
            style={{ marginTop: scaledSize(20) }}
            animating={isLoading}
            size="large"
            color={AppColor.color_main}
          />
        ) : listUser ? (
          renderListPatient()
        ) : null}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white
  }
});
export default SearchUserScreen;
