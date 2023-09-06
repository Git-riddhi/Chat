import { Dimensions, StyleSheet } from "react-native"
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
export const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'white',
    },
    profileImageStyle: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginHorizontal: 3,
    },
    nameStyle: {
        fontSize: 15,
        color: 'white',
        marginLeft: 7,
    },
    appBarStyle: {
        backgroundColor: 'rgb(11,129,105)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 7,
    },
    backIconStyle: {
        // paddingHorizontal: 10,
        // borderRadius: 15,
    },
    textInputStyle: {
        backgroundColor: 'lightgrey',
        width: (deviceWidth * 0.75) - 20,
        marginHorizontal: 5,
        borderRadius: 30,
        paddingHorizontal: 10,
        textAlignVertical: 'center',
        paddingVertical: 10,
    },
    menuContentStyle: {
        backgroundColor: 'rgb(11, 129, 105)',
        borderRadius: 20,
        alignSelf:'center',
        bottom: '17%',
        left:'16%',
        width: deviceWidth * 0.90,
        elevation: 5,
        zIndex:-100
    },
  
    sendButtonStyle: {
        backgroundColor: 'rgb(11,129,105)',
        width: 45,
        height: 45,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    innnerViewStyle: {
        flexDirection: 'row',
        marginHorizontal: 7,
        width: deviceWidth - 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mainViewStyle: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingVertical: 5,
    },
    textInputViewStyle: {
        width: deviceWidth * 0.82,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        borderRadius: 25,
    },
    centeredView: {
        flex: 1,
        alignSelf: 'center',
        marginVertical: 20,
        marginHorizontal: 15,

    },
    modalView: {
        padding: 10,
        borderRadius: 20,
        flexDirection: 'row',

    },
    pickerView: {
        alignItems: 'center',
        marginHorizontal: 20,
    },
    iconView: {
        borderRadius: 100,
        padding: 17
    },
    modalHeading: {
        fontSize: 14,
        color: 'white'
    },

})