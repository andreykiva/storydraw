import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import styles from './InboxSection.module.scss';
import InboxIcon from '@/assets/icons/inbox.svg';
import useClickOutside from '@/hooks/useClickOutside';
import Notifications from '@/components/Notifications/Notifications';
import Prompt from '@/components/ui/Prompt/Prompt';
import { openNotificationsModal, closeNotificationsModal } from '@/features/notifications/notificationsSlice';
import { selectNotificationsModalStatus } from '@/features/notifications/notificationsSlice';
import { MENU_POSITION } from '@/constants/position';

const InboxSection = () => {
	const dispatch = useDispatch();
	const isNotificationsOpen = useSelector(selectNotificationsModalStatus);
	const inboxSectionRef = useRef<HTMLDivElement>(null);

	useClickOutside([inboxSectionRef], isNotificationsOpen, () => {
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
		<div className={cn(styles.InboxSection, isNotificationsOpen && styles.Active)} ref={inboxSectionRef}>
			<div className={styles.InboxBtn} onClick={handleToggleNotifications}>
				<InboxIcon className={styles.InboxIcon} />
			</div>
			<Prompt position={MENU_POSITION.BOTTOM_CENTER} className={styles.Prompt}>
				Inbox
			</Prompt>
			{isNotificationsOpen && <Notifications />}
		</div>
	);
};

export default InboxSection;
