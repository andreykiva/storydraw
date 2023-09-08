import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SuggestedItem.module.css';
import defaultImg from '@/assets/icons/default.svg';

const SuggestedItem = ({ username, title, image }) => {
	return (
		<li className={styles.SuggestedItem}>
			<Link to={`/@${username}`} className={styles.SuggestedLink}>
				<img src={image || defaultImg} alt="Profile picture" className={styles.ItemImg} />
				<div className={styles.ItemInfo}>
					<span className={styles.ItemUsername}>{username}</span>
					<span className={styles.ItemTitle}>{title}</span>
				</div>
			</Link>
		</li>
	);
};

export default SuggestedItem;
