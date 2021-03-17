import {chatConstants} from '../constants';

export function chatReducer(
    state = {},
    action = {}
) {
    switch (action.type) {
        case chatConstants.GET_ALL_MESSAGES_REQUEST:
            return {
                ...state,
                messagesLoading: true
            };
        case chatConstants.GET_ALL_MESSAGES_SUCCESS:
            return {
                ...state,
                messagesLoading: false,
                messagesData: action.result
            };
        case chatConstants.GET_ALL_MESSAGES_FAILURE:
            return {
                ...state,
                messagesLoading: false
            };
        case chatConstants.ADD_NEW_MESSAGE_SUCCESS:
            return {
                ...state,
                messagesData: [...state.messagesData, {...action.message}]
            };
        default:
            return state;
    }
}
