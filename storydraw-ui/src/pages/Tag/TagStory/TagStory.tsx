import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TagStory.module.scss';
import defaultImg from '@/assets/images/default.svg';
import previewImg from '@/assets/images/preview.jpg';
import type { Story } from '@/types/Story';
import type User from '@/types/User';

type TagStoryProps = Pick<Story, 'id' | 'description'> & {
	user: Pick<User, 'id' | 'username' | 'imageUrl'>;
};

const TagStory = (props: TagStoryProps) => {
	const { id, user, description } = props;

	return (
		<div className={styles.TagStory}>
			<Link to={`/@${user.username}`} className={styles.UserInfoLink}>
				<img src={user.imageUrl || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
				<span className={styles.Username}>{user.username}</span>
			</Link>
			<Link to={`/@${user.username}/story/${id}`} className={styles.TagStoryContent}>
				<img src={previewImg} alt="Story" className={styles.Story} />
				<p className={styles.TagStoryDescr}>
					{description}
					{/* #{tags.join(' #')} */}
				</p>
			</Link>
		</div>
	);
};

export default TagStory;
