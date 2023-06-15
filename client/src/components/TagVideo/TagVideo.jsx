import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TagVideo.module.css';
import defaultImg from '../../assets/icons/default.svg';
import previewImg from '../../assets/images/preview.jpg';

const TagVideo = (props) => {
	const { userId, username, userImage, video, description, tags } = props;

	return (
		<div className={styles.TagVideo}>
			<div className={styles.TagVideoContent}>
				<img src={video || previewImg} alt="Video" className={styles.Video} />
				<Link to={`/@${username}`} className={styles.UserInfo}>
					<img src={userImage || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
					<span className={styles.Username}>{username}</span>
				</Link>
			</div>
			<p className={styles.TagVideoDescr}>
				{description} #{tags.join(' #')}
			</p>
		</div>
	);
};

export default TagVideo;
