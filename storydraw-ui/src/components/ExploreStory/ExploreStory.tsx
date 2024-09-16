import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './ExploreStory.module.scss';
import defaultImg from '@/assets/images/default.svg';
import previewImg from '@/assets/images/preview.jpg';
import { ReactComponent as LikeIcon } from '@/assets/icons/like.svg';
import viewsIcon from '@/assets/icons/views.svg';
import { formatNumber } from '@/utils/formatUtils';
import type { Story } from '@/types/Story';
import type User from '@/types/User';
import { wrapMentions } from '@/utils/textUtils';

type ExploreStoryProps = Pick<Story, 'id' | 'description' | 'likesCount' | 'viewsCount'> & {
	user: Pick<User, 'id' | 'username' | 'imageUrl'>;
	className?: string;
};

const ExploreStory = (props: ExploreStoryProps) => {
	const { id, user, description, likesCount, viewsCount, className } = props;

	return (
		<div className={cn(styles.ExploreStory, className)}>
			<Link className={styles.ExploreStoryContent} to={`/@${user.username}/story/${id}`}>
				<img src={previewImg} alt="Story" className={styles.Story} />
				<div className={styles.ViewsInfo}>
					<img src={viewsIcon} alt="Views" className={styles.ViewsIcon} />
					<span className={styles.Views}>{formatNumber(viewsCount)}</span>
				</div>
			</Link>
			<p className={styles.StoryDescr}>
				<span className={styles.DescrText}>{wrapMentions(description, styles.Mention)}</span>
				{/* {tags.map((tag) => (
					<Link to={'/tag/' + tag} key={tag} className={styles.Tag}>
						#{tag}
					</Link>
				))} */}
			</p>
			<div className={styles.BottomInfo}>
				<Link to={`/@${user.username}`} className={styles.UserLink}>
					<img src={user.imageUrl || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
					<span className={styles.Username}>{user.username}</span>
				</Link>
				<Link to={`/@${user.username}/story/${id}`} className={styles.LikesInfo}>
					<LikeIcon className={styles.LikeIcon} />
					<span className={styles.Likes}>{formatNumber(likesCount)}</span>
				</Link>
			</div>
		</div>
	);
};

export default ExploreStory;
