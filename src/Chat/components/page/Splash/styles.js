import { Dimensions, StyleSheet } from "react-native"

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

export const styles = StyleSheet.create({
    mainViewstyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    imagestyle: {
        height: deviceHeight / 3,
        width: deviceWidth / 2,

    },
    iconstyle: {
        height: 80,
        width: 80,
    }
})