import React from 'react';
import PropTypes from 'prop-types';
import styles from './Follow.module.css';
import defaultImg from '../../assets/icons/default.svg';
import previewImg from '../../assets/images/preview.jpg';

const Follow = ({ username, title, image, preview }) => {
	return (
		<div className={styles.Follow}>
			<img src={preview || previewImg} alt="Preview" className={styles.FollowPreview} />
			<div className={styles.FollowContent}>
				<img src={image || defaultImg} alt="Profile picture" className={styles.FollowImg} />
				<div className={styles.FollowTitle}>{title}</div>
				<div className={styles.FollowUsername}>{username}</div>
				<button className={styles.FollowBtn}>Follow</button>
			</div>
		</div>
	);
};

Follow.propTypes = {
	username: PropTypes.string,
	title: PropTypes.string,
	image: PropTypes.string,
	preview: PropTypes.string,
};

export default Follow;
