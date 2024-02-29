import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ChatListItem.module.css';
import type User from '@/types/User';
import defaultImg from '@/assets/images/default.svg?url';
import { displayDate } from '@/utils/dateUtils';
import moreIcon from '@/assets/icons/messages/more.svg?url';
import ActionsMenu from './ActionsMenu/ActionsMenu';
import useClickOutside from '@/hooks/useClickOutside';
import { setActiveChatmateId, selectActiveChatmateId } from '@/features/messages/messagesSlice';

type ChatListItemProps = Pick<User, 'id' | 'username' | 'image'> & {
	lastMessage: string;
	date: Date;
};

const ChatListItem = (props: ChatListItemProps) => {
	const { id, username, image, lastMessage, date } = props;
	const dispatch = useDispatch();
	const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
	const actionsBtnRef = useRef<HTMLDivElement>(null);
	const activeChatmateId = useSelector(selectActiveChatmateId);

	useClickOutside([actionsBtnRef], () => {
		setIsActionsMenuOpen(false);
	});

	const handleActionsMenuToggle = () => {
		setIsActionsMenuOpen(!isActionsMenuOpen);
	};

	const handleItemClick = () => {
		dispatch(setActiveChatmateId(id));
	};

	return (
		<li className={[styles.ChatListItem, activeChatmateId === id && styles.Active].join(' ')}>
			<div className={styles.ItemContent} onClick={handleItemClick}>
				<div className={styles.ChatmateImgWr}>
					<img src={image || defaultImg} alt="Profile picture" className={styles.ChatmateImg} />
				</div>
				<div className={styles.MessageInfo}>
					<span className={styles.ChatmateUsername}>{username}</span>
					<p className={styles.MessageContent}>
						<span className={styles.MessageText}>{lastMessage}</span>
						<span className={styles.MessageDate}>{displayDate(date, '/')}</span>
					</p>
				</div>
			</div>
			<div
				className={[styles.ActionsBtn, isActionsMenuOpen && styles.Active].join(' ')}
				onClick={handleActionsMenuToggle}
				ref={actionsBtnRef}
			>
				<img src={moreIcon} alt="Actions" className={styles.MoreIcon} />
			</div>
			{isActionsMenuOpen && <ActionsMenu />}
		</li>
	);
};

export default ChatListItem;
