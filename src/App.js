import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useErrorBoundary } from 'use-error-boundary';
import { Router, Route, Switch } from 'react-router-dom';
import { ErrorComponent } from './components';
import { sendError } from './services';
import { HomePage, LoginPage, SignUpPage } from './pages';
import { getHistory } from './helpers';

function App() {
	const { ErrorBoundary } = useErrorBoundary({
		onDidCatch: (error, errorInfo) => {
			sendError(error.message, errorInfo.componentStack);
		}
	});

	return (
		<ErrorBoundary renderError={({ err }) => <ErrorComponent error={err} />}>
			<Router history={getHistory()}>
				<Switch>
					<Route exact path="/login" component={LoginPage} />
					<Route exact path="/signup" component={SignUpPage} />
					<Route path="/" exact={true} component={HomePage} />
				</Switch>
			</Router>
		</ErrorBoundary>
	);
}

export default App;
