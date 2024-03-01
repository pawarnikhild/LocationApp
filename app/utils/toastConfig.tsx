import { View, Text, ToastAndroid } from 'react-native';
import React, {Component, ComponentType} from 'react';
import Toast, { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import { AppColor } from './StyleConstant';

// This is for Android
export const showAndroidToast = (msg: string) => {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
};

// This is for IOS
// HOC -
const CommonToast = (Component: ComponentType<any>, color: string) => (props: any) => (
  <Component
    {...props}
    style={{
      height: 70,
      width: '90%',
      borderLeftColor: color,
      borderRightColor: color,
      borderLeftWidth: 7,
      borderRightWidth: 7,
    }}
    // contentContainerStyle={{paddingHorizontal: 15}}
    text1Style={{
      fontSize: 18,
    }}
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
