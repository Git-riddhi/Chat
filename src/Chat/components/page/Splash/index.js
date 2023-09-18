import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native';
import { styles } from './styles'
import messaging from '@react-native-firebase/messaging';
import { Badge } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationServices, getFcmToken, requestUserPermission } from '../../../utils/PushNotificationPermission';
// import PushNotification from 'react-native-push-notification';


const Splash = (props) => {
  const [badgeCount, setBadgeCount] = useState(0);


  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      remoteMessage
      console.log("remoteMessage", remoteMessage);
      incrementBadgeCount();
    });

      // messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      //   remoteMessage
      //   const count = await AsyncStorage.getItem('AppBadgeCount');
      //   const newBadgeCount = parseInt(count) + 1;
    
      //   // Save the new badge count to AsyncStorage
      //   await AsyncStorage.setItem('AppBadgeCount', newBadgeCount.toString());
    
      //   // Update the badge count on the app icon
      //   PushNotification.setApplicationIconBadgeNumber(2);
    
      //   // const count = await PushNotification.();
      //   // console.log('count ===>', count);
      //   // const newBadgeCount = parseInt(count) + 1;
    
      //   // await AsyncStorage.setItem('AppBadgeCount', newBadgeCount.toString());
      //   // PushNotification.Push.setBadgeCount(42);
      // });

    return unsubscribe;
  }, [badgeCount]);

  useEffect(() => {
    loadBadgeCount();
  }, []);

  useEffect(() => {
    // Save the badge count to AsyncStorage whenever it changes
    saveBadgeCount();
  }, [badgeCount]);

  useEffect(() => {
    requestUserPermission()
    getFcmToken()
    NotificationServices()
  }, []);

  const loadBadgeCount = async () => {
    try {
      const savedBadgeCount = await AsyncStorage.getItem('BadgeCountKey');
      console.log('savedBadgeCount ==>', savedBadgeCount);
      if (savedBadgeCount !== null) {
        setBadgeCount(parseInt(savedBadgeCount, 10));
        // console.log('badgeCount ===>', badgeCount);
      }
    } catch (error) {
      console.error('Error loading badge count:', error);
    }
  };

  const saveBadgeCount = async () => {
    try {
      await AsyncStorage.setItem('BadgeCountKey', badgeCount.toString());
    } catch (error) {
      console.error('Error saving badge count:', error);
    }
  };


  const incrementBadgeCount = () => {
    // Increment the badge count and save it to AsyncStorage
    setBadgeCount(badgeCount + 1);
    saveBadgeCount();
  };

  const resetBadgeCount = () => {
    // Reset the badge count and save it to AsyncStorage
    setBadgeCount(0);
    saveBadgeCount();
  };

  // useEffect(() => {
  //     requestUserPermission();
  //     getFcmToken();
  //     NotificationServices();
  // }, [])


  // useEffect(() => {
  //     setTimeout(() => {
  //         props.navigation.navigate('User')
  //     }, 1000);
  // }, [])

  return (
    <View style={styles.mainViewstyle}>

      <Image source={require('../../../../../assets/chatSplash.png')} style={styles.imagestyle} />

      <TouchableOpacity

        onPress={() => {
          resetBadgeCount()
          props.navigation.navigate('User')
        }}
      >
        <Image source={require('../../../../../assets/chatIcon.png')} style={styles.iconstyle} />
        <Badge
          visible={badgeCount > 0}
          size={25}
          style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'green' }}
        >
          {badgeCount}
        </Badge>
      </TouchableOpacity>

    </View>
  )
}

export default Splash