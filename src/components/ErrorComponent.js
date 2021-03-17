import React from 'react';
import { withNamespaces } from 'react-i18next';

const ErrorComponent = ({ t }) => {
	return <div className="not-found-page">Error</div>;
};

export default withNamespaces()(ErrorComponent);
