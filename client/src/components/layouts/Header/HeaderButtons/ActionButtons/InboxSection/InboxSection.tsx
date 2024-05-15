import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './InboxSection.module.scss';
import InboxIcon from '@/assets/icons/inbox.svg';
import useClickOutside from '@/hooks/useClickOutside';
import Notifications from '@/components/Notifications/Notifications';
import Prompt from '@/components/ui/Prompt/Prompt';
import { openNotificationsModal, closeNotificationsModal } from '@/features/notifications/notificationsSlice';
import { selectNotificationsModalStatus } from '@/features/notifications/notificationsSlice';

const InboxSection = () => {
	const dispatch = useDispatch();
	const isNotificationsOpen = useSelector(selectNotificationsModalStatus);
	const inboxSectionRef = useRef<HTMLDivElement>(null);

	useClickOutside([inboxSectionRef], () => {
		dispatch(closeNotificationsModal());
	});

	const handleToggleNotifications = () => {
		if (isNotificationsOpen) {
			dispatch(closeNotificationsModal());
		} else {
			dispatch(openNotificationsModal());
		}
	};

	return (
		<div className={[styles.InboxSection, isNotificationsOpen && styles.Active].join(' ')} ref={inboxSectionRef}>
			<div className={styles.InboxBtn} onClick={handleToggleNotifications}>
				<InboxIcon className={styles.InboxIcon} />
			</div>
			<Prompt position='bottomCenter' className={styles.Prompt}>Inbox</Prompt>
			{isNotificationsOpen && <Notifications />}
		</div>
	);
};

export default InboxSection;
