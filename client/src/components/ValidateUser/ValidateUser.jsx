import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

const ValidateUser = (props) => {
	let params = useParams();
	let userId = params.userId.match(/\@[a-zA-Z0-9_-]+/);

	if (!userId) {
		return <Navigate to="/" />;
	}

	return <>{props.children}</>;
};

export default ValidateUser;
