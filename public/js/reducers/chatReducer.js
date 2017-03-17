export default function(state={
    users: {},
    chat: {
        messages: [],
        chatID: null,
    },
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch(action.type) {
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
    }
    return state;
}
