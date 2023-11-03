import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SidebarAccount.module.css';
import defaultImg from '@/assets/icons/default.svg';
import type User from '@/types/User';

type SidebarAccountProps = Pick<User, 'username' | 'title' | 'image'>;

const SidebarAccount = ({ username, title, image }: SidebarAccountProps) => {
	return (
		<li className={styles.SidebarAccount}>
			<Link to={`/@${username}`} className={styles.AccountLink}>
				<img src={image || defaultImg} alt="Profile picture" className={styles.AccountImg} />
				<div className={styles.AccountInfo}>
					<span className={styles.AccountUsername}>{username}</span>
					<span className={styles.AccountTitle}>{title}</span>
				</div>
			</Link>
		</li>
	);
};

export default SidebarAccount;
