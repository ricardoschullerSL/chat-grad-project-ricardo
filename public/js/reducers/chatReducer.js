export default function(state={
    activeChatID: "",
    chats: { chat0:
            {messages: ["Please fetch messages"], usersListening: [], id: "chat0" }
    },
    chatList: [],
}, action) {
    switch(action.type) {
        case "SET_CHAT_ID": {
            return { ...state, activeChatID: action.payload}
        }
        case "SET_CHAT_LIST":{
            return {...state, chatList: action.payload}
        }
        case "FETCH_MESSAGES": {
            return {...state, fetching: true};
        }

        case "PUSH_MESSAGE": {
            let newMessageArray = state.chats[action.chatID].messages.concat(action.payload);
            return {
                ...state,
                chats: {
                    ...state.chats,
                    [action.chatID]: {
                        ...state.chats[action.chatID],
                        messages: newMessageArray
                    }
                }
            }
        }

        case "RECEIVE_ALL_CHATS": {
            return {
                ...state,
                chats: action.payload
            }
        }
        case "RECEIVE_CHAT": {
            return {
                ...state,
                chats: {
                    ...state.chats,
                    [action.chatID]: action.payload
                }
            }
        }
    }
    return state;
}
