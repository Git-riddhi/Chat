import { View, Text, StyleSheet, TextInput,TouchableOpacity, Dimensions, Button, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
// import { logo } from '../../../assets/Logo';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

const Login = (props) => {
    const [number, setNumber] = useState(null)
    const [name, setName] = useState(null)
    const [visible, setVisible] = useState(null)

    const loginUser = () => {
        firestore()
            .collection('usersSignUpData')
            .where('mobile', '==', number)
            .get()
            .then(res => {
                if (res.docs != []) {
                    // console.log(JSON.stringify(res.docs[0].data()));
                    console.log("Firebase data===", JSON.stringify(res.docs[0].data()));
                    goToNext(
                        res.docs[0].data().name,
                        res.docs[0].data().mobile,
                        res.docs[0].data().userId,
                    );
                } else {
                    Alert.alert('User not found');
                }
            })
            .catch(error => {
                setVisible(false);
                console.log(error);
                Alert.alert('User not found');
            });
    };
    const goToNext = async (name, number, userId) => {
        await AsyncStorage.setItem('NAME', name);
        await AsyncStorage.setItem('MOBILE', number);
        await AsyncStorage.setItem('USERID', userId);
        props.navigation.navigate('ChatListing', { id: userId });
    };

    return (
        <>
            <View style={styles.containerStyle}>
                <Text>Login</Text>
                <TextInput style={styles.input}
                    placeholder="Enter Phone Number"
                    onChangeText={(number) => { setNumber(number) }}
                    keyboardType='numeric'
                />
                <TextInput style={styles.input}
                    placeholder="Enter Name"
                    onChangeText={(name) => { setName(name) }}
                    keyboardType='email-address'
                />

                <View style={styles.button}>
                    <Button title={'Login'} onPress={() => { loginUser() }} color={'green'} />
                </View>
                {/* <View style={styles.button}>
                    <Button title={'Login as a Guest'} onPress={() => { props.navigation.navigate('User') }} color={'rgba(0,0,50,0.9)'} />
                </View> */}
                {/* <View style={styles.logoViewStyle}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('EmailAuthentication') }}>
                        <Image
                            source={{ uri: logo.Email_Logo }}
                            resizeMode='contain'
                            style={styles.logoImageStyle}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }}>
                        <Image
                            source={{ uri: logo.Facebook_Logo }}
                            resizeMode='contain'
                            style={styles.logoImageStyle} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('GoogleAuthentication') }}>
                        <Image
                            source={{ uri: logo.Google_Logo }}
                            resizeMode='contain'
                            style={styles.logoImageStyle} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('PhoneAuthentication') }}>
                        <Image
                            source={{ uri: logo.Phone_Logo }}
                            resizeMode='contain'
                            style={styles.logoImageStyle} />
                    </TouchableOpacity>
                </View> */}
            </View>

        </>
    )
}
const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: 'white',
        width: deviceWidth - 20,
        marginVertical: 10,
        alignSelf: 'center',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    button: {
        marginVertical: 10,
        width: deviceWidth / 2
    },
    logoImageStyle: {
        height: 40,
        width: 40,
    },
    logoViewStyle: {
        marginTop: deviceHeight * 0.15,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: deviceWidth * 0.8,
    }
})

export default Login