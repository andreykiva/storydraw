import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';

type FormHeaderProps = {
	isPhoneMode: boolean;
	onEnablePhoneMode: () => void;
	onDisablePhoneMode: () => void;
};

const FormHeader = ({ isPhoneMode, onEnablePhoneMode, onDisablePhoneMode }: FormHeaderProps) => {
	return (
		<div className={authSharedStyles.FormHeader}>
			<span className={authSharedStyles.HeaderTitle}>{isPhoneMode ? 'Enter phone number' : 'Enter email address'}</span>
			{isPhoneMode ? (
				<span className={authSharedStyles.HeaderBtn} onClick={onDisablePhoneMode}>
					Reset with email
				</span>
			) : (
				<span className={authSharedStyles.HeaderBtn} onClick={onEnablePhoneMode}>
					Reset with phone number
				</span>
			)}
		</div>
	);
};

export default FormHeader;
