export default function(state={
    messages: ["test", "hello"],
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
                messages: action.payload,
            }
            break;
        }
    }
    return state;
}
