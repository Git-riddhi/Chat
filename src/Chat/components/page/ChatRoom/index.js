import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Pressable,
    Modal,
    PermissionsAndroid,
    Linking,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { styles } from './styles';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/AntDesign';
import SendIcon from 'react-native-vector-icons/Ionicons';
import DocumentIcon from 'react-native-vector-icons/Ionicons';
import ContactIcon from 'react-native-vector-icons/Ionicons';
import LocationIcon from 'react-native-vector-icons/Ionicons';
import AudioIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageIcon from 'react-native-vector-icons/FontAwesome6';
import CameraIcon from 'react-native-vector-icons/SimpleLineIcons';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Menu, Provider } from 'react-native-paper';
import { useAppContext } from '../../../context/AppContext';
import { GiftedChat, Send } from 'react-native-gifted-chat'
import ImageCropPicker from 'react-native-image-crop-picker';

const ChatRoom = props => {
    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const [pickerResponse, setPickerResponse] = useState(null);
    const [messages, setMessages] = useState([])
    const [selectedImages, setSelectedImages] = useState([]);

    const {
        currentChatUser,
        currentChatUserProfile,
        menuVisible,
        setMenuVisible,
        text,
        setText,
        selectedDocument,
        setSelectedDocument,
    } = useAppContext();


    // Function For open Document Picker : 

    // const SelectDocument = async () => {
    //     // For Select Multiple Document
    //     try {
    //         const doc = await DocumentPicker.pick({
    //             type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
    //             allowMultiSelection: true,
    //         });

    //         console.log('doc=====>', doc[0]);
    //         setSelectedDocument(doc[0]);
    //     } catch (err) {
    //         if (DocumentPicker.isCancel(e))
    //             console.log('User Cancelled the upload', e);
    //         else console.log('error ====>', err);
    //     }
    // };

    // {
    //     if (selectedDocument == null) {
    //         console.log('Null');
    //     } else {
    //         console.log('selectedDocument==>', selectedDocument);
    //     }
    // }

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

    // Function For open Gallery Picker :

    // const requestGalleryPermission = async () => {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    //             {
    //             }
    //         );
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             console.log("Photos permission given");
    //             OpenGallery()
    //         } else {
    //             console.log("Photos permission denied");
    //         }
    //     } catch (error) {
    //         console.warn(error)
    //     }
    // }


    // const OpenGallery = () => {
    //     try {
    //         ImageCropPicker.openPicker({
    //             multiple: true
    //         }).then(images => {
    //             console.log('image1', images);

    //             // setImage1(images[0].path)
    //             // setImage2(images[1].path)
    //             // setImage3(images[2].path)
    //         });
    //     } catch (error) {
    //         console.log('error--', error)
    //     }
    // }

    // const countNumOfLines = text => {
    //     return text.split('\n').length;
    // };


    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://cdn-icons-png.flaticon.com/256/5778/5778483.png',


                },
            },
        ])
    }, [])

    // const handleSend = newMessages => {
    //     setMessages(previousMessages =>
    //         GiftedChat.append(previousMessages, newMessages)
    //     );
    // };
    const handleSend = newMessages => {
        const updatedMessages = GiftedChat.append(messages, newMessages);
        setMessages(updatedMessages);
    };

    const pickImage = () => {
        ImageCropPicker.openPicker({
            cropping: true, // Set to true if you want to enable image cropping
            width: 300,     // Width of the cropped image
            height: 400,    // Height of the cropped image
            includeBase64: true, // Include base64 encoded image data (optional)
        }).then(response => {
            if (response.didCancel) {
                console.log('Image picker canceled');
            } else if (response.error) {
                console.error('Image picker error:', response.error);
            } else {
                const imageMessage = [
                    {
                        _id: Math.random().toString(),
                        image: `data:${response.mime};base64,${response.data}`, // Include base64 image data
                        createdAt: new Date(),
                        user: { _id: 1 },
                    },
                ];

                setMenuVisible(false)
                handleSend(imageMessage);
            }
        }).catch(err => {
            console.error('Image picker error:', err);
        });
    };

    const pickFile = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            console.log('result', result);

            const fileMessage = {
                _id: Math.random().toString(),
                file: {
                    uri: result.uri,
                    name: result.name,
                    type: result.type,
                },
                text: result.name, // Display the file name in the chat
                createdAt: new Date(),
                user: { _id: 1 },
            };


            // const fileMessage = [
            //     {
            //         _id: Math.random().toString(),
            //         file: {
            //             uri: result.uri,
            //             name: result.name,
            //             type: result.type,
            //         },

            //         // text: result.uri, // Display the file name in the chat
            //         createdAt: new Date(),
            //         user: { _id: 1 },
            //     },
            // ];

            handleSend(fileMessage);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Document picker canceled');
            } else {
                console.error('Document picker error:', err);
            }
        }
    };



    // const onSendMessage = useCallback((newMessages = []) => {
    //     console.log("newMessages==", newMessages);
    //     setMessages((prevMessages) =>
    //         GiftedChat.append(prevMessages, newMessages));
    // }, []);

    const openGps = (lat, lng) => {
        Linking.openURL('https://www.google.com/maps/search/?api=1');
        // var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
        // var url = scheme + `${lat},${lng}`;
        // Linking.openURL(url);
    }


    return (
        <Provider>
            <View style={styles.containerStyle}>
                <View style={styles.appBarStyle}>
                    <TouchableOpacity
                        style={styles.backIconStyle}
                        onPress={() => props.navigation.goBack()}>
                        <Icon name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>
                    <Image
                        style={styles.profileImageStyle}
                        resizeMode="cover"
                        source={{ uri: currentChatUserProfile }}
                    />
                    <Text style={styles.nameStyle}>{currentChatUser}</Text>
                </View>


                <View style={styles.mainViewStyle}>

                    <GiftedChat
                        alwaysShowSend={true}
                        placeholder='Message'
                        multiline={true}
                        keyboardShouldPersistTaps={'never'}
                        textInputStyle={{
                            backgroundColor: 'lightgrey',
                            marginHorizontal: 5,
                            borderRadius: 30,
                            paddingHorizontal: 10,
                            textAlignVertical: 'center',
                            paddingVertical: 10,
                        }}
                        // renderActions={() => (
                        //     <TouchableOpacity style={styles.sendButtonStyle} onPress={pickImage}>
                        //         <Text>Send Image</Text>
                        //     </TouchableOpacity>
                        // )}

                        renderSend={(props) => {
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
                                                            pickFile();
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
                                                        onPress={pickImage}
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
                                                            props.navigation.navigate('Contacts');
                                                        }}>
                                                        <ContactIcon name="person" size={25} color="white" />
                                                    </TouchableOpacity>
                                                    <Text style={styles.modalHeading}>Contact</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </Menu>
                                    <Send {...props}>
                                        <View style={styles.sendContainer}>
                                            <SendIcon

                                                name="send"
                                                style={styles.sendButton}
                                                size={25}
                                                color='orange'
                                            />
                                        </View>
                                    </Send>
                                </View>
                                // <Send
                                //     {...props}
                                //     containerStyle={styles.sendContainer}
                                // >
                                //     <Pressable style={styles.sendButtonStyle} onPress={(messages) => handleSend(messages)}>
                                //         <SendIcon name="send" size={15} color={'white'} />
                                //     </Pressable>
                                // </Send>
                            );
                        }}
                        messages={messages}
                        onSend={messages => handleSend(messages)}
                        user={{
                            _id: 1,
                        }}
                    />

                    <View style={styles.innnerViewStyle}>
                        <View style={styles.textInputViewStyle}>


                            <TextInput
                                editable={true}
                                onChangeText={inputText => setText(inputText)}
                                value={text}
                                // numberOfLines={countNumOfLines(text) > 4 ? 5 : 0}
                                scrollEnabled={true}
                                multiline
                                style={[styles.textInputStyle]}
                                placeholder="Message"
                                placeholderTextColor={'grey'}
                            />

                            {/* <Menu
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
                                                    pickFile();
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
                                                onPress={pickImage}
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
                                                    props.navigation.navigate('Contacts');
                                                }}>
                                                <ContactIcon name="person" size={25} color="white" />
                                            </TouchableOpacity>
                                            <Text style={styles.modalHeading}>Contact</Text>
                                        </View>
                                    </View>
                                </View>
                            </Menu> */}
                        </View>

                        <Pressable style={styles.sendButtonStyle}>
                            <SendIcon name="send" size={15} color={'white'} />
                        </Pressable>
                    </View>
                </View>
            </View>
        </Provider>
    );
};

export default ChatRoom;
