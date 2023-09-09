import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Pressable, Modal, PermissionsAndroid } from 'react-native'
import DocumentIcon from 'react-native-vector-icons/Ionicons'
import ContactIcon from 'react-native-vector-icons/Ionicons'
import LocationIcon from 'react-native-vector-icons/Ionicons'
import AudioIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import ImageIcon from 'react-native-vector-icons/FontAwesome6'
import CameraIcon from 'react-native-vector-icons/SimpleLineIcons'
import DocumentPicker from 'react-native-document-picker';
import { styles } from './styles'
import  Feather from 'react-native-vector-icons/Feather'
import ImagePicker, {
    launchCamera,
} from 'react-native-image-picker';
import { Button, Divider, Menu, PaperProvider, Provider } from 'react-native-paper'
// import ImagePicker from 'react-native-image-crop-picker'
import Contacts from 'react-native-contacts';

const MenuBar = ({menuPress,showMenu,onDismiss}) => {

   
    

    // const [text, setText] = useState('');
    // const [contacts, setContacts] = useState([]);

    // const [isModalVisible, setModalVisible] = useState(false);
    const [pickerResponse, setPickerResponse] = useState(null);
    const [selectedDocument, setSelectedDocument] = useState({});



    const SelectDocument = async () => {
        // For Select Multiple Document
        try {
            const doc = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
                allowMultiSelection: true,
            });

            console.log('doc=====>', doc[0]);
            setSelectedDocument(doc[0]);
        } catch (err) {
            if (DocumentPicker.isCancel(e))
                console.log('User Cancelled the upload', e);
            else console.log('error ====>', err);
        }
    };

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

    // const countNumOfLines = (text) => {
    //     return text.split('\n').length
    // }

    // const onSendMessage = useCallback((newMessages = []) => {
    //     console.log("newMessages==", newMessages);
    //     setMessages((prevMessages) =>
    //         GiftedChat.append(prevMessages, newMessages));
    // }, []);



    return (
        <Provider>
            <Menu
                visible={showMenu}
                contentStyle={styles.menuContentStyle}
                onDismiss={onDismiss}
                // anchor={menuPress}
            >

                <View style={styles.centeredView}>

                    <View style={styles.modalView}>

                        <View style={styles.pickerView}>
                            <TouchableOpacity style={[styles.iconView, { backgroundColor: '#9370db' }]}
                                onPress={() => {
                                    setVisible(false)
                                    SelectDocument()
                                }}>
                                <DocumentIcon name='document' size={25} color='white' />
                            </TouchableOpacity>
                            <Text style={styles.modalHeading}>Document</Text>
                        </View>

                        <View style={styles.pickerView}>
                            <TouchableOpacity style={[styles.iconView, { backgroundColor: '#ff1493' }]}
                                onPress={() => {
                                    setVisible(false)
                                    requestCameraPermission()
                                }}>
                                <CameraIcon name='camera' size={25} color='white' />
                            </TouchableOpacity>
                            <Text style={styles.modalHeading}>Camera</Text>
                        </View>

                        <View style={styles.pickerView}>
                            <TouchableOpacity style={[styles.iconView, { backgroundColor: '#ba55d3' }]}
                            // onPress={() => {
                            //     setVisible(false)
                            //     requestGalleryPermission()
                            // }}
                            >
                                <ImageIcon name='image' size={25} color='white' />
                            </TouchableOpacity>
                            <Text style={styles.modalHeading}>Gallery</Text>
                        </View>

                    </View>

                    <View style={styles.modalView}>

                        <View style={styles.pickerView}>
                            <TouchableOpacity style={[styles.iconView, { backgroundColor: '#ff4500' }]}>

                                <AudioIcon name='headphones' size={25} color='white' />
                            </TouchableOpacity>
                            <Text style={styles.modalHeading}>Audio</Text>
                        </View>

                        <View style={styles.pickerView}>
                            <TouchableOpacity style={[styles.iconView, { backgroundColor: '#3cb371' }]}>
                                <LocationIcon name='location-sharp' size={25} color='white' />
                            </TouchableOpacity>
                            <Text style={styles.modalHeading}>Location</Text>
                        </View>

                        <View style={styles.pickerView}>
                            <TouchableOpacity style={[styles.iconView, { backgroundColor: '#00bfff' }]}
                                onPress={() => {
                                    closeMenu()
                                    props.navigation.navigate('Contacts')
                                }}>
                                <ContactIcon name='person' size={25} color='white' />
                            </TouchableOpacity>
                            <Text style={styles.modalHeading}>Contact</Text>
                        </View>
                    </View>
                </View>
            </Menu>
        </Provider>
    )
}

export default MenuBar;