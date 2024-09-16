import { useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import styles from './ChatMessage.module.scss';
import defaultImg from '@/assets/images/default.svg';
import { ReactComponent as MoreIcon } from '@/assets/icons/more-horizontal.svg';
import ActionsMenu from './ActionsMenu/ActionsMenu';
import MessageLikes from './MessageLikes/MessageLikes';
import type { Message } from '@/types/Message';
import { openReport } from '@/features/report/reportSlice';

const ChatMessage = (props: Message) => {
	const dispatch = useDispatch();
	const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
	const { id, author, text, likes } = props;
	const myTestId = '22';
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
		<div className={cn(styles.ChatMessage, isItMe && styles.My)}>
			<div className={styles.MessageContent} onMouseLeave={() => setIsActionsMenuOpen(false)}>
				<div className={styles.MessageAuthor}>
					<img src={author.imageUrl || defaultImg} alt="Profile picture" className={styles.AuthorImg} />
				</div>
				<p className={styles.MessageText}>{text}</p>
				<div
					className={cn(styles.ButtonWithActionsMenu, isActionsMenuOpen && styles.Active)}
					onClick={() => setIsActionsMenuOpen(true)}
				>
					<MoreIcon alt="Actions" className={styles.MoreIcon} />
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
