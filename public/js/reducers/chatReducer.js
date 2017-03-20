export default function(state={
    users: {},
    chat: {
        messages: [],
        chatID: null,
    },
    error: null,
}, action) {
    switch(action.type) {
        case "FETCH_MESSAGES": {
            return {...state, fetching: true};
            break;
        }
        case "RECEIVE_MESSAGES_REJECTED": {
            return {...state, fetching: false, error: action.payload};
            break;
        }
        case "RECEIVE_MESSAGES_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                chat: {...state.chat, messages: action.payload}
            }
            break;
        }
        case "RECEIVE_MESSAGES": {
            return {
                ...state,
                chat: {...state.chat, messages: action.payload}
            }
            break;
        }
    }
    return state;
}
