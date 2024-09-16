import cn from 'classnames';
import styles from './MessageLikes.module.scss';
import { ReactComponent as LikeIcon } from '@/assets/icons/like.svg';
import defaultImg from '@/assets/images/default.svg';
import type { MessageLikes } from '@/types/Message';

type MessageLikesProps = {
	likes: MessageLikes;
	isItMyMessage: boolean;
};

const MessageLikes = ({ likes, isItMyMessage }: MessageLikesProps) => {
	return (
		<div className={cn(styles.MessageLikes, isItMyMessage && styles.My)}>
			<LikeIcon className={styles.LikeIcon} alt="Like" />
			<div className={styles.Likers}>
				{likes.users.map((liker) => (
					<div className={styles.Liker} key={liker.id}>
						<img src={liker.imageUrl || defaultImg} alt="Profile picture" className={styles.LikerImg} />
					</div>
				))}
			</div>
		</div>
	);
};

export default MessageLikes;
