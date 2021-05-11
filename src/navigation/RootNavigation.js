import * as React from 'react';
import _ from 'lodash'
import { StackActions } from '@react-navigation/native';

let savedAction = null

export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();

export function updateReadyState(state) {
  isReadyRef.current = state
  if (!_.isEmpty(savedAction)) {
    console.log('>>>>> saved action', savedAction)
    navigate(savedAction.name, savedAction.params)
    savedAction = null
  }
}

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
    console.log('>>>> navigate', name)
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
    savedAction = { name, params }
  }
}

export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args));
}