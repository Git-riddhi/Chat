import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import ChatList from '../../components/page/ChatList';
import ChatRoom from '../../components/page/ChatRoom';
import ContactPicker from '../../components/page/Contacts';
import Login from '../../components/page/Login/Login';
import Signup from '../../components/page/Signup/Signup';
import NewMessage from '../../components/page/NewMessage/NewMessage';
import ChatListing from '../../components/page/ChatListing/ChatListing';

const Stack = createStackNavigator();

const UserNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='ChatList' component={ChatList} options={{ headerShown: false }}/>
            <Stack.Screen name='ChatRoom' component={ChatRoom} options={{ headerShown: false }}/>
            <Stack.Screen name='Contacts' component={ContactPicker} options={{ headerShown: false }}/>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }}/>
            <Stack.Screen name='NewMessage' component={NewMessage} options={{ headerShown: false }}/>
            <Stack.Screen name='ChatListing' component={ChatListing} options={{ headerShown: false }}/>


        </Stack.Navigator>
    )
}

export default UserNavigator