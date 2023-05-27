import React from 'react';
import PropTypes from 'prop-types';
import styles from './Follow.module.css';
import defaultImg from '../../assets/icons/default.svg';
import previewImg from '../../assets/images/preview.jpg';
import Button from '../../UI/Button/Button';

const Follow = ({ username, description, image, preview }) => {
	return (
		<div className={styles.Follow}>
			<img src={preview || previewImg} alt="Preview" className={styles.FollowPreview} />
			<div className={styles.FollowContent}>
				<img src={image || defaultImg} alt="Profile picture" className={styles.FollowImg} />
				<div className={styles.FollowDescr}>{description}</div>
				<div className={styles.FollowUsername}>{username}</div>
				<Button className={styles.FollowBtn}>Follow</Button>
			</div>
		</div>
	);
};

Follow.propTypes = {
	username: PropTypes.string,
	description: PropTypes.string,
	image: PropTypes.string,
	preview: PropTypes.string,
};

export default Follow;
