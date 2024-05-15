import React from 'react';
import styles from './MessageLikes.module.scss';
import LikeIcon from '@/assets/icons/like.svg';
import defaultImg from '@/assets/images/default.svg?url';
import type { MessageLikes } from '@/types/Message';

type MessageLikesProps = {
	likes: MessageLikes;
	isItMyMessage: boolean;
};

const MessageLikes = ({ likes, isItMyMessage }: MessageLikesProps) => {
	return (
		<div className={[styles.MessageLikes, isItMyMessage && styles.My].join(' ')}>
			<LikeIcon className={styles.LikeIcon} alt="Like" />
			<div className={styles.Likers}>
				{likes.users.map((liker) => (
					<div className={styles.Liker} key={liker.id}>
						<img src={liker.image || defaultImg} alt="Profile picture" className={styles.LikerImg} />
					</div>
				))}
			</div>
		</div>
	);
};

export default MessageLikes;
