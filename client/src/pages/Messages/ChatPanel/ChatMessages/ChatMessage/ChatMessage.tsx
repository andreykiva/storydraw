import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './ChatMessage.module.css';
import defaultImg from '@/assets/images/default.svg?url';
import moreIcon from '@/assets/icons/messages/more.svg?url';
import ActionsMenu from './ActionsMenu/ActionsMenu';
import MessageLikes from './MessageLikes/MessageLikes';
import type { Message } from '@/types/Message';
import { openReport } from '@/features/report/reportSlice';

const ChatMessage = (props: Message) => {
	const dispatch = useDispatch();
	const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
	const { id, author, text, likes } = props;
	const myTestId = 'user123';
	const isItMe = author.id === myTestId;
	const likedByMe = likes.users.some((user) => user.id === myTestId);

	const handleLikeMessage = () => {
		console.log('like');
	};

	const handleDeleteMessage = () => {
		console.log('delete');
	};

	const handleOpenReport = () => {
		dispatch(openReport({ type: 'message', targetId: id }));
	};

	return (
		<div className={[styles.ChatMessage, isItMe && styles.My].join(' ')}>
			<div className={styles.MessageContent} onMouseLeave={setIsActionsMenuOpen.bind(this, false)}>
				<div className={styles.MessageAuthor}>
					<img src={author.image || defaultImg} alt="Profile picture" className={styles.AuthorImg} />
				</div>
				<p className={styles.MessageText}>{text}</p>
				<div
					className={[styles.ButtonWithActionsMenu, isActionsMenuOpen && styles.Active].join(' ')}
					onClick={setIsActionsMenuOpen.bind(this, true)}
				>
					<img src={moreIcon} alt="Actions" className={styles.MoreIcon} />
					{isActionsMenuOpen && (
						<ActionsMenu
							onLike={handleLikeMessage}
							onDelete={handleDeleteMessage}
							onReport={!isItMe && handleOpenReport}
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
