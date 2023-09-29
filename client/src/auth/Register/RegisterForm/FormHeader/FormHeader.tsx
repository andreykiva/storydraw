import React from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';

type FormHeaderProps = {
	isPhoneMode: boolean;
	enablePhoneMode: () => void;
	disablePhoneMode: () => void;
};

const FormHeader = ({ isPhoneMode, enablePhoneMode, disablePhoneMode }: FormHeaderProps) => {
	return (
		<div className={authSharedStyles.FormHeader}>
			<span className={authSharedStyles.HeaderTitle}>{isPhoneMode ? 'Phone' : 'Email'}</span>
			{isPhoneMode ? (
				<span className={authSharedStyles.HeaderBtn} onClick={disablePhoneMode}>
					Sign up with email
				</span>
			) : (
				<span className={authSharedStyles.HeaderBtn} onClick={enablePhoneMode}>
					Sign up with phone
				</span>
			)}
		</div>
	);
};

export default FormHeader;
