import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { login } from '../actions';
import { Form } from 'react-bootstrap';
import { changeRoute, getLocation } from '../helpers';

const LoginPage = ({ t }) => {
	const dispatch = useDispatch();
	const { loggedIn } = useSelector((state) => state.authReducer);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	if (!loggedIn && !getLocation().includes('signUp')) {
		return (
			<div className="login-page">
				<div className="login-page__inner">
					<form>
						<h3>{t('label.login')}</h3>
						<Form.Group>
							<Form.Label>{t('label.name')}</Form.Label>
							<Form.Control
								type="text"
								className="form-control"
								placeholder={t('label.enter_name')}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>{t('label.password')}</Form.Label>
							<Form.Control
								type="password"
								className="form-control"
								placeholder={t('label.enter_password')}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Group>
						<button
							type="submit"
							className="btn btn-primary btn-block"
							onClick={(e) => {
								e.preventDefault();
								dispatch(login(email, password));
							}}>
							{t('label.submit')}
						</button>
						<label
							className="login-page__create-account"
							onClick={() => {
								changeRoute('/signup');
							}}>
							{t('label.create_account')}
						</label>
					</form>
				</div>
			</div>
		);
	}

	return <Redirect to="/" />;
};

export default withNamespaces()(LoginPage);
