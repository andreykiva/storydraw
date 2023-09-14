import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ForYouStory.module.css';
import defaultImg from '@/assets/icons/default.svg';
import previewImg from '@/assets/images/preview.jpg';
import musicImg from '@/assets/icons/music.svg';
import Button from '@/components/ui/buttons/Button/Button';
import LikeIcon from '@/components/ui/icons/LikeIcon';
import CommentIcon from '@/components/ui/icons/CommentIcon';
import FavoriteIcon from '@/components/ui/icons/FavoriteIcon';
import ShareIcon from '@/components/ui/icons/ShareIcon';
import { formatNumber } from '@/utils/numberUtils';
import type Story from '@/types/Story';
import type User from '@/types/User';

type ForYouStoryProps = Omit<Story, 'date' | 'views'> & {
	user: Omit<User, 'description' | 'followers'>;
};

const ForYouStory = (props: ForYouStoryProps) => {
	const { id, user, story, description, musicName, tags, likes, comments, favorites, share } = props; // + musicId

	return (
		<div className={styles.ForYouStory}>
			<div className={styles.StoryHeader}>
				<div className={styles.HeaderImgSection}>
					<Link to={`/@${user.username}`} className={styles.ImgUserLink}>
						<img src={user.image || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
					</Link>
				</div>
				<div className={styles.HeaderInfo}>
					<Link to={`/@${user.username}`} className={styles.HeaderInfoUser}>
						<span className={styles.InfoUsername}>{user.username}</span>
						<span className={styles.InfoTitle}>{user.title}</span>
					</Link>
					<p className={styles.InfoDescr}>
						<span className={styles.DescrText}>{description}</span>
						{tags.map((tag) => (
							<Link to={'/tag/' + tag} key={tag} className={styles.Tag}>
								#{tag}
							</Link>
						))}
					</p>
					<div className={styles.InfoMwdusic}>
						<img src={musicImg} alt="Music" className={styles.MusicIcon} /> {musicName}
					</div>
				</div>
				<Button className={styles.FollowBtn}>Follow</Button>
			</div>
			<div className={styles.StoryWrapper}>
				<Link to={`/@${user.username}/story/${id}`} className={styles.StoryLink}>
					<img src={story || previewImg} alt="Story" className={styles.Story} />
				</Link>
				<div className={styles.StoryInfo}>
					<div className={styles.StoryInfoItem}>
						<LikeIcon className={styles.ItemIcon} />
						<div className={styles.ItemNumber}>{formatNumber(likes)}</div>
					</div>
					<div className={styles.StoryInfoItem}>
						<CommentIcon className={styles.ItemIcon} />
						<div className={styles.ItemNumber}>{formatNumber(comments)}</div>
					</div>
					<div className={styles.StoryInfoItem}>
						<FavoriteIcon className={styles.ItemIcon} />
						<div className={styles.ItemNumber}>{formatNumber(favorites)}</div>
					</div>
					<div className={styles.StoryInfoItem}>
						<ShareIcon className={styles.ItemIcon} />
						<div className={styles.ItemNumber}>{formatNumber(share)}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ForYouStory;
