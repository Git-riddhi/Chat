import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';

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

    return (
        <View>
            <View style={styles.header}>
                <Icon
                    name={'arrowleft'}
                    size={25}
                    color={'black'}
                // onPress={() => {
                //     props.navigation.navigate('');
                // }}
                />
                <Text style={styles.title}>Chat List</Text>
                <View>

                </View>
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
                                <Image source={require('../../../../../assets/avatar.png')}
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
})
export default ChatListing;
