import React, { useState } from 'react';
import styles from './DeleteAccountVerification.module.scss';
import Button from '@/components/ui/buttons/Button/Button';
import ArrowIcon from '@/assets/icons/arrow.svg';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';
import HTag from '@/components/ui/HTag/HTag';
import CodeInput from '@/components/ui/inputs/CodeInput/CodeInput';
import ConfirmationModal from '@/components/ui/ConfirmationModal/ConfirmationModal';

//make timer

type DeleteAccountVerificationProps = {
	onBack: () => void;
};

type RegisterMethod = 'phone' | 'email' | 'google' | 'facebook' | 'twitter';

const DeleteAccountVerification = ({ onBack }: DeleteAccountVerificationProps) => {
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
	//test
	const registerMethods: RegisterMethod[] = ['phone', 'email', 'google', 'facebook', 'twitter'];
	const testRegisterMethod: RegisterMethod = registerMethods[Math.floor(Math.random() * registerMethods.length)];
	let verificationMessage = '';

	if (testRegisterMethod === 'email' || testRegisterMethod === 'phone') {
		const codeType = testRegisterMethod === 'email' ? 'Email' : 'SMS';

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
				To continue, you need to {verificationMessage} Tapping "Delete account" will delete StoryDraw account
				andrewtest1237
			</p>

			{testRegisterMethod === 'google' && <div className={styles.VerifyWithSocialMedia}></div>}
			{testRegisterMethod === 'facebook' && <div className={styles.VerifyWithSocialMedia}></div>}
			{testRegisterMethod === 'twitter' && <div className={styles.VerifyWithSocialMedia}></div>}
			{testRegisterMethod === 'phone' && (
				<div className={styles.VerifyWithCode}>
					<CodeInput error="" disabled={false} placeholder="Enter 4-digit code" />
				</div>
			)}
			{testRegisterMethod === 'email' && (
				<div className={styles.VerifyWithCode}>
					<CodeInput error="" disabled={false} placeholder="Enter 4-digit code" />
				</div>
			)}

			<Button className={styles.DeleteBtn} onClick={setIsConfirmationModalOpen.bind(this, true)}>
				Delete account
			</Button>

			{isConfirmationModalOpen && (
				<ConfirmationModal
					title="Delete account"
					confirmAction="Delete"
					onClose={setIsConfirmationModalOpen.bind(this, false)}
					onConfirm={handleDeleteAccount}
				>
					Are you sure you want to delete account andrewtest1237?
				</ConfirmationModal>
			)}
		</>
	);
};

export default DeleteAccountVerification;
