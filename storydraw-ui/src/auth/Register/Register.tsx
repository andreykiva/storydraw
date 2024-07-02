import React, { useState } from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
import RegisterOptions from './RegisterOptions/RegisterOptions';
import RegisterForm from './RegisterForm/RegisterForm';

const enum REGISTER_VIEW {
	REGISTER_OPTIONS = 'registerOptions',
	REGISTER_FORM = 'registerForm',
}

const Register = () => {
	const [registerView, setRegisterView] = useState<REGISTER_VIEW>(REGISTER_VIEW.REGISTER_OPTIONS);

	return (
		<div className={authSharedStyles.AuthInner}>
			{registerView === REGISTER_VIEW.REGISTER_OPTIONS && (
				<RegisterOptions openForm={() => setRegisterView(REGISTER_VIEW.REGISTER_FORM)} />
			)}
			{registerView === REGISTER_VIEW.REGISTER_FORM && (
				<RegisterForm onShowRegisterOptions={() => setRegisterView(REGISTER_VIEW.REGISTER_OPTIONS)} />
			)}
		</div>
	);
};

export default Register;
