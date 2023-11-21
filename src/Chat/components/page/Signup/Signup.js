import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Button, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

const Login = (props) => {
    const [number, setNumber] = useState(null)
    const [name, setName] = useState(null)

    const userSignUp = () => {
        const userId = uuid.v4();
        firestore()
            .collection('usersSignUpData')
            .doc(userId)
            .set({
                name: name,
                mobile: number,
                userId: userId,
            })
            .then(res => {
                console.log('user created ');
                props.navigation.navigate('Login');
            })
            .catch(error => {
                console.log(error);
            });

    }


    return (
        <>
            <View style={styles.containerStyle}>
                <Text style={{ fontSize: 17, color: 'rgb(11,129,105)', fontWeight: 'bold', marginBottom: 10 }}>Register Yourself</Text>
                {/* <Image source={{ uri: 'https://assets-global.website-files.com/62396affb4902b847d57a975/64a293b4823bab1a05a13d51_Website_Blog_Feature-Image_WA-Ads.png' }}
                    style={{ height: 150, width: 150 }} /> */}
                <TextInput style={styles.input}
                    placeholder="Enter Phone Number"
                    placeholderTextColor={'grey'}
                    onChangeText={(number) => { setNumber(number) }}
                    keyboardType='numeric'
                />
                <TextInput style={styles.input}
                    placeholder="Enter Name"
                    placeholderTextColor={'grey'}
                    onChangeText={(name) => { setName(name) }}
                    keyboardType='email-address'
                />

                <View style={styles.button}>
                    <Button title={'SignUp'} onPress={() => { userSignUp() }} color={'rgb(11,129,105)'} />
                </View>

                <TouchableOpacity onPress={() => { props.navigation.navigate('Login') }} style={{flexDirection:'row', alignItems:'center', marginTop:30}}>
                    <Text style={{ fontSize: 15, color: 'rgb(11,129,105)', marginBottom: 2, marginRight:6 }}>Already registered ? </Text>

                    <Text style={{ fontSize: 17, color: 'rgb(11,129,105)', fontWeight: 'bold' }}>LOGIN</Text>

                </TouchableOpacity>

            </View>

        </>
    )
}
const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        // backgroundColor:'rgb(186,206,153)'
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
        color:'rgb(11,129,105)'
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