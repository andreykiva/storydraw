import React, { useState } from 'react';
import styles from './DeleteAccountVerification.module.scss';
import Button from '@/components/ui/buttons/Button/Button';
import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow.svg';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';
import HTag from '@/components/ui/HTag/HTag';
import CodeInput from '@/components/ui/inputs/CodeInput/CodeInput';
import ConfirmationModal from '@/components/ui/ConfirmationModal/ConfirmationModal';

//make timer

type DeleteAccountVerificationProps = {
	onBack: () => void;
};

const enum REGISTRATION_METHOD {
	PHONE = 'phone',
	EMAIL = 'email',
	GOOGLE = 'google',
	FACEBOOK = 'facebook',
	TWITTER = 'twitter',
}

const DeleteAccountVerification = ({ onBack }: DeleteAccountVerificationProps) => {
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
	//test
	const registerMethods: REGISTRATION_METHOD[] = [
		REGISTRATION_METHOD.PHONE,
		REGISTRATION_METHOD.EMAIL,
		REGISTRATION_METHOD.GOOGLE,
		REGISTRATION_METHOD.FACEBOOK,
		REGISTRATION_METHOD.TWITTER,
	];
	const testRegisterMethod: REGISTRATION_METHOD = registerMethods[Math.floor(Math.random() * registerMethods.length)];
	let verificationMessage = '';

	if (testRegisterMethod === REGISTRATION_METHOD.EMAIL || testRegisterMethod === REGISTRATION_METHOD.PHONE) {
		const codeType = testRegisterMethod === REGISTRATION_METHOD.EMAIL ? 'Email' : 'SMS';

		verificationMessage = `complete ${codeType} verification first. 
		You will receive an ${codeType} code after tapping "Send code".`;
	} else {
		verificationMessage = `log in your associated ${testRegisterMethod} account first.`;
	}

	const handleDeleteAccount = () => {
		setIsConfirmationModalOpen(false);
		//delete
	};

	return (
		<>
			<div className={styles.VerificationHeader}>
				<RoundButton className={styles.BackBtn} onClick={onBack}>
					<ArrowIcon className={styles.ArrowIcon} />
				</RoundButton>
				<HTag tag="h3" className={styles.Title}>
					Verify and continue
				</HTag>
			</div>
			<p className={styles.VerificationMessage}>
				To continue, you need to {verificationMessage} Tapping "Delete account" will delete StoryDraw account andrewtest1237
			</p>

			{testRegisterMethod === REGISTRATION_METHOD.GOOGLE && <div className={styles.VerifyWithSocialMedia}></div>}
			{testRegisterMethod === REGISTRATION_METHOD.FACEBOOK && <div className={styles.VerifyWithSocialMedia}></div>}
			{testRegisterMethod === REGISTRATION_METHOD.TWITTER && <div className={styles.VerifyWithSocialMedia}></div>}
			{testRegisterMethod === REGISTRATION_METHOD.PHONE && (
				<div className={styles.VerifyWithCode}>
					<CodeInput error="" disabled={false} placeholder="Enter 4-digit code" loading={false} onSendCode={() => {}} />
				</div>
			)}
			{testRegisterMethod === REGISTRATION_METHOD.EMAIL && (
				<div className={styles.VerifyWithCode}>
					<CodeInput error="" disabled={false} placeholder="Enter 4-digit code" loading={false} onSendCode={() => {}} />
				</div>
			)}

			<Button className={styles.DeleteBtn} onClick={() => setIsConfirmationModalOpen(true)}>
				Delete account
			</Button>

			{isConfirmationModalOpen && (
				<ConfirmationModal
					title="Delete account"
					confirmAction="Delete"
					onClose={() => setIsConfirmationModalOpen(false)}
					onConfirm={handleDeleteAccount}
				>
					Are you sure you want to delete account andrewtest1237?
				</ConfirmationModal>
			)}
		</>
	);
};

export default DeleteAccountVerification;
