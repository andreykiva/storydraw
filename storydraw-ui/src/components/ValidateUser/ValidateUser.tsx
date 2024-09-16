import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { urlUsernamePattern } from '@/utils/regexpUtils';

type ValidateUserProps = {
	children: React.ReactNode;
};

const ValidateUser = ({ children }: ValidateUserProps) => {
	const params = useParams();
	const username = params.username?.match(urlUsernamePattern);

	if (!username) {
		return <Navigate to="/" />;
	}

	return <>{children}</>;
};

export default ValidateUser;
