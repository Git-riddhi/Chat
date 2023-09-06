import { createContext, useContext, useMemo, useState } from "react";
import { sendMessage } from "../utils/globalConstant";

export const AppContext = createContext({});
export const AppContextProvider = ({ children }) => {
    const [currentChatUser, setCurrentChatUser] = useState()
    const [currentChatUserProfile,setCurrentChatUserProfile]=useState()
    const [text, setText] = useState();

    const onSend = (newMessage) => {
        const messageCreateTime = new Date()
        sendMessage.push({
            newMessage: newMessage,
            messageCreateTime: messageCreateTime
        })
        console.log("sendMessage==",sendMessage);
        setText('')
    }

    const contextPayload = useMemo(() => ({
        //State
        currentChatUser, setCurrentChatUser,
        currentChatUserProfile,setCurrentChatUserProfile,
        text, setText,

        //function
        onSend

    }), [
        //State
        currentChatUser, setCurrentChatUser,
        currentChatUserProfile,setCurrentChatUserProfile,
        text, setText,

        //function
        onSend
    ])
    return (
        <AppContext.Provider value={contextPayload}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = () => useContext(AppContext);
export default AppContext