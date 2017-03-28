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
        case "RECEIVE_MESSAGES_REJECTED": {
            return {...state, fetching: false, error: action.payload};
        }
        case "RECEIVE_MESSAGES_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                chat: {...state.chat, messages: action.payload}
            }
        }
        case "RECEIVE_ALL_MESSAGES": {
            return {
                ...state,
                chats: action.payload
            }
        }
        case "RECEIVE_MESSAGES": {
            var chatID = action.chatID;
            console.log("chatID is" ,chatID);
            var newState = {...state}
            newState.chats[chatID] = action.payload;
            return newState;
        }
    }
    return state;
}
