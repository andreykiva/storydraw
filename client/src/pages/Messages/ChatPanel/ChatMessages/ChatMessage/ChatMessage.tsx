import React, { useState } from 'react';
import styles from './ChatMessage.module.css';
import defaultImg from '@/assets/images/default.svg?url';
import moreIcon from '@/assets/icons/messages/more.svg?url';
import ActionsMenu from './ActionsMenu/ActionsMenu';
import MessageLikes from './MessageLikes/MessageLikes';
import type { Message } from '@/types/Message';

const ChatMessage = (props: Message) => {
	const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
	const { author, text, likes } = props;
	const myTestId = 'user123';
	const isItMe = author.id === myTestId;
	const likedByMe = likes.users.some(user => user.id === myTestId);

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
		<div className={[styles.ChatMessage, isItMe && styles.My].join(' ')}>
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
							likedByMe={likedByMe}
						/>
					)}
				</div>
			</div>
			{likes.users.length > 0 && <MessageLikes likes={likes} isItMyMessage={isItMe} />}
		</div>
	);
};

export default ChatMessage;
