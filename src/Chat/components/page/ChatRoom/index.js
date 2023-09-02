import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles'
import Icon from 'react-native-vector-icons/AntDesign'

const ChatRoom = (props) => {

    return (
        <View style={styles.containerStyle}>
            <View style={styles.appBarStyle}>
                <TouchableOpacity style={styles.backIconStyle} onPress={() => props.navigation.goBack()}>
                    <Icon name='arrowleft' size={20} color='white' />
                </TouchableOpacity>
                <Image
                    style={styles.profileImageStyle}
                    resizeMode='cover'
                    source={{ uri: props?.route?.params?.chatUserProfileImage }}
                />
                <Text style={styles.nameStyle}>{props?.route?.params?.userName}</Text>
            </View>
            <Text>ChatRoom</Text>
        </View>
    )
}

export default ChatRoom