import React, { useState, useRef } from 'react';
import styles from './InboxBtn.module.css';
import chatImg from '@/assets/icons/chat.svg';
import useClickOutside from '@/hooks/useClickOutside';
import Notifications from '@/components/Notifications/Notifications';
import Prompt from '../Prompt/Prompt';

const InboxBtn = () => {
	const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
	const inboxBtnRef = useRef(null);

	useClickOutside(inboxBtnRef, () => {
		setIsNotificationsOpen(false);
	});

	const toggleNotifications = () => {
		setIsNotificationsOpen(!isNotificationsOpen);
	};

	return (
		<div className={[styles.InboxBtn, isNotificationsOpen && styles.Active].join(' ')} ref={inboxBtnRef}>
			<div className={styles.InboxBtnContent} onClick={toggleNotifications}>
				<img src={chatImg} alt="Inbox" />
			</div>
			<Prompt text="Inbox" className={styles.Prompt} />
			{isNotificationsOpen && <Notifications />}
		</div>
	);
};

export default InboxBtn;
