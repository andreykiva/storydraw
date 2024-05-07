import React, { useState } from 'react';
import styles from './DeleteAccountModal.module.css';
import ModalOverlay from '@/components/ui/ModalOverlay/ModalOverlay';
import CloseButton from '@/components/ui/buttons/CloseButton/CloseButton';
import DeleteAccountInformation from './DeleteAccountInformation/DeleteAccountInformation';
import DeleteAccountVerification from './DeleteAccountVerification/DeleteAccountVerification';

type DeleteAccountModalProps = {
	onClose: () => void;
};

type DeleteAccountView = 'information' | 'verification';

const DeleteAccountModal = ({ onClose }: DeleteAccountModalProps) => {
	const [deleteAccountView, setDeleteAccountView] = useState<DeleteAccountView>('information');

	return (
		<ModalOverlay>
			<div className={styles.DeleteAccountModal}>
				<CloseButton className={styles.CloseBtn} onClick={onClose} />
				{deleteAccountView === 'information' && (
					<DeleteAccountInformation onContinue={setDeleteAccountView.bind(this, 'verification')} />
				)}
				{deleteAccountView === 'verification' && (
					<DeleteAccountVerification onBack={setDeleteAccountView.bind(this, 'information')} />
				)}
			</div>
		</ModalOverlay>
	);
};

export default DeleteAccountModal;
