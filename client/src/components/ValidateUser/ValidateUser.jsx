import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

const ValidateUser = (props) => {
	let params = useParams();
	let username = params.user.match(/\@[a-zA-Z0-9_-]+/);

	if (!username) {
		return <Navigate to="/" />;
	}

	return <>{props.children}</>;
};

export default ValidateUser;
