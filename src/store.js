import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import createThunkErrorHandlerMiddleware from 'redux-thunk-error-handler';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

const myErrorHandler = (error) => {
	if (error && error.message === 'ERROR') {
		return handleErrorThunk;
	}
};

const handleErrorThunk = async (dispatch) => {};

const errorHandlerMiddleware = createThunkErrorHandlerMiddleware({ onError: myErrorHandler });

export default function configureStore() {
	// TODO: use this to enable dev tools
	const store = createStore(rootReducer, composeEnhancers(applyMiddleware(errorHandlerMiddleware, thunk)));
	return store;
}
