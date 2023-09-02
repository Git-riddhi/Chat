import { StyleSheet } from "react-native"

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
    }
})