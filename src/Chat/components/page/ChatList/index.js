import { View, Text, FlatList, StatusBar, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { chatListArray } from '../../../utils/globalConstant'

const ChatList = (props) => {

    const navigateToChatRoom = (profile_image,chatUserName) => {
        props.navigation.navigate('ChatRoom',{
            chatUserProfileImage:profile_image,
            userName:chatUserName
        })
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigateToChatRoom(item.profile_image,item.name)}>
                <View style={styles.itemContainerStyle}>
                    <Image source={{ uri: item.profile_image }}
                        resizeMode='cover'
                        style={styles.imageStyle}
                    />
                    <View>
                        <View style={styles.viewStyle}>
                            <Text style={styles.nameTextStyle}>{item.name}</Text>
                            <Text style={styles.lastMessageTimeTextStyle}>{item.lastMessageTime}</Text>
                        </View>
                        <View style={styles.viewStyle}>
                            <Text style={styles.lastMessageTextStyle}>{item.lastMessage}</Text>
                            <Text style={styles.unreadTextStyle}>3</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.containerStyle}>
            <StatusBar barStyle={'light-content'} backgroundColor={'rgb(11,129,105)'} />
            <View style={styles.appBarStyle}>
                <Text style={styles.appBarTextStyle}>ChatApp</Text>
                <Text style={styles.titleTextStyle}>Chats</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={chatListArray}
                renderItem={renderItem}
            />
        </View>
    )
}

export default ChatList