import React, { useEffect, useState } from 'react';
import styles from './SettingsModal.module.css';
import ModalOverlay from '@/components/ui/ModalOverlay/ModalOverlay';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';
import closeImg from '@/assets/icons/close.svg';
import Button from '@/components/ui/buttons/Button/Button';
import Radio from '@/components/ui/inputs/Radio/Radio';

type SettingsModalProps = {
	closeModal: () => void;
};

const testAllowedMessageSenders = 'friends';

const SettingsModal = ({ closeModal }: SettingsModalProps) => {
	const [allowedMessageSenders, setAllowedMessageSenders] = useState('friends');

	useEffect(() => {
		setAllowedMessageSenders(testAllowedMessageSenders);
	}, []);

	return (
		<ModalOverlay>
			<div className={styles.SettingsModal}>
				<div className={styles.ModalHeader}>
					<h2 className={styles.HeaderTitle}>Message settings</h2>
					<RoundButton onClick={closeModal} className={styles.CloseBtn}>
						<img src={closeImg} alt="CLose" className={styles.CloseIcon} />
					</RoundButton>
				</div>
				<div className={styles.ModalContent}>
					<fieldset className={styles.AllowedSendersFieldset}>
						<legend className={styles.AllowedSendersTitle}>Who can send you direct messages</legend>
						<p className={styles.AllowedSendersDescr}>
							With any option, you can receive messages from users that you've sent messages to. Friends
							are your followers that you follow back.
						</p>
						<div className={styles.AllowedMessageSenders}>
							<Radio
								id="allowed-senders-friends"
								name="messages"
								checked={allowedMessageSenders === 'friends'}
								onChange={setAllowedMessageSenders.bind(this, 'friends')}
							>
								Friends
							</Radio>
							<Radio
								id="allowed-senders-no-one"
								name="messages"
								checked={allowedMessageSenders === 'noOne'}
								onChange={setAllowedMessageSenders.bind(this, 'noOne')}
							>
								No one
							</Radio>
						</div>
					</fieldset>
					<div className={styles.ModalActionButtons}>
						<Button className={styles.CancelBtn} onClick={closeModal}>
							Cancel
						</Button>
						<Button
							className={styles.SaveBtn}
							disabled={testAllowedMessageSenders === allowedMessageSenders}
						>
							Save
						</Button>
					</div>
				</div>
			</div>
		</ModalOverlay>
	);
};

export default SettingsModal;
