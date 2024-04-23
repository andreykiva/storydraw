import React, { useState } from 'react';
import styles from './Message.module.css';
import defaultImg from '@/assets/images/default.svg?url';
import moreIcon from '@/assets/icons/messages/more.svg?url';
import type User from '@/types/User';
import ActionsMenu from './ActionsMenu/ActionsMenu';

type MessageProps = {
	id: string;
	author: Pick<User, 'id' | 'image' | 'username'>;
	text: string;
	date: string;
	likes: number;
};

const Message = (props: MessageProps) => {
	const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
	const { author, text } = props;
	const myTestId = 'user123';
	const isItMe = author.id === myTestId;

	const handleLikeMessage = () => {
		console.log('like');
	};

	const handleDeleteMessage = () => {
		console.log('delete');
	};

	const handleReportMessage = () => {
		console.log('report');
	};

	return (
		<div className={[styles.Message, isItMe && styles.My].join(' ')}>
			<div className={styles.MessageContent} onMouseLeave={setIsActionsMenuOpen.bind(this, false)}>
				<div className={styles.MessageAuthor}>
					<img src={author.image || defaultImg} alt="Profile picture" className={styles.AuthorImg} />
				</div>
				<p className={styles.MessageText}>{text}</p>
				<div
					className={[styles.ActionsBtn, isActionsMenuOpen && styles.Active].join(' ')}
					onClick={setIsActionsMenuOpen.bind(this, true)}
				>
					<img src={moreIcon} alt="Actions" className={styles.MoreIcon} />
					{isActionsMenuOpen && (
						<ActionsMenu
							onLike={handleLikeMessage}
							onDelete={handleDeleteMessage}
							onReport={!isItMe && handleReportMessage}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Message;
