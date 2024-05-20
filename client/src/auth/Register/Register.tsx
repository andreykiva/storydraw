import React, { useState } from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
import RegisterOptions from './RegisterOptions/RegisterOptions';
import AuthContainer from '@/auth/AuthContainer/AuthContainer';

const enum REGISTER_VIEW {
	REGISTER_OPTIONS = 'registerOptions',
	REGISTER_FORM = 'registerForm',
}

type RegisterView = (typeof REGISTER_VIEW)[keyof typeof REGISTER_VIEW];

const Register = () => {
	const [registerView, setRegisterView] = useState<RegisterView>(REGISTER_VIEW.REGISTER_OPTIONS);

	return (
		<div className={authSharedStyles.AuthInner}>
			{registerView === REGISTER_VIEW.REGISTER_OPTIONS && (
				<RegisterOptions openForm={setRegisterView.bind(this, REGISTER_VIEW.REGISTER_FORM)} />
			)}
			{registerView === REGISTER_VIEW.REGISTER_FORM && (
				<AuthContainer
					showRegisterOptions={setRegisterView.bind(this, REGISTER_VIEW.REGISTER_OPTIONS)}
					authMode='register'
				/>
			)}
		</div>
	);
};

export default Register;
