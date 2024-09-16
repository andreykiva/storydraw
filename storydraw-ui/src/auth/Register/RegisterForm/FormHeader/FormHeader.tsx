import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';

type FormHeaderProps = {
	isPhoneMode: boolean;
	onEnablePhoneMode: () => void;
	onDisablePhoneMode: () => void;
};

const FormHeader = ({ isPhoneMode, onEnablePhoneMode, onDisablePhoneMode }: FormHeaderProps) => {
	return (
		<div className={authSharedStyles.FormHeader}>
			<span className={authSharedStyles.HeaderTitle}>{isPhoneMode ? 'Phone' : 'Email'}</span>
			{isPhoneMode ? (
				<span className={authSharedStyles.HeaderBtn} onClick={onDisablePhoneMode}>
					Sign up with email
				</span>
			) : (
				<span className={authSharedStyles.HeaderBtn} onClick={onEnablePhoneMode}>
					Sign up with phone
				</span>
			)}
		</div>
	);
};

export default FormHeader;
