import React, { useEffect, useState } from 'react';
import styles from './SettingsModal.module.scss';
import ModalOverlay from '@/components/ui/ModalOverlay/ModalOverlay';
import Button from '@/components/ui/buttons/Button/Button';
import Radio from '@/components/ui/inputs/Radio/Radio';
import CloseButton from '@/components/ui/buttons/CloseButton/CloseButton';
import HTag from '@/components/ui/HTag/HTag';

type SettingsModalProps = {
	onClose: () => void;
};

const enum ALLOWED_SENDERS {
	FRIENDS = 'friends',
	NONE = 'none',
}

const testAllowedMessageSenders = ALLOWED_SENDERS.FRIENDS;

const SettingsModal = ({ onClose }: SettingsModalProps) => {
	const [allowedMessageSenders, setAllowedMessageSenders] = useState<ALLOWED_SENDERS>(ALLOWED_SENDERS.FRIENDS);

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
								checked={allowedMessageSenders === ALLOWED_SENDERS.FRIENDS}
								onChange={() => setAllowedMessageSenders(ALLOWED_SENDERS.FRIENDS)}
							>
								Friends
							</Radio>
							<Radio
								id="allowed-senders-no-one"
								name="messages"
								checked={allowedMessageSenders === ALLOWED_SENDERS.NONE}
								onChange={() => setAllowedMessageSenders(ALLOWED_SENDERS.NONE)}
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
