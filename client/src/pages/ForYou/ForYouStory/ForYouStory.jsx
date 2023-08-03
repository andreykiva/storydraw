import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ForYouStory.module.css';
import defaultImg from '../../../assets/icons/default.svg';
import previewImg from '../../../assets/images/preview.jpg';
import musicImg from '../../../assets/icons/music.svg';
import Button from '../../../UI/Button/Button';
import LikeIcon from '../../../UI/icons/LikeIcon';
import CommentIcon from '../../../UI/icons/CommentIcon';
import FavoriteIcon from '../../../UI/icons/FavoriteIcon';
import ShareIcon from '../../../UI/icons/ShareIcon';
import { formatNumber } from '../../../utils/numberUtils';

const ForYouStory = (props) => {
	const {
		id,
		userId,
		username,
		userTitle,
		userImage,
		story,
		description,
		musicName,
		musicId,
		tags,
		likes,
		comments,
		favorites,
		share,
	} = props;

	return (
		<div className={styles.ForYouStory}>
			<div className={styles.StoryHeader}>
				<div className={styles.HeaderImg}>
					<Link to={`/@${username}`}>
						<img src={userImage || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
					</Link>
				</div>
				<div className={styles.HeaderInfo}>
					<Link to={`/@${username}`} className={styles.HeaderInfoTop}>
						<div className={styles.InfoUsername}>{username}</div>
						<div className={styles.InfoTitle}>{userTitle}</div>
					</Link>
					<p className={styles.InfoDescr}>
						<span className={styles.DescrText}>{description}</span>
						{tags.map((tag) => (
							<Link to={'/tag/' + tag} key={tag} className={styles.Tag}>
								#{tag}
							</Link>
						))}
					</p>
					<div className={styles.InfoMusic}>
						<img src={musicImg} alt="Music" className={styles.MusicIcon} /> {musicName}
					</div>
				</div>
				<Button className={styles.FollowBtn}>Follow</Button>
			</div>
			<div className={styles.StoryWrapper}>
				<Link to={`/@${username}/story/${id}`}>
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
