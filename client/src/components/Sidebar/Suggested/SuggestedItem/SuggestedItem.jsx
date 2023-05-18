import React from 'react';
import PropTypes from 'prop-types';
import styles from './SuggestedItem.module.css';
import defaultImg from '../../../../assets/icons/default.svg';

const SuggestedItem = ({ username, title, image }) => {
	return (
		<li className={styles.SuggestedItem}>
			<img src={image || defaultImg} alt="Profile picture" className={styles.ItemImg} />
			<div className={styles.ItemInfo}>
				<div className={styles.ItemUsername}>{username}</div>
				<div className={styles.ItemTitle}>{title}</div>
			</div>
		</li>
	);
};

SuggestedItem.propTypes = {
	username: PropTypes.string,
	title: PropTypes.string,
	image: PropTypes.string,
};

export default SuggestedItem;
