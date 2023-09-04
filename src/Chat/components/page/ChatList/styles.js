import { Dimensions, StyleSheet } from "react-native"

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

export const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageStyle: {
        height: 45,
        width: 45,
        borderRadius: 35,
    },
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
        width: deviceWidth * 0.8,
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
        color: 'gray',
        fontSize: 10,
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
        padding: 10,
    },
    appBarTextStyle: {
        color: 'white',
        fontSize: 22,
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
        width: '40%',
        padding:5
    },
    headerViewstyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})