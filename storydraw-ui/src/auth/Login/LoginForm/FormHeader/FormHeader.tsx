import React from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';

type FormHeaderProps = {
	isLoginAndPassword: boolean;
	onSwitchToPhoneAndCode: () => void;
	onSwitchToLoginAndPassword: () => void;
};

const FormHeader = ({ isLoginAndPassword, onSwitchToPhoneAndCode, onSwitchToLoginAndPassword }: FormHeaderProps) => {
	return (
		<div className={authSharedStyles.FormHeader}>
			<span className={authSharedStyles.HeaderTitle}>
				{isLoginAndPassword ? 'Email or username' : 'Enter phone number'}
			</span>
			<span
				className={authSharedStyles.HeaderBtn}
				onClick={isLoginAndPassword ? onSwitchToPhoneAndCode : onSwitchToLoginAndPassword}
			>
				{isLoginAndPassword ? 'Log in with phone' : 'Log in with email or username'}
			</span>
		</div>
	);
};

export default FormHeader;
