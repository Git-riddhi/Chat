import { Dimensions, StyleSheet } from "react-native"
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
export const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'white',
    },
    profileImageStyle:{
        width:35,
        height:35,
        borderRadius:20,
        marginHorizontal:3,
    },
    nameStyle:{
        fontSize:15,
        color:'white',
        marginLeft:7,
    },
    appBarStyle:{
        backgroundColor:'rgb(11,129,105)',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:4,
        paddingVertical:7,
    },
    backIconStyle:{
        // backgroundColor:'red',
        padding:3,
        borderRadius:15,
    },
    textInputStyle: {
        backgroundColor: 'silver',
        width: (deviceWidth*0.78) - 10,
        marginHorizontal: 5,  
        borderRadius:30,
        // borderBottomStartRadius:30,
        paddingHorizontal:10,
        textAlignVertical:'center',
        paddingVertical:10,
    },
    sendButtonStyle:{
        backgroundColor:'rgb(11,129,105)',
        width:40,
        height:40,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:5,
    },
    innnerViewStyle: { 
        flexDirection: 'row', 
        // backgroundColor: 'green', 
        marginHorizontal: 5, 
        width:deviceWidth-10,
        justifyContent:'space-between',
        alignItems:'center'
    },
    mainViewStyle: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingVertical: 5,
    },
    textInputViewStyle:{
        backgroundColor:'red',
        width:deviceWidth*0.85,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'silver',
        borderRadius:25,
    },
    iconStyle:{
        alignSelf:'flex-end',
        bottom:12,
    }
})