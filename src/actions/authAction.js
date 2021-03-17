import * as authService from '../services/authService';
import { authConstants } from '../constants';
import { changeRoute, getItem, removeItem } from '../helpers';

export function login(userName, password) {
	return async (dispatch) => {
		dispatch(loginRequest());

		let result = await authService.login(userName, password);
		if (result.OK) {
			dispatch(loginSuccess(result.Data));
			changeRoute('/');
		} else {
			dispatch(loginFailure());
		}
	};

	function loginRequest() {
		return { type: authConstants.LOGIN_REQUEST, userName };
	}

	function loginSuccess(result) {
		return { type: authConstants.LOGIN_SUCCESS, result };
	}

	function loginFailure() {
		return { type: authConstants.LOGIN_FAILURE };
	}
}

export function signup(userName, password) {
	return async (dispatch) => {
		dispatch(signupRequest());

		let result = await authService.signup(userName, password);
		if (result.OK) {
			dispatch(signupSuccess(result.Data));
			changeRoute('/');
		} else {
			dispatch(signupFailure());
		}
	};

	function signupRequest() {
		return { type: authConstants.SIGNUP_REQUEST, userName };
	}

	function signupSuccess(result) {
		return { type: authConstants.SIGNUP_SUCCESS, result };
	}

	function signupFailure() {
		return { type: authConstants.SIGNUP_FAILURE };
	}
}

export function logout() {
	return async (dispatch) => {
		dispatch(success());
	};

	function success() {
		return { type: authConstants.LOGOUT_SUCCESS };
	}
}

export function disconnect() {
	return async (dispatch) => {
		const userName = getItem('chatUser').userName;
		let result = await authService.logout(userName);
		if (result.OK) {
			dispatch(success());
			removeItem('chatUser');
			changeRoute('/login');
		}
	};

	function success() {
		return { type: authConstants.DISCONNECT };
	}
}
