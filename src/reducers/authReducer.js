import { authConstants } from '../constants';
import { setItem, getItem, removeItem } from '../helpers';

const loggedIn = !!getItem('chatUser');
const user = loggedIn && getItem('chatUser');

export function authReducer(
	state = {
		loggedIn,
		user,
		loggedOut: false
	},
	action = {}
) {
	switch (action.type) {
		case authConstants.LOGIN_REQUEST:
			return {
				...state,
				loggedIn: false,
				loggedOut: false
			};
		case authConstants.LOGIN_SUCCESS:
			setItem('chatUser', action.result);
			return {
				...state,
				user: action.result,
				loggedIn: true
			};
		case authConstants.LOGIN_FAILURE:
			return {
				...state,
				loggedInFailed: true
			};
		case authConstants.SIGNUP_REQUEST:
			return {
				...state,
				loggedIn: false
			};
		case authConstants.SIGNUP_SUCCESS:
			setItem('chatUser', action.result);
			return {
				...state,
				user: action.result,
				loggedIn: true
			};
		case authConstants.SIGNUP_FAILURE:
			return {
				...state,
				loggedIn: false
			};
		case authConstants.LOGOUT_SUCCESS: {
			return {
				...state,
				loggedOut: true
			};
		}
		case authConstants.DISCONNECT: {
			removeItem('chatUser');
			return {
				...state,
				loggedIn: false
			};
		}
		default:
			return state;
	}
}
