import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Button, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

const Signup = (props) => {
  
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
                <Text>Signup</Text>
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
                    <Button title={'Signup'} onPress={() => { userSignUp() }} color={'green'} />
                </View>

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

export default Signup