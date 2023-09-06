import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import ChatList from '../../components/page/ChatList';
import ChatRoom from '../../components/page/ChatRoom';
import ContactPicker from '../../components/page/Contacts';

const Stack = createStackNavigator();

const UserNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='ChatList' component={ChatList} options={{ headerShown: false }}/>
            <Stack.Screen name='ChatRoom' component={ChatRoom} options={{ headerShown: false }}/>
            <Stack.Screen name='Contacts' component={ContactPicker} options={{ headerShown: false }}/>

        </Stack.Navigator>
    )
}

export default UserNavigator