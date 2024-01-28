import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './InboxBtn.module.css';
import chatImg from '@/assets/icons/chat.svg';
import useClickOutside from '@/hooks/useClickOutside';
import Notifications from '@/components/Notifications/Notifications';
import Prompt from '../Prompt/Prompt';
import { openNotificationsModal, closeNotificationsModal } from '@/features/notifications/notificationsSlice';
import { selectNotificationsModalStatus } from '@/features/notifications/notificationsSlice';

const InboxBtn = () => {
	const dispatch = useDispatch();
	const isNotificationsOpen = useSelector(selectNotificationsModalStatus);
	const inboxBtnRef = useRef<HTMLDivElement>(null);

	useClickOutside(inboxBtnRef, () => {
		dispatch(closeNotificationsModal());
	});

	const toggleNotifications = () => {
		if (isNotificationsOpen) {
			dispatch(closeNotificationsModal());
		} else {
			dispatch(openNotificationsModal());
		}
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
