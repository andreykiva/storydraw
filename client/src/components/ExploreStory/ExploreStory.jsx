import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ExploreStory.module.css';
import defaultImg from '../../assets/icons/default.svg';
import previewImg from '../../assets/images/preview.jpg';
import LikeIcon from '../../UI/icons/LikeIcon';
import viewsImg from '../../assets/icons/views.svg';
import { formatNumber } from '../../utils/numberUtils';

const ExploreStory = (props) => {
	const { id, userId, username, userImage, story, description, tags, likes, views, className } = props;

	return (
		<Link className={[styles.ExploreStory, className].join(' ')} to={`/@${username}/story/${id}`}>
			<div className={styles.ExploreStoryContent}>
				<img src={story || previewImg} alt="Story" className={styles.Story} />
				<div className={styles.ViewsInfo}>
					<img src={viewsImg} alt="Views" className={styles.ViewsIcon} />
					<span className={styles.Views}>{formatNumber(views)}</span>
				</div>
			</div>
			<p className={styles.InfoDescr}>
				<span className={styles.DescrText}>{description}</span>
				{tags.map((tag) => (
					<Link to={'/tag/' + tag} key={tag} className={styles.Tag}>
						#{tag}
					</Link>
				))}
			</p>
			<div className={styles.UserInfo}>
				<Link to={`/@${username}`} className={styles.UserLink}>
					<img src={userImage || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
					<span className={styles.Username}>{username}</span>
				</Link>
				<div className={styles.LikesInfo}>
					<LikeIcon className={styles.LikeIcon} />
					<span className={styles.Likes}>{formatNumber(likes)}</span>
				</div>
			</div>
		</Link>
	);
};

export default ExploreStory;
