import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, PermissionsAndroid } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Avatar,
    Bubble,
    GiftedChat,
    InputToolbar,
    Send,
} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/AntDesign';
import SendIcon from 'react-native-vector-icons/MaterialIcons';
import ImageCropPicker from 'react-native-image-crop-picker';
import DocumentIcon from 'react-native-vector-icons/Ionicons';
import ContactIcon from 'react-native-vector-icons/Ionicons';
import LocationIcon from 'react-native-vector-icons/Ionicons';
import AudioIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageIcon from 'react-native-vector-icons/FontAwesome6';
import CameraIcon from 'react-native-vector-icons/SimpleLineIcons';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Menu, Provider } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const NewMessage = (props) => {
    const [messageList, setMessageList] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState({});
    // const [imageUri, setImageUri] = useState(null);

    // const route = useRoute();

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    console.log('route?.params?.id===1', props?.route?.params?.data);

    useEffect(() => {
        const subscriber = firestore()
            .collection('chats')
            .doc(props?.route?.params?.user + props?.route?.params?.data?.userId)
            .collection('messages')
            .orderBy('createdAt', 'desc');
        subscriber.onSnapshot(querysnapshot => {
            const allmessages = querysnapshot.docs.map(item => {
                return { ...item._data, createdAt: item._data.createdAt };
            });
            setMessageList(allmessages);
        });
        // return () => subscriber();
    }, []);

    const onSend = useCallback(async (messages = []) => {
        const msg = messages[0];
        const myMsg = {
            ...msg,
            sendBy: props?.route?.params?.user,
            sendTo: props?.route?.params?.data?.userId,
            createdAt: Date.parse(msg.createdAt),
        };
        setMessageList(previousMessages =>
            GiftedChat.append(previousMessages, myMsg),
        );
        firestore()
            .collection('chats')
            .doc('' + props?.route?.params?.user + props?.route?.params?.data?.userId)
            .collection('messages')
            .add(myMsg);
        firestore()
            .collection('chats')
            .doc('' + props?.route?.params?.data?.userId + props?.route?.params?.user)
            .collection('messages')
            .add(myMsg);
    }, []);


    // const onSendImage = useCallback(async (imageUri) => {
    //     // Upload the image to Firebase Storage
    //     const imageFileName = uuid.v4() + '.jpg';
    //     const storageRef = firebase.storage().ref('images/' + imageFileName);

    //     try {
    //         const response = await fetch(imageUri);
    //         const blob = await response.blob();
    //         await storageRef.put(blob);
    //         const imageUrl = await storageRef.getDownloadURL(); // Get the image URL

    //         // Create a message containing only the image
    //         const imageMessage = {
    //             _id: uuid.v4(),
    //             image: imageUrl,
    //             createdAt: new Date(),
    //             user: {
    //                 _id: route.params.user,
    //             },
    //         };

    //         setMessageList((previousMessages) => GiftedChat.append(previousMessages, imageMessage));

    //         // Add the image message to Firestore
    //         firestore()
    //             .collection('chats')
    //             .doc(route.params.user + route.params.data.userId)
    //             .collection('messages')
    //             .add(imageMessage);

    //         firestore()
    //             .collection('chats')
    //             .doc(route.params.data.userId + route.params.user)
    //             .collection('messages')
    //             .add(imageMessage);
    //     } catch (error) {
    //         console.error('Image upload error:', error);
    //     }
    // }, [route.params.user, route.params.data.userId]);


    const selectImage = () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        })
            .then((response) => {
                if (response.path) {
                    console.log('response.path ====', response.path);
                    // onSendImage(response.path); // Set the selected image URI
                }
            })
            .catch((error) => {
                console.log('ImagePicker error:', error);
            });
    };


    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'App Camera Permission',
                    message: 'App needs access to your camera ',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            const grantedGallery = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'App Gallery Permission',
                    message: 'App needs access to your photos',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (
                granted === PermissionsAndroid.RESULTS.GRANTED &&
                grantedGallery === PermissionsAndroid.RESULTS.GRANTED
            ) {
                console.log('Camera permission given');
                LaunchCamera();
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const LaunchCamera = () => {
        try {
            launchCamera(
                {
                    mediaType: 'photo',
                },
                value => {
                    console.log('photos-value', value);
                    // setPickerResponse(value.assets[0].uri)
                },
            );
        } catch (error) {
            console.log('error--', error);
        }
    };

    const openGps = (lat, lng) => {
        Linking.openURL('https://www.google.com/maps/search/?api=1');
        // var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
        // var url = scheme + `${lat},${lng}`;
        // Linking.openURL(url);
    }


    return (
        <Provider>
            <View style={styles.containerStyle}>
                {/* <View style={styles.header}>
                <Icon
                    name={'arrowleft'}
                    size={25}
                    color="black"
                    // color={appColor.PRIMARY_COLOR}
                    onPress={() => {
                        props.navigation.goBack();
                    }}
                />
                <Text style={styles.title}>{props?.route?.params?.data?.name}</Text>
                <View>

                </View>

            </View> */}
                <View style={styles.appBarStyle}>
                    <TouchableOpacity
                        style={styles.backIconStyle}
                        onPress={() => props.navigation.goBack()}>
                        <Icon name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>
                    <Image
                        style={styles.profileImageStyle}
                        resizeMode="cover"
                        source={{ uri: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80' }}
                    />
                    <Text style={styles.nameStyle}>{props?.route?.params?.data?.name}</Text>
                </View>
                <GiftedChat
                    messages={messageList.length > 0 ? messageList : null}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: props?.route?.params?.user,
                    }}
                    // renderAvatar={(a) => console.log("a====",a)}
                    renderBubble={props => {
                        return (
                            <Bubble
                                {...props}
                                wrapperStyle={{
                                    right: {
                                        backgroundColor: 'rgb(11,129,105)'
                                    },
                                    left: {
                                        backgroundColor: 'lightgrey'
                                    },
                                }}
                                textStyle={{
                                    left: {
                                        color: 'black',
                                        fontSize: 15,
                                    },
                                    right: {
                                        color: 'white',
                                        fontSize: 15,
                                    },
                                }}
                                containerStyle={{
                                    left: {},
                                }}
                            />
                        );
                    }}
                    showUserAvatar={false}
                    renderAvatar={props => {
                        <Avatar
                            {...props}
                            containerStyle={{
                                left: {
                                    width: 0,
                                },
                            }}
                        />;
                    }}
                    renderAvatarOnTop={false}
                    showAvatarForEveryMessage={false}
                    alwaysShowSend={true}
                    // renderInputToolbar={(props) => {
                    //     return (
                    //         <InputToolbar
                    //             {...props}
                    //             containerStyle={{
                    //                 // backgroundColor: 'lightgray', // Change the background color of the input toolbar
                    //             }}
                    //             primaryStyle={{ color: 'red' }} // Change the text color of the input toolbar text input

                    //         />
                    //     );
                    // }
                    // }
                    renderSend={properties => {
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Menu
                                    visible={menuVisible}
                                    contentStyle={styles.menuContentStyle}
                                    onDismiss={closeMenu}
                                    anchor={
                                        <Feather
                                            name="paperclip"
                                            size={22}
                                            color={'grey'}
                                            onPress={() => {
                                                openMenu();
                                            }}
                                        />
                                    }>
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <View style={styles.pickerView}>
                                                <TouchableOpacity
                                                    style={[styles.iconView, { backgroundColor: '#9370db' }]}
                                                    onPress={() => {
                                                        setMenuVisible(false);
                                                        // pickFile();
                                                    }}>
                                                    <DocumentIcon name="document" size={25} color="white" />
                                                </TouchableOpacity>
                                                <Text style={styles.modalHeading}>Document</Text>
                                            </View>

                                            <View style={styles.pickerView}>
                                                <TouchableOpacity
                                                    style={[styles.iconView, { backgroundColor: '#ff1493' }]}
                                                    onPress={() => {
                                                        setMenuVisible(false);
                                                        requestCameraPermission();
                                                    }}>
                                                    <CameraIcon name="camera" size={25} color="white" />
                                                </TouchableOpacity>
                                                <Text style={styles.modalHeading}>Camera</Text>
                                            </View>

                                            <View style={styles.pickerView}>
                                                <TouchableOpacity
                                                    style={[styles.iconView, { backgroundColor: '#ba55d3' }]}
                                                // onPress={requestGalleryPermission}
                                                // onPress={pickImage}
                                                >
                                                    <ImageIcon name="image" size={25} color="white" />
                                                </TouchableOpacity>
                                                <Text style={styles.modalHeading}>Gallery</Text>
                                            </View>
                                        </View>

                                        <View style={styles.modalView}>
                                            <View style={styles.pickerView}>
                                                <TouchableOpacity
                                                    style={[styles.iconView, { backgroundColor: '#ff4500' }]}>
                                                    <AudioIcon name="headphones" size={25} color="white" />
                                                </TouchableOpacity>
                                                <Text style={styles.modalHeading}>Audio</Text>
                                            </View>

                                            <View style={styles.pickerView}>
                                                <TouchableOpacity
                                                    style={[styles.iconView, { backgroundColor: '#3cb371' }]}
                                                    onPress={openGps}
                                                >
                                                    <LocationIcon
                                                        name="location-sharp"
                                                        size={25}
                                                        color="white"
                                                    />
                                                </TouchableOpacity>
                                                <Text style={styles.modalHeading}>Location</Text>
                                            </View>

                                            <View style={styles.pickerView}>
                                                <TouchableOpacity
                                                    style={[styles.iconView, { backgroundColor: '#00bfff' }]}
                                                    onPress={() => {
                                                        closeMenu();
                                                        props.navigation.navigate('Contacts')
                                                    }}>
                                                    <ContactIcon name="person" size={25} color="white" />
                                                </TouchableOpacity>
                                                <Text style={styles.modalHeading}>Contact</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Menu>
                                <Send {...properties} containerStyle={styles.sendButtonStyle}>
                                    <SendIcon name="send" size={30} color={'rgb(11,129,105)'} />
                                </Send>
                            </View>
                            // <View
                            //     style={{
                            //         flexDirection: 'row',
                            //         alignItems: 'center',
                            //         width: 90,
                            //         paddingHorizontal: 10,
                            //     }}>
                            //     <TouchableOpacity onPress={() => { selectImage() }}>
                            //         <Image
                            //             source={require('../../../../../assets/paperClip.png')}
                            //             style={{ height: 25, width: 25, marginRight: 15 }}
                            //             tintColor={'black'}
                            //         />
                            //     </TouchableOpacity>
                            //     <Send {...props} containerStyle={styles.sendButtonStyle}>
                            //         <SendIcon name="send" size={30} color={'rgb(11,129,105)'} />
                            //     </Send>
                            // </View>
                        );
                    }}
                />
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
    },
    header: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between',
        margin: 15
    },
    title: {
        fontSize: 20,
        color: 'black'
    },
    sendButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    appBarStyle: {
        backgroundColor: 'rgb(11,129,105)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 7,
    },
    profileImageStyle: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginHorizontal: 3,
    },
    nameStyle: {
        fontSize: 15,
        color: 'white',
        marginLeft: 7,
    },
    sendButtonStyle: {
        // backgroundColor: 'rgb(11,129,105)',
        width: 45,
        height: 45,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    menuContentStyle: {
        backgroundColor: 'rgb(11, 129, 105)',
        borderRadius: 20,
        alignSelf: 'center',
        bottom: 45,
        left: 35,
        width: deviceWidth * 0.90,
        elevation: 5,
        // zIndex:-100
    },
    centeredView: {
        flex: 1,
        alignSelf: 'center',
        marginVertical: 20,
        marginHorizontal: 15,


    },
    modalView: {
        padding: 10,
        borderRadius: 20,
        flexDirection: 'row',

    },
    pickerView: {
        alignItems: 'center',
        marginHorizontal: 20,
    },
    iconView: {
        borderRadius: 100,
        padding: 17
    },
    modalHeading: {
        fontSize: 14,
        color: 'white'
    },

})
export default NewMessage;
