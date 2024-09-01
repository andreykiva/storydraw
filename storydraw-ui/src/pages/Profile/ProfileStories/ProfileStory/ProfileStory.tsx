import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProfileStory.module.scss';
import previewImg from '@/assets/images/preview.jpg';
import viewsIcon from '@/assets/icons/views.svg?url';
import { formatNumber } from '@/utils/formatUtils';
import type { Story } from '@/types/Story';

type ProfileStoryProps = Pick<Story, 'id' | 'description'>;

const ProfileStory = (props: ProfileStoryProps) => {
	const { id, description } = props;

	return (
		<Link className={styles.ProfileStory} to={`story/${id}`}>
			<div className={styles.ProfileStoryContent}>
				<img src={previewImg} alt="Story" className={styles.Story} />
				<div className={styles.ViewsInfo}>
					<img src={viewsIcon} alt="Views" className={styles.ViewsIcon} />
					<span className={styles.Views}>{formatNumber(0)}</span>
				</div>
			</div>
			<p className={styles.InfoDescr}>
				{description}
				{/* #{tags.join(' #')} */}
			</p>
		</Link>
	);
};

export default ProfileStory;
