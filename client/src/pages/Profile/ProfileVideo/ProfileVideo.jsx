import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProfileVideo.module.css';
import previewImg from '../../../assets/images/preview.jpg';
import viewsImg from '../../../assets/icons/views.svg';

const ProfileVideo = (props) => {
	const { video, description, tags, views } = props;

	return (
		<div className={styles.ProfileVideo}>
			<div className={styles.ProfileVideoContent}>
				<img src={video || previewImg} alt="Video" className={styles.Video} />
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

export default ProfileVideo;
