import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ExploreStory.module.css';
import defaultImg from '@/assets/images/default.svg';
import previewImg from '@/assets/images/preview.jpg';
import LikeIcon from '@/components/ui/icons/LikeIcon';
import viewsIcon from '@/assets/icons/views.svg';
import { formatNumber } from '@/utils/numberUtils';
import type Story from '@/types/Story';
import type User from '@/types/User';

type ExploreStoryProps = Pick<Story, 'id' | 'story' | 'description' | 'tags' | 'likes' | 'views'> & {
	user: Pick<User, 'id' | 'username' | 'image'>;
	className?: string;
};

const ExploreStory = (props: ExploreStoryProps) => {
	const { id, user, story, description, tags, likes, views, className } = props;

	return (
		<div className={[styles.ExploreStory, className].join(' ')}>
			<Link className={styles.ExploreStoryContent} to={`/@${user.username}/story/${id}`}>
				<img src={story || previewImg} alt="Story" className={styles.Story} />
				<div className={styles.ViewsInfo}>
					<img src={viewsIcon} alt="Views" className={styles.ViewsIcon} />
					<span className={styles.Views}>{formatNumber(views)}</span>
				</div>
			</Link>
			<p className={styles.InfoDescr}>
				<span className={styles.DescrText}>{description}</span>
				{tags.map((tag) => (
					<Link to={'/tag/' + tag} key={tag} className={styles.Tag}>
						#{tag}
					</Link>
				))}
			</p>
			<div className={styles.UserInfo}>
				<Link to={`/@${user.username}`} className={styles.UserLink}>
					<img src={user.image || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
					<span className={styles.Username}>{user.username}</span>
				</Link>
				<Link to={`/@${user.username}/story/${id}`} className={styles.LikesInfo}>
					<LikeIcon className={styles.LikeIcon} />
					<span className={styles.Likes}>{formatNumber(likes)}</span>
				</Link>
			</div>
		</div>
	);
};

export default ExploreStory;
