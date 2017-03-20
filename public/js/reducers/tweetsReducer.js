export default function (state={
    tweets: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch(action.type) {
        case "FETCH_TWEETS": {
            return {...state, fetching: true};
            break;
        }
        case "FETCH_TWEETS_REJECTED": {
            return {...state, fetching: false, error: action.payload};
            break;
        }
        case "FETCH_TWEETS_FULFILLED":{
            return {
                ...state,
                fetching: false,
                fetched: true,
                tweets: action.payload,
            }
            break;
        }
        case "SET_USER_NAME": {
            return {
                ...state,
                user: {...state.user, name: action.payload},
            }
            break;
        }
        case "SET_USER_AGE": {
            return {
                ...state,
                user: {...state.user, age: action.payload},
            }
            break;
        }
        case "SET_USER_URI": {
            return {
                ...state,
                user: {...state.user, uri: action.payload},
            }
            break;
        }
    }

    return state;
};
