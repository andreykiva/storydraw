import React from 'react';
import styles from './SwitchToPublicModal.module.css';
import ModalOverlay from '@/components/ui/ModalOverlay/ModalOverlay';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';
import Button from '@/components/ui/buttons/Button/Button';
import closeIcon from '@/assets/icons/close.svg?url';

type SwitchToPublicModalProps = {
	onClose: () => void;
	onConfirm: () => void;
};

const SwitchToPublicModal = ({ onClose, onConfirm }: SwitchToPublicModalProps) => {
	return (
		<ModalOverlay>
			<div className={styles.SwitchToPublicModal}>
				<RoundButton onClick={onClose} className={styles.CloseBtn}>
					<img src={closeIcon} alt="CLose" className={styles.CloseIcon} />
				</RoundButton>
				<h2 className={styles.HeaderTitle}>Switch to public account?</h2>
				<p className={styles.ModalDescr}>
					If you switch to a public account, anyone can watch your stories. Users may be able to Duet, Stitch,
					or download your stories depending on what you choose in Settings and privacy. You won't need to
					approve followers and all pending follow requests will be automatically approved.
				</p>
				<div className={styles.ModalActionButtons}>
					<Button className={styles.CancelBtn} onClick={onClose}>
						Cancel
					</Button>
					<Button className={styles.ConfirmBtn} onClick={onConfirm}>
						Confirm
					</Button>
				</div>
			</div>
		</ModalOverlay>
	);
};

export default SwitchToPublicModal;
