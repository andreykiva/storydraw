import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TagStory.module.css';
import defaultImg from '@/assets/icons/default.svg';
import previewImg from '@/assets/images/preview.jpg';

interface TagStoryProps {
	id: string;
	story: string;
	description: string;
	tags: string[];
	user: {
		id: string;
		username: string;
		image: string;
	};
}

const TagStory = (props: TagStoryProps) => {
	const { id, user, story, description, tags } = props;

	return (
		<div className={styles.TagStory}>
			<Link to={`/@${user.username}`} className={styles.UserInfoLink}>
				<img src={user.image || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
				<span className={styles.Username}>{user.username}</span>
			</Link>
			<Link to={`/@${user.username}/story/${id}`} className={styles.TagStoryContent}>
				<img src={story || previewImg} alt="Story" className={styles.Story} />
				<p className={styles.TagStoryDescr}>
					{description} #{tags.join(' #')}
				</p>
			</Link>
		</div>
	);
};

export default TagStory;
