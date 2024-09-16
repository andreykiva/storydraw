import styles from './FormFooter.module.scss';

type FormFooterProps = {
	isPhoneAndPassword: boolean;
	isPhoneAndCode: boolean;
	onOpenResetForm: () => void;
	onSwitchToPhoneAndPassword: () => void;
	onSwitchToPhoneAndCode: () => void;
};

const FormFooter = (props: FormFooterProps) => {
	const { isPhoneAndPassword, isPhoneAndCode, onOpenResetForm, onSwitchToPhoneAndPassword, onSwitchToPhoneAndCode } =
		props;

	return (
		<div className={styles.FormFooter}>
			{!isPhoneAndCode && (
				<span className={styles.FooterBtn} onClick={onOpenResetForm}>
					Forgot password?
				</span>
			)}
			{isPhoneAndPassword && (
				<>
					<span className={styles.FooterDivider}></span>
					<span className={styles.FooterBtn} onClick={onSwitchToPhoneAndCode}>
						Log in with code
					</span>
				</>
			)}
			{isPhoneAndCode && (
				<span className={styles.FooterBtn} onClick={onSwitchToPhoneAndPassword}>
					Log in with password
				</span>
			)}
		</div>
	);
};

export default FormFooter;
