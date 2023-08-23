import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

const ValidateUser = (props) => {
	const params = useParams();
	const userId = params.userId.match(/\@[a-zA-Z0-9_-]+/);

	if (!userId) {
		return <Navigate to="/" />;
	}

	return <>{props.children}</>;
};

export default ValidateUser;
