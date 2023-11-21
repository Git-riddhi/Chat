/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  View,
  Text
} from 'react-native';
import AppRoutes from './Chat/AppRoutes';
import { NavigationContainer } from '@react-navigation/native';
import { AppContextProvider } from './Chat/context/AppContext';
import NewMessage from './Chat/components/page/NewMessage/NewMessage';
import Login from './Chat/components/page/Login/Login';
import UserNavigator from './Chat/AppRoutes/User';


const App = () => {
  return (

    // <NewMessage/>
    <NavigationContainer>
      <UserNavigator />

    </NavigationContainer>

    // <AppContextProvider>
    //   <AppRoutes />
    // </AppContextProvider>


  );
}

export default App;
