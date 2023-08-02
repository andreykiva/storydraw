import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProfileStory.module.css';
import previewImg from '../../../assets/images/preview.jpg';
import viewsImg from '../../../assets/icons/views.svg';

const ProfileStory = (props) => {
	const { story, description, tags, views } = props;

	return (
		<div className={styles.ProfileStory}>
			<div className={styles.ProfileStoryContent}>
				<img src={story || previewImg} alt="Story" className={styles.Story} />
				<div className={styles.ViewsInfo}>
					<img src={viewsImg} alt="Views" className={styles.ViewsIcon} />
					<span className={styles.Views}>{views}</span>
				</div>
			</div>
			<p className={styles.InfoDescr}>
				{description} #{tags.join(' #')}
			</p>
		</div>
	);
};

export default ProfileStory;
