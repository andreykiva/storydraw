import React from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';

type LoginMethod = 'loginAndPassword' | 'phoneAndCode' | 'phoneAndPassword';

type FormHeaderProps = {
	loginMethod: LoginMethod;
	setLoginMethod: (loginMethod: LoginMethod) => void;
};

const FormHeader = ({ loginMethod, setLoginMethod }: FormHeaderProps) => {
	return (
		<div className={authSharedStyles.FormHeader}>
			<span className={authSharedStyles.HeaderTitle}>
				{loginMethod === 'loginAndPassword' ? 'Email or username' : 'Enter phone number'}
			</span>
			{loginMethod === 'loginAndPassword' ? (
				<span className={authSharedStyles.HeaderBtn} onClick={setLoginMethod.bind(this, 'phoneAndCode')}>
					Log in with phone
				</span>
			) : (
				<span className={authSharedStyles.HeaderBtn} onClick={setLoginMethod.bind(this, 'loginAndPassword')}>
					Log in with email or username
				</span>
			)}
		</div>
	);
};

export default FormHeader;
