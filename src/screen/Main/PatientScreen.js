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
import { ListItem, Avatar, SearchBar } from 'react-native-elements';
import { API } from '@services';
import { AppColor } from '@theme';
import { scaledSize } from '@utils';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { SiteMap } from '@navigation';
import { ScreenName } from '@constant';
import { Header } from '@component';
import I18n from "@locale";

const PatientScreen = ({ navigation }) => {
  const patientRef = React.useRef(null);
  const searchRef = React.useRef(null)
  const [page, setPage] = React.useState(1);
  const [pageSearch,setPageSearch] = React.useState(1)
  const [totalSearch,setTotalSearch] = React.useState(null)
  const [listPatient, setListPatient] = React.useState(null);
  const [patientCount, setPatientCount] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  const [firstLoading, setFirstLoading] = React.useState(false);
  const [listPatientSearch,setListPatientSearch] = React.useState(null)
  const [searchText, setSearchText] = React.useState('');
  React.useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    getAllPatient(1);
  }, []);

  const getAllPatient = (page) => {
    setLoading(true);
    // setFirstLoading(true);
    API.getAllPatient(page)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          console.log("data: ",data)
          setListPatient(data.result);
          setPatientCount(data.total);
        }
        setLoading(false);
        // setFirstLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setFirstLoading(false);
        console.log('err: ', err);
      });
  };

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          SiteMap.showScreen(navigation, ScreenName.PATIENT_INFO, { patientInfo: item })
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
          {/* <Text>{item.name}</Text> */}
          <ListItem.Title style={{ fontWeight: '500' }}>{item.name}</ListItem.Title>
        
              <ListItem.Subtitle style={{ color: 'grey' }}>{item.email}</ListItem.Subtitle>
          </ListItem.Content>
          
        </ListItem>
      </TouchableOpacity>
    );
  };

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    API.getAllPatient(1)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          setListPatient(data.result);
          setPatientCount(data.total);
          setTotalSearch(null)
          setPageSearch(1)
          setListPatientSearch(null)
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log('err: ', err);
      });
  }, []);

  const renderListPatient = () => {
    return (
      <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
        ref={patientRef}
        style={{ flex: 1, width: '100%', paddingHorizontal: scaledSize(10),backgroundColor:AppColor.background,paddingTop:scaledSize(10) }}
        data={listPatientSearch ? listPatientSearch : listPatient}
        renderItem={(item, index) => _renderItem(item, index)}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if(listPatientSearch){
            let newPageSearch = pageSearch + 1;
            if (totalSearch - listPatientSearch.length > 0 && !isLoading) {
              setLoading(true);
              API.searchPatient(newPageSearch)
                .then((res) => {
                  setLoading(false);
                  if (res.status === 200) {
                    const data = res.data;
                    const newListPatientSearch = listPatientSearch.concat(data.result);
                    setPageSearch(newPage);
                    setListPatientSearch(newListPatientSearch);
                  }
                })
                .catch((err) => {
                  setLoading(false);
                  console.log('err: ', err);
                });
            } else {
              return;
            }
          }else{
            let newPage = page + 1;
            if (patientCount - listPatient.length > 0 && !isLoading) {
              setLoading(true);
              API.getAllPatient(newPage)
                .then((res) => {
                  setLoading(false);
                  if (res.status === 200) {
                    const data = res.data;
                    const newListPatient = listPatient.concat(data.result);
                    setPage(newPage);
                    setListPatient(newListPatient);
                  }
                })
                .catch((err) => {
                  setLoading(false);
                  console.log('err: ', err);
                });
            } else {
              return;
            }
          }
          
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>{searchText !== "" ? "Không tìm thấy bệnh nhân" : "Hiện tại chưa có bệnh nhân"}</Text>
          </View>
        )}
      />
    );
  };

  const _handleSearchPatient = (searchText) =>{
    setSearchText(searchText)
    if(searchRef){
      clearTimeout(searchRef.current)
    }
    const keySearchLength = searchText.split("").length
    searchRef.current = setTimeout(() => {
      if(keySearchLength > 0){
        setFirstLoading(true)
        API.searchPatient(searchText,1).then(res =>{
          if(res.status === 200){
            const data = res.data
            setTotalSearch(data.total)
            setListPatientSearch(data.result)
            setFirstLoading(false)
            
          }
        }).catch(err =>{
          console.log("Err: ",err)
        })
      }else if(keySearchLength === 0){
        setListPatientSearch(null)
        setPageSearch(1)
        setTotalSearch(null)
      }
    }, 600);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: AppColor.white,
          marginBottom: scaledSize(10),
          paddingVertical: scaledSize(10),
          paddingHorizontal: scaledSize(10)
          
        }}>

        <Text
        style={{
          fontWeight: '600',
          fontSize: scaledSize(22),
          color: AppColor.color_main,
          paddingBottom: scaledSize(6),
          width: '100%',
          textAlign: 'center'
        }}>
          {I18n.t("patient_list")}
      </Text>
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

      {firstLoading ? (
        <ActivityIndicator
          style={{ marginTop: scaledSize(20) }}
          animating={isLoading}
          size="large"
          color={AppColor.color_main}
        />
      ) : (
        renderListPatient()
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:AppColor.white
  }
});
export default PatientScreen;
