import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ExploreVideo.module.css';
import defaultImg from '../../assets/icons/default.svg';
import previewImg from '../../assets/images/preview.jpg';
import LikeIcon from '../../UI/icons/LikeIcon';
import viewsImg from '../../assets/icons/views.svg';

const ExploreVideo = (props) => {
	const { userId, username, userImage, video, description, tags, likes, views, className } = props;

	return (
		<div className={[styles.ExploreVideo, className].join(' ')}>
			<div className={styles.ExploreVideoContent}>
				<img src={video || previewImg} alt="Video" className={styles.Video} />
				<div className={styles.ViewsInfo}>
					<img src={viewsImg} alt="Views" className={styles.ViewsIcon} />
					<span className={styles.Views}>{views}</span>
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
				<img src={userImage || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
				<span className={styles.Username}>{username}</span>
				<div className={styles.LikesInfo}>
					<LikeIcon className={styles.LikeIcon} />
					<span className={styles.Likes}>{likes}</span>
				</div>
			</div>
		</div>
	);
};

export default ExploreVideo;
