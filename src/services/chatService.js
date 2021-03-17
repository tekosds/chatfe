import axios from 'axios';
import { createOKResponse, createErrorResponse } from '../helpers';
import config from './config';

export async function getAllMessages() {
	try {
		const response = await axios({
			method: 'get',
			url: `${config.url}/messages`
		});
		return createOKResponse(response.status, response.data);
	} catch (error) {
		return createErrorResponse(error);
	}
}

export async function submitMessage(userName, messageText) {
	try {
		const response = await axios({
			method: 'post',
			url: `${config.url}/messages`,
			data: { userName, messageText }
		});
		return createOKResponse(response.status, response.data);
	} catch (error) {
		return createErrorResponse(error);
	}
}
