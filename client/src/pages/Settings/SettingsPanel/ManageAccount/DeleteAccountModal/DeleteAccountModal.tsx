import React, { useState } from 'react';
import styles from './DeleteAccountModal.module.scss';
import ModalOverlay from '@/components/ui/ModalOverlay/ModalOverlay';
import CloseButton from '@/components/ui/buttons/CloseButton/CloseButton';
import DeleteAccountInformation from './DeleteAccountInformation/DeleteAccountInformation';
import DeleteAccountVerification from './DeleteAccountVerification/DeleteAccountVerification';

type DeleteAccountModalProps = {
	onClose: () => void;
};

const enum DELETE_ACCOUNT_STEP {
	INFORMATION = 'information',
	VERIFICATION = 'verification',
}

type DeleteAccountStep = (typeof DELETE_ACCOUNT_STEP)[keyof typeof DELETE_ACCOUNT_STEP];

const DeleteAccountModal = ({ onClose }: DeleteAccountModalProps) => {
	const [deleteAccountStep, setDeleteAccountStep] = useState<DeleteAccountStep>(DELETE_ACCOUNT_STEP.INFORMATION);

	const handleNextStep = () => {
		switch (deleteAccountStep) {
			case DELETE_ACCOUNT_STEP.INFORMATION:
				setDeleteAccountStep(DELETE_ACCOUNT_STEP.VERIFICATION);
				break;
			default:
				break;
		}
	};

	const handlePrevStep = () => {
		switch (deleteAccountStep) {
			case DELETE_ACCOUNT_STEP.VERIFICATION:
				setDeleteAccountStep(DELETE_ACCOUNT_STEP.INFORMATION);
				break;
			default:
				break;
		}
	};

	return (
		<ModalOverlay>
			<div className={styles.DeleteAccountModal}>
				<CloseButton className={styles.CloseBtn} onClick={onClose} />
				{deleteAccountStep === DELETE_ACCOUNT_STEP.INFORMATION && (
					<DeleteAccountInformation onContinue={handleNextStep} />
				)}
				{deleteAccountStep === DELETE_ACCOUNT_STEP.VERIFICATION && (
					<DeleteAccountVerification onBack={handlePrevStep} />
				)}
			</div>
		</ModalOverlay>
	);
};

export default DeleteAccountModal;
