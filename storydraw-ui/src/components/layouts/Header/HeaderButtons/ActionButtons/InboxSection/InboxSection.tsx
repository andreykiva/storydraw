import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import cn from 'classnames';
import styles from './InboxSection.module.scss';
import { ReactComponent as InboxIcon } from '@/assets/icons/inbox.svg';
import useClickOutside from '@/hooks/useClickOutside';
import Notifications from '@/components/Notifications/Notifications';
import Prompt from '@/components/ui/Prompt/Prompt';
import { openNotificationsModal, closeNotificationsModal } from '@/features/notifications/notificationsSlice';
import { selectNotificationsModalStatus } from '@/features/notifications/notificationsSlice';
import { MENU_POSITION } from '@/constants/ui';
import { NEW_NOTIFICATIONS_COUNT_SUBSCRIPTION } from '@/graphql/notifications/subscriptions';
import { GET_NEW_NOTIFICATIONS_COUNT } from '@/graphql/notifications/queries';
import { UPDATE_LAST_NOTIFICATIONS_VIEWED } from '@/graphql/notifications/mutations';
import NotificationsCount from './NotificationsCount/NotificationsCount';

const InboxSection = () => {
	const dispatch = useDispatch();
	const isNotificationsOpen = useSelector(selectNotificationsModalStatus);
	const inboxSectionRef = useRef<HTMLDivElement>(null);

	const { data: subscribeData } = useSubscription(NEW_NOTIFICATIONS_COUNT_SUBSCRIPTION);
	const { data: queryData } = useQuery(GET_NEW_NOTIFICATIONS_COUNT);
	const [updateLastNotificationsViewed] = useMutation(UPDATE_LAST_NOTIFICATIONS_VIEWED);

	useClickOutside([inboxSectionRef], isNotificationsOpen, () => {
		dispatch(closeNotificationsModal());
	});

	const handleToggleNotifications = () => {
		if (isNotificationsOpen) {
			dispatch(closeNotificationsModal());
		} else {
			updateLastNotificationsViewed();
			dispatch(openNotificationsModal());
		}
	};

	let notificationsCount = queryData?.newNotificationsCount;
	const subscribeNotificationsCount = subscribeData?.newNotificationsCountUpdated.count;

	if (isFinite(subscribeNotificationsCount)) {
		notificationsCount = subscribeNotificationsCount;
	}

	return (
		<div className={cn(styles.InboxSection, isNotificationsOpen && styles.Active)} ref={inboxSectionRef}>
			<div className={styles.InboxBtn} onClick={handleToggleNotifications}>
				{!isNotificationsOpen && <NotificationsCount count={notificationsCount} />}
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
