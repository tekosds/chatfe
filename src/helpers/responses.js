export function createOKResponse(statusCode, data) {
	return {
		OK: true,
		StatusCode: statusCode,
		Data: data
	};
}

export function createErrorResponse(error) {
	return {
		OK: false,
		StatusCode: error.response.status,
		ErrorText:
			error.response.data.message == null
				? error.response.data.errorMessage
					? error.response.data.errorMessage
					: error.response.data.data
					? error.response.data.data[0].title
					: 'Check your data'
				: error.response.data.message,
		ErrorCode: error.response.data.errorCode
	};
}
