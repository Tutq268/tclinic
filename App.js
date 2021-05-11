import { StatusBar } from 'expo-status-bar';
import React, { Fragment } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from '@navigation';
import rootSaga from './src/redux/saga/rootSaga';
import rootReducer from './src/redux/reducer/rootReducer';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import I18n from "@locale";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
console.disableYellowBox = true;

export default function App() {



  return (
    <SafeAreaProvider>
      <Fragment>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </Fragment>
    </SafeAreaProvider>
  );
}

