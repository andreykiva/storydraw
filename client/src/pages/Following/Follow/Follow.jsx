import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Follow.module.css';
import defaultImg from '../../../assets/icons/default.svg';
import previewImg from '../../../assets/images/preview.jpg';
import Button from '../../../UI/Button/Button';

const Follow = ({ username, title, image, preview }) => {
	return (
		<Link to={`/@${username}`} className={styles.Follow}>
			<img src={preview || previewImg} alt="Preview" className={styles.FollowPreview} />
			<div className={styles.FollowContent}>
				<img src={image || defaultImg} alt="Profile picture" className={styles.FollowImg} />
				<div className={styles.FollowTitle}>{title}</div>
				<div className={styles.FollowUsername}>{username}</div>
				<Button className={styles.FollowBtn}>Follow</Button>
			</div>
		</Link>
	);
};

Follow.propTypes = {
	username: PropTypes.string,
	title: PropTypes.string,
	image: PropTypes.string,
	preview: PropTypes.string,
};

export default Follow;
