import { View, Text, FlatList, StatusBar, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import { chatListArray } from '../../../utils/globalConstant'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import IconTwo from 'react-native-vector-icons/Ionicons'
import IconThree from 'react-native-vector-icons/MaterialCommunityIcons'
import ImagePicker, {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import { useAppContext } from '../../../context/AppContext'


const ChatList = (props) => {

    const [pickerResponse, setPickerResponse] = useState(null);

    const { setCurrentChatUser ,setCurrentChatUserProfile} = useAppContext()

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            const grantedGallery = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "App Gallery Permission",
                    message: "App needs access to your photos",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED && grantedGallery === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
                LaunchCamera()
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }

    }

    const LaunchCamera = () => {
        try {
            launchCamera({
                mediaType: 'photo'
            }, (value) => {
                console.log('photos-value', value)
                // setPickerResponse(value.assets[0].uri)

            })
        } catch (error) {
            console.log('error--', error)
        }

    }

    const navigateToChatRoom = (profile_image, chatUserName) => {
        setCurrentChatUser(chatUserName)
        setCurrentChatUserProfile(profile_image)
        props.navigation.navigate('ChatRoom')
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigateToChatRoom(item.profile_image, item.name)}>
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
                <View style={styles.headerViewstyle}>
                    <Text style={styles.appBarTextStyle}>ChatApp</Text>

                    <View style={styles.iconsViewStyle}>
                        <TouchableOpacity onPress={requestCameraPermission}>
                            <Icon name='camera' size={23} color={'white'} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <IconTwo name='search-sharp' size={23} color={'white'} />
                        </TouchableOpacity>
                        <IconThree name='dots-vertical' size={23} color={'white'} />
                    </View>

                </View>
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