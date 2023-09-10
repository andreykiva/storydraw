import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

type ValidateUserProps = {
	children: React.ReactNode;
};

const ValidateUser = ({ children }: ValidateUserProps) => {
	const params = useParams();
	const userId = params.userId.match(/@[a-zA-Z0-9_-]+/);

	if (!userId) {
		return <Navigate to="/" />;
	}

	return <>{children}</>;
};

export default ValidateUser;
