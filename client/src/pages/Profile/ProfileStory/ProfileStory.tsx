import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProfileStory.module.css';
import previewImg from '@/assets/images/preview.jpg';
import viewsImg from '@/assets/icons/views.svg';
import { formatNumber } from '@/utils/numberUtils';

type ProfileStoryProps = {
	id: string;
	story: string;
	description: string;
	tags: string[];
	views: number;
};

const ProfileStory = (props: ProfileStoryProps) => {
	const { id, story, description, tags, views } = props;

	return (
		<Link className={styles.ProfileStory} to={`story/${id}`}>
			<div className={styles.ProfileStoryContent}>
				<img src={story || previewImg} alt="Story" className={styles.Story} />
				<div className={styles.ViewsInfo}>
					<img src={viewsImg} alt="Views" className={styles.ViewsIcon} />
					<span className={styles.Views}>{formatNumber(views)}</span>
				</div>
			</div>
			<p className={styles.InfoDescr}>
				{description} #{tags.join(' #')}
			</p>
		</Link>
	);
};

export default ProfileStory;
