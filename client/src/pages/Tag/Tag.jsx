import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Tag.module.css';

const testTagInfo = {
	views: '123k',
	videos: []
}

const Tag = () => {
	let { tag } = useParams();

	return (
		<div className={styles.Tag}>
			<div className={styles.TagHeader}>
				<div className={styles.TagIcon}>#</div>
				<div className={styles.TagInfo}>
					<h3 className={styles.TagTitle}>#{tag}</h3>
					<p className={styles.TagViews}>{testTagInfo.views} views</p>
				</div>
			</div>
			<div className={styles.TagVideos}>
				videos
			</div>
		</div>
	);
};

export default Tag;
