import React from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';

type LoginMethod = 'loginAndPassword' | 'phoneAndCode' | 'phoneAndPassword';

type FormHeaderProps = {
	loginMethod: LoginMethod;
	onChangeLoginMethod: (loginMethod: LoginMethod) => void;
};

const FormHeader = ({ loginMethod, onChangeLoginMethod }: FormHeaderProps) => {
	const isLoginAndPassword = loginMethod === 'loginAndPassword';

	return (
		<div className={authSharedStyles.FormHeader}>
			<span className={authSharedStyles.HeaderTitle}>
				{isLoginAndPassword ? 'Email or username' : 'Enter phone number'}
			</span>
			<span
				className={authSharedStyles.HeaderBtn}
				onClick={onChangeLoginMethod.bind(this, isLoginAndPassword ? 'phoneAndCode' : 'loginAndPassword')}
			>
				{isLoginAndPassword ? 'Log in with phone' : 'Log in with email or username'}
			</span>
		</div>
	);
};

export default FormHeader;
