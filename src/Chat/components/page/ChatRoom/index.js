import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import Icon from 'react-native-vector-icons/AntDesign'
import SendIcon from 'react-native-vector-icons/Ionicons'

const ChatRoom = (props) => {
    const [text, setText] = useState('');

    // const [numberOfLines,setNumberOfLines]=useState(1)

    // const handleScrollInTextInput = (contentWidth, contentHeight) => {
    //     const lineHeight = 20;
    //     const newNumberOfLines = Math.floor(contentHeight / lineHeight);
    //     setNumberOfLines(newNumberOfLines);
    //   };
    // const maxLines = 5;
    // const numberOfLines = text.split('\n').length;
    // const scrollEnabled = numberOfLines > maxLines;

    const countNumOfLines = (text) =>{
        return text.split('\n').length
    }


    return (
        <View style={styles.containerStyle}>
            <View style={styles.appBarStyle}>
                <TouchableOpacity style={styles.backIconStyle} onPress={() => props.navigation.goBack()}>
                    <Icon name='arrowleft' size={20} color='white' />
                </TouchableOpacity>
                <Image
                    style={styles.profileImageStyle}
                    resizeMode='cover'
                    source={{ uri: props?.route?.params?.chatUserProfileImage }}
                />
                <Text style={styles.nameStyle}>{props?.route?.params?.userName}</Text>
            </View>
            <View style={styles.mainViewStyle}>
                <View style={styles.innnerViewStyle}>
                    <View style={styles.textInputViewStyle}>
                        <TextInput
                            editable={true}
                            onChangeText={(inputText) => setText(inputText)}
                            value={text}
                            numberOfLines={countNumOfLines(text) > 4 ? 5 : 0}
                            scrollEnabled={true}
                            multiline
                            style={[styles.textInputStyle]}
                            placeholder='Message'
                        />
                            <Icon name='paperclip' 
                            size={18}  
                            onPress={()=>console.log("Hello")} 
                            style={styles.iconStyle}/>
                    </View>
                    <Pressable style={styles.sendButtonStyle}>
                        <SendIcon name='send' size={15} color={'white'} />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default ChatRoom