import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { logout } from '../actions';

const HeaderComponent = ({ t }) => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.authReducer);

	return (
		<div className="header-component">
			<div className="header-component__welcome">
				{t('label.welcome')} - {user && user.userName}
			</div>
			<div className="header-component__logout" onClick={() => dispatch(logout())}>
				{t('label.logout')}
			</div>
		</div>
	);
};

export default withNamespaces()(HeaderComponent);
