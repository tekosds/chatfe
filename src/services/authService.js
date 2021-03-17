import axios from 'axios';
import { createOKResponse, createErrorResponse } from '../helpers';
import config from './config';

export async function login(userName, password) {
	try {
		const response = await axios({
			method: 'post',
			url: `${config.url}/login`,
			data: { userName, password }
		});
		return createOKResponse(response.status, response.data);
	} catch (error) {
		return createErrorResponse(error);
	}
}

export async function signup(userName, password) {
	try {
		const response = await axios({
			method: 'post',
			url: `${config.url}/users`,
			data: { userName, password }
		});
		return createOKResponse(response.status, response.data);
	} catch (error) {
		return createErrorResponse(error);
	}
}

export async function logout(userName) {
	try {
		const response = await axios({
			method: 'post',
			url: `${config.url}/logout`,
			data: { userName }
		});
		return createOKResponse(response.status, response.data);
	} catch (error) {
		return createErrorResponse(error);
	}
}
