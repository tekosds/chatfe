import axios from 'axios';
import { createOKResponse, createErrorResponse } from '../helpers';
import config from './config';

export async function sendError(message, stack) {
	try {
		let response = await axios({
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				message,
				stack
			},
			url: `${config}/errors`
		});
		return createOKResponse(response.status, response.data);
	} catch (error) {
		return createErrorResponse(error);
	}
}
