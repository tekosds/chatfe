import { combineReducers } from 'redux';
import { chatReducer } from './chatReducer';
import { authReducer } from './authReducer';
import { authConstants } from '../constants';

const appReducer = combineReducers({
	chatReducer,
	authReducer
});

const rootReducer = (state, action) => {
	if (action.type === authConstants.DISCONNECT) {
		state = undefined;
	}

	return appReducer(state, action);
};

export default rootReducer;
