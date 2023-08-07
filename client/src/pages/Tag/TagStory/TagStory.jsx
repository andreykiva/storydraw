import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TagStory.module.css';
import defaultImg from '../../../assets/icons/default.svg';
import previewImg from '../../../assets/images/preview.jpg';

const TagStory = (props) => {
	const { id, userId, username, userImage, story, description, tags } = props;

	return (
		<div className={styles.TagStory}>
			<Link to={`/@${username}`} className={styles.UserInfoLink}>
				<img src={userImage || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
				<span className={styles.Username}>{username}</span>
			</Link>
			<Link to={`/@${username}/story/${id}`} className={styles.TagStoryContent}>
				<img src={story || previewImg} alt="Story" className={styles.Story} />
				<p className={styles.TagStoryDescr}>
					{description} #{tags.join(' #')}
				</p>
			</Link>
		</div>
	);
};

export default TagStory;
