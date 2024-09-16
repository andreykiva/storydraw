import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Follow.module.scss';
import defaultImg from '@/assets/images/default.svg';
import previewImg from '@/assets/images/preview.jpg';
import Button from '@/components/ui/buttons/Button/Button';
import type User from '@/types/User';

type FollowProps = Pick<User, 'username' | 'displayName' | 'imageUrl'> & {
	preview: string;
};

const Follow = ({ username, displayName, imageUrl, preview }: FollowProps) => {
	return (
		<Link to={`/@${username}`} className={styles.Follow}>
			<img src={preview || previewImg} alt="Preview" className={styles.FollowPreview} />
			<div className={styles.FollowContent}>
				<img src={imageUrl || defaultImg} alt="Profile picture" className={styles.FollowImg} />
				<div className={styles.FollowDisplayName}>{displayName}</div>
				<div className={styles.FollowUsername}>{username}</div>
				<Button className={styles.FollowBtn}>Follow</Button>
			</div>
		</Link>
	);
};

export default Follow;
