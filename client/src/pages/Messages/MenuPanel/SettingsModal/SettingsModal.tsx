import React, { useEffect, useState } from 'react';
import styles from './SettingsModal.module.css';
import ModalOverlay from '@/components/ui/ModalOverlay/ModalOverlay';
import Button from '@/components/ui/buttons/Button/Button';
import Radio from '@/components/ui/inputs/Radio/Radio';
import CloseButton from '@/components/ui/buttons/CloseButton/CloseButton';
import HTag from '@/components/ui/HTag/HTag';

type SettingsModalProps = {
	onClose: () => void;
};

const testAllowedMessageSenders = 'friends';

const SettingsModal = ({ onClose }: SettingsModalProps) => {
	const [allowedMessageSenders, setAllowedMessageSenders] = useState('friends');

	useEffect(() => {
		setAllowedMessageSenders(testAllowedMessageSenders);
	}, []);

	return (
		<ModalOverlay>
			<div className={styles.SettingsModal}>
				<div className={styles.ModalHeader}>
					<HTag tag="h3" className={styles.HeaderTitle}>
						Message settings
					</HTag>
					<CloseButton className={styles.CloseBtn} onClick={onClose} />
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
						<Button className={styles.CancelBtn} onClick={onClose}>
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
