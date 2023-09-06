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


const App = () => {
  return (
   
      
    <AppContextProvider>
      <AppRoutes />
    </AppContextProvider>
  
 
  );
}

export default App;
