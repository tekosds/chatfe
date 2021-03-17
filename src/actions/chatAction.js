import * as chatService from '../services/chatService';
import {chatConstants} from '../constants';

export function getAllMessages() {
    return async (dispatch) => {
        dispatch(getAllMessagesRequest());
        let result = await chatService.getAllMessages();
        if (result.OK) {
            dispatch(getAllMessagesSuccess(result.Data));
        } else {
            dispatch(getAllMessagesFailure());
        }
    };

    function getAllMessagesRequest() {
        return {type: chatConstants.GET_ALL_MESSAGES_REQUEST};
    }

    function getAllMessagesSuccess(result) {
        return {type: chatConstants.GET_ALL_MESSAGES_SUCCESS, result};
    }

    function getAllMessagesFailure() {
        return {type: chatConstants.GET_ALL_MESSAGES_FAILURE};
    }
}

export function addNewMessage(newMessage) {
    return async (dispatch) => {
        dispatch(addNewMessageSuccess(newMessage));
    };

    function addNewMessageSuccess(message) {
        return {type: chatConstants.ADD_NEW_MESSAGE_SUCCESS, message};
    }
}

