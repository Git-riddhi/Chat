import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    Image,
    TouchableOpacity,
    StatusBar,
    PermissionsAndroid,
    TextInput
} from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import CameraIcon from 'react-native-vector-icons/SimpleLineIcons'
import IconTwo from 'react-native-vector-icons/Ionicons'
import IconThree from 'react-native-vector-icons/MaterialCommunityIcons'
import ImagePicker, {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import ArrowIcon from 'react-native-vector-icons/AntDesign'

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height


let id = '';
const ChatListing = props => {
    const [users, setUsers] = useState([]);


    const userid = props?.route?.params?.id;

    // console.log('userid===', userid);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        id = await AsyncStorage.getItem('USERID');
        let tempData = [];
        const number = await AsyncStorage.getItem('MOBILE');
        firestore()
            .collection('usersSignUpData')
            .where('mobile', '!=', number)
            .get()
            .then(res => {
                if (res.docs != []) {
                    res.docs.map(item => {
                        tempData.push(item.data());
                    });
                }
                setUsers(tempData);
            });
    };

    console.log('users =====>', users);

    // const ChatSearch = (input) => {

    //     setSearch(input)

    //     // var filteredchat = chatListArray.filter(word => word.name.match(input))

    //     var filteredchat = chatListArray.filter(word => word.name.toLowerCase().includes(input.toLowerCase()));
    //     console.log('filteredchat', filteredchat);
    //     setChatList(filteredchat);

    // }

    // const requestCameraPermission = async () => {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.CAMERA,
    //             {
    //                 title: "App Camera Permission",
    //                 message: "App needs access to your camera ",
    //                 buttonNeutral: "Ask Me Later",
    //                 buttonNegative: "Cancel",
    //                 buttonPositive: "OK"
    //             }
    //         );
    //         const grantedGallery = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //             {
    //                 title: "App Gallery Permission",
    //                 message: "App needs access to your photos",
    //                 buttonNeutral: "Ask Me Later",
    //                 buttonNegative: "Cancel",
    //                 buttonPositive: "OK"
    //             }
    //         );
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED && grantedGallery === PermissionsAndroid.RESULTS.GRANTED) {
    //             console.log("Camera permission given");
    //             LaunchCamera()
    //         } else {
    //             console.log("Camera permission denied");
    //         }
    //     } catch (err) {
    //         console.warn(err);
    //     }

    // }

    // const LaunchCamera = () => {
    //     try {
    //         launchCamera({
    //             mediaType: 'photo'
    //         }, (value) => {
    //             console.log('photos-value', value)
    //             // setPickerResponse(value.assets[0].uri)

    //         })
    //     } catch (error) {
    //         console.log('error--', error)
    //     }

    // }

    return (
        <View>

            <StatusBar barStyle={'light-content'} backgroundColor={'rgb(11,129,105)'} />

            <View style={styles.appBarStyle}>
                <View style={styles.headerViewstyle}>
                    <Text style={styles.appBarTextStyle}>ChatApp</Text>

                    <View style={styles.iconsViewStyle}>
                        {/* <TouchableOpacity
                        // onPress={requestCameraPermission}
                        >
                            <CameraIcon name='camera' size={23} color={'white'} />
                        </TouchableOpacity> */}
                        <TouchableOpacity
                        // onPress={() => { setShowSearchbar(true), setSearch(false) }}
                        >
                            <IconTwo name='search-sharp' size={23} color={'white'} />
                        </TouchableOpacity>
                        <IconThree name='dots-vertical' size={23} color={'white'} />
                    </View>

                </View>
            </View>

            <View style={styles.chatsText}>

                <Text style={styles.titleTextStyle}>Chats</Text>
            </View>
            <FlatList
                data={users}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            // console.log("{ data: item, id: id }", { data: item, id: id });
                            props.navigation.navigate('NewMessage', {
                                data: item,
                                user: userid,
                            });
                        }}>
                            <View style={styles.itemContainerStyle}>
                                <Image
                                    source={{ uri: 'https://images.unsplash.com/photo-1601482918840-f1d6960f6e6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80' }}
                                    // source={require('../../../../../assets/avatar.png')}
                                    resizeMode='cover'
                                    style={styles.imageStyle}
                                />
                                <View>
                                    <View style={styles.viewStyle}>
                                        <Text style={styles.nameTextStyle}>{item.name}</Text>
                                        <Text style={styles.lastMessageTimeTextStyle}>12:43</Text>
                                    </View>
                                    <View style={styles.viewStyle}>
                                        <Text style={styles.lastMessageTextStyle}>Hello How are you ?</Text>
                                        <Text style={styles.unreadTextStyle}>3</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        // <TouchableOpacity
                        //     style={[styles.userItem, { backgroundColor: 'white' }]}
                        //     onPress={() => {
                        //         // console.log("{ data: item, id: id }", { data: item, id: id });
                        //         props.navigation.navigate('NewMessage', {
                        //             data: item,
                        //             user: userid,
                        //         });
                        //     }}>
                        //     <Text style={styles.name}>{item.name}</Text>
                        // </TouchableOpacity>
                    );
                }}
            />
        </View>
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
    userItem: {
        width: Dimensions.get('window').width - 50,
        alignSelf: 'center',
        marginTop: 20,
        flexDirection: 'row',
        height: 60,
        borderWidth: 0.5,
        borderRadius: 10,
        paddingLeft: 20,
        alignItems: 'center',
    },
    userIcon: {
        width: 40,
        height: 40,
    },
    name: { color: 'black', marginLeft: 20, fontSize: 20 },
    itemContainerStyle: {
        flexDirection: 'row',
        width: deviceWidth - 10,
        alignItems: 'center',
        margin: 5,
        // backgroundColor: 'red',
        padding: 5,
    },
    viewStyle: {
        marginLeft: 10,
        width: deviceWidth * 0.75,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor:'red',
    },
    nameTextStyle: {
        fontSize: 15,
        color: 'black',
        fontWeight: '600',
    },
    lastMessageTextStyle: {
        color: 'gray',
        fontSize: 13,

    },
    lastMessageTimeTextStyle: {
        color: 'black',
        fontSize: 10,
    },
    imageStyle: {
        height: 45,
        width: 45,
        borderRadius: 35,
    },
    unreadTextStyle: {
        fontSize: 9,
        color: 'white',
        backgroundColor: 'rgb(37,211,102)',
        width: 15,
        height: 15,
        borderRadius: 10,
        padding: 1,
        textAlign: 'center'
    },
    appBarStyle: {
        backgroundColor: 'rgb(11,129,105)',
        paddingHorizontal: 10
    },
    appBarTextStyle: {
        color: 'white',
        fontSize: 22,
    },
    chatsText: {
        backgroundColor: 'rgb(11,129,105)',
        padding: 5
    },
    titleTextStyle: {
        alignSelf: 'center',
        fontSize: 17,
        color: 'white',
        marginTop: 5
    },
    iconsViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '20%',
        padding: 5,
        // backgroundColor:'red'
    },
    headerViewstyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    searchBarView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgb(11,129,105)',
        paddingHorizontal: 10,
        marginBottom: 2,
    },
    searchBarStyle: {
        marginHorizontal: 10,
        width: '80%',
        color: 'white',
    },
})
export default ChatListing;
