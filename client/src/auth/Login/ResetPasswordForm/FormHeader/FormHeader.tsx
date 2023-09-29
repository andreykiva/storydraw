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
			<span className={authSharedStyles.HeaderTitle}>
				{isPhoneMode ? 'Enter phone number' : 'Enter email address'}
			</span>
			{isPhoneMode ? (
				<span className={authSharedStyles.HeaderBtn} onClick={disablePhoneMode}>
					Reset with email
				</span>
			) : (
				<span className={authSharedStyles.HeaderBtn} onClick={enablePhoneMode}>
					Reset with phone number
				</span>
			)}
		</div>
	);
};

export default FormHeader;
