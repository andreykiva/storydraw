import React from 'react';
import styles from './ChatPanelHeader.module.scss';
import defaultImg from '@/assets/images/default.svg?url';
import { Link } from 'react-router-dom';

const testChatmate = {
	id: '91492',
	username: 'andrii12941295',
	title: 'andrew172',
	image: '',
};

const ChatPanelHeader = () => {
	return (
		<div className={styles.ChatPanelHeader}>
			<Link to={`/@${testChatmate.username}`} className={styles.ChatmateLink}>
				<div className={styles.ChatmateImgWr}>
					<img src={testChatmate.image || defaultImg} alt="Profile picture" className={styles.ChatmateImg} />
				</div>
				<div className={styles.ChatmateInfo}>
					<span className={styles.ChatmateTitle}>{testChatmate.title}</span>
					<span className={styles.ChatmateUsername}>@{testChatmate.username}</span>
				</div>
			</Link>
		</div>
	);
};

export default ChatPanelHeader;