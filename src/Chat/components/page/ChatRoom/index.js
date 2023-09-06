import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Pressable, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import { styles } from './styles'
import Icon from 'react-native-vector-icons/AntDesign'
import SendIcon from 'react-native-vector-icons/Ionicons'
import { useAppContext } from '../../../context/AppContext'
import { sendMessage } from '../../../utils/globalConstant'
import {KeyboardAvoidingView} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'

const ChatRoom = (props) => {
    const [messages, setMessages] = useState([]);

    const { currentChatUser, currentChatUserProfile, onSend, text, setText } = useAppContext()

    const onSendMessage = useCallback((newMessages = []) => {
        console.log("newMessages==", newMessages);
        setMessages((prevMessages) =>
            GiftedChat.append(prevMessages, newMessages));
    }, []);

    return (
        <View style={styles.containerStyle}>
            <View style={styles.appBarStyle}>
                <TouchableOpacity style={styles.backIconStyle} onPress={() => props.navigation.goBack()}>
                    <Icon name='arrowleft' size={20} color='white' />
                </TouchableOpacity>
                <Image
                    style={styles.profileImageStyle}
                    resizeMode='cover'
                    source={{ uri: currentChatUserProfile }}
                />
                <Text style={styles.nameStyle}>{currentChatUser}</Text>
            </View>

            {/* <View style={styles.messageContainerStyle}> */}
            {/* <ScrollView style={styles.scrollViewStyle} > */}
            {/* <KeyboardAvoidingView> */}
            {/* <ScrollView style={styles.scrollViewStyle} > */}
            {/* <KeyboardAvoidingView behavior="padding" enabled> */}
            {/* {sendMessage.map((item) => (
                            <>
                                <Text style={styles.sendMessageStyle}>{item.newMessage}</Text>

                            </>
                        ))} */}
            {/* </KeyboardAvoidingView> */}
            {/* </ScrollView> */}
            {/* </View> */}
            {/* <View style={styles.mainViewStyle}>
                <View style={styles.innnerViewStyle}> */}
            {/* <View style={styles.textInputViewStyle}>
                        <TextInput
                            editable={true}
                            onChangeText={(inputText) => setText(inputText)}
                            value={text}
                            // numberOfLines={countNumOfLines(text) > 4 ? 5 : 0}
                            scrollEnabled={true}
                            multiline
                            style={[styles.textInputStyle]}
                            placeholder='Message'
                        />
                        <Icon name='paperclip'
                            size={18}
                            onPress={() => console.log("Hello")}
                            style={styles.iconStyle} />
                    </View> */}
            {/* <Pressable style={styles.sendButtonStyle} onPress={() => onSend(text)}>
                        <SendIcon name='send' size={15} color={'white'} />
                    </Pressable> */}
            {/* </View>
            </View> */}

            <GiftedChat
                messages={messages}
                onSend={messages => onSendMessage(messages)}
                user={{
                    _id: currentChatUser,
                }}
                placeholder='Message'
                textInputStyle={styles.textInputStyle}
                alwaysShowSend={true}
            />
        </View>
    )
}

export default ChatRoom