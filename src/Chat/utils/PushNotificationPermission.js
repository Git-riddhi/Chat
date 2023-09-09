import React, { useState } from 'react';
import messaging from '@react-native-firebase/messaging';
// import { ReactNativeFirebase } from '@react-native-firebase/app';
import { PermissionsAndroid, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

export async function requestUserPermission() {
    // console.log('permission');
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
}

export const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    console.log('old FCM Token :', fcmToken)
    if (!fcmToken) {
        try {

            let fcmToken = await messaging().getToken()
            if (fcmToken) {
                console.log('new generated Fcm Token :', fcmToken);
            }
            await AsyncStorage.setItem('fcmToken', fcmToken)
        }
        catch (error) {
            console.log(error)
        }
    }
}

export const NotificationServices = () => {

    // const [loading, setLoading] = useState(false)

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });

    //Foreground message handling

    messaging().onMessage(async remoteMessage => {
        remoteMessage

        console.log("remoteMessage.notification.title ===>", remoteMessage.notification.title);
        console.log("remoteMessage.notification.body ===>", remoteMessage.notification.body);
        // Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
    });

    //check whether an initial notification is available

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log("remoteMessage ==>", remoteMessage);

                Alert.alert(
                    'Notification caused app to open from quit state:', remoteMessage
                );

            }

        });
}