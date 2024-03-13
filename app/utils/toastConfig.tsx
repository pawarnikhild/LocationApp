import { View, Text, ToastAndroid } from 'react-native';
import React, {Component, ComponentType} from 'react';
import Toast, { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import { AppColor } from './StyleConstant';

// For Android
export const showAndroidToast = (msg: string) => {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
};

// For IOS
// HOC -
const CommonToast = (Component: ComponentType<any>, color: string) => (props: any) => (
  <Component
    {...props}
    style={{
      height: 'auto',
      width: '90%',
      borderLeftColor: color,
      borderRightColor: color,
      borderLeftWidth: 7,
      borderRightWidth: 7,
      padding: 10
    }}
    text1Style={{
      fontSize: 18,
    }}
    text2NumberOfLines={4}
    text2Style={{
      fontSize: 15
    }}
  />
)

export const toastConfig = {
  success: CommonToast(BaseToast, AppColor.green),
  error: CommonToast(ErrorToast, AppColor.yellow),
  info: CommonToast(InfoToast, AppColor.red)
};
