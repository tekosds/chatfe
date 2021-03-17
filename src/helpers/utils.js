import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

export function getHistory() {
	return history;
}

export function changeRoute(route = '/') {
	history.push(route);
}

export function getLocation() {
	return history.location.pathname;
}
