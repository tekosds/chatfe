import React, {useEffect, useState} from 'react';
import {withNamespaces} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {ChatComponent, HeaderComponent} from '../components';

const HomePage = ({ t }) => {
	const { loggedIn } = useSelector((state) => state.authReducer);

	if (!loggedIn) {
		return <Redirect to="/login" />;
	}
	return (
		<>
			<HeaderComponent />
			<div className="home-page">
				<ChatComponent />
			</div>
		</>
	);
};

export default withNamespaces()(HomePage);
