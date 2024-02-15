import React from 'react';
import styles from './ChatListItem.module.css';
import type User from '@/types/User';
import defaultImg from '@/assets/icons/default.svg';
import { displayDate } from '@/utils/dateUtils';
import moreIcon from '@/assets/icons/messages/more.svg';

type ChatListItemProps = Pick<User, 'id' | 'username' | 'image'> & {
	lastMessage: string;
	date: Date;
};

const ChatListItem = (props: ChatListItemProps) => {
	const { username, image, lastMessage, date } = props;
	return (
		<li className={styles.ChatListItem}>
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
			<div className={styles.ActionsBtn}>
				<img src={moreIcon} alt="More" className={styles.MoreIcon} />
			</div>
		</li>
	);
};

export default ChatListItem;
