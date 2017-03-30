export default function(state={
    activeChatID: "chat0",
    chats: { chat0:
            {messages: ["Please fetch messages"], users: [], id: "chat0" }
    },
}, action) {
    switch(action.type) {
        case "SET_CHAT_ID": {
            return { ...state, activeChatID: action.payload}
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
