import { StyleSheet } from "react-native";
import { appDimension } from "../../../utils/globalConstant";


export const styles= StyleSheet.create({
    menuContentStyle: {
        backgroundColor: 'rgb(11, 129, 105)',
        borderRadius: 20,
        alignSelf:'center',
        bottom: '17%',
        left:'16%',
        width: appDimension.deviceWidth * 0.90,
        elevation: 5,
        zIndex:-100
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
    }
})