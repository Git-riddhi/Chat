import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Image } from 'react-native';
import { styles } from './styles'

const Splash = (props) => {
    useEffect(() => {
        setTimeout(() => {
            props.navigation.navigate('User')
        }, 2000);
    }, [])
    return (
        <View style={styles.mainViewstyle}> 
            <Image source={require('../../../../../assets/chatSplash.png')} style={styles.imagestyle}/>
        </View>
    )
}

export default Splash