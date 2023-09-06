import { Dimensions, StyleSheet } from 'react-native';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'white',
    },

    appBarStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgb(11,129,105)',
        padding: 10,
        marginBottom: 5,
    },
    headingStyle: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    searchBarView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgb(11,129,105)',
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    textInputstyle: {
        marginHorizontal: 10,
        width: '80%',
        color: 'white',
    },
    itemMainView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    imageView: {
        backgroundColor: 'lightgrey',
        borderRadius: 60,
        padding: 5
    },
    displayNameStyle:{
         fontSize: 15, 
         color: 'black',
          marginLeft:10 },
});
