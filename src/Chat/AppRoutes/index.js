import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import Splash from '../components/page/Splash';
import UserNavigator from './User';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const AppRoutes = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name='User' component={UserNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppRoutes