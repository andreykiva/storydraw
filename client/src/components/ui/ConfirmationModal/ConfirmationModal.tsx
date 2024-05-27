import React from 'react';
import styles from './ConfirmationModal.module.scss';
import ModalOverlay from '@/components/ui/ModalOverlay/ModalOverlay';
import CloseButton from '@/components/ui/buttons/CloseButton/CloseButton';
import HTag from '@/components/ui/HTag/HTag';
import Button from '@/components/ui/buttons/Button/Button';

type ConfirmationModalProps = {
	title: string;
	children?: string;
	confirmAction: string;
	onClose: () => void;
	onConfirm: () => void;
};

const ConfirmationModal = (props: ConfirmationModalProps) => {
	const { title, children, confirmAction, onClose, onConfirm } = props;

	return (
		<ModalOverlay>
			<div className={styles.ConfirmationModal}>
				<CloseButton className={styles.CloseBtn} onClick={onClose} />
				<HTag tag="h3" className={styles.ModalTitle}>
					{title}
				</HTag>
				{children && children.length && <p className={styles.ModalDescr}>{children}</p>}
				<div className={styles.ModalActionButtons}>
					<Button className={styles.CancelBtn} onClick={onClose}>
						Cancel
					</Button>
					<Button className={styles.ConfirmBtn} onClick={onConfirm}>
						{confirmAction}
					</Button>
				</div>
			</div>
		</ModalOverlay>
	);
};

export default ConfirmationModal;
