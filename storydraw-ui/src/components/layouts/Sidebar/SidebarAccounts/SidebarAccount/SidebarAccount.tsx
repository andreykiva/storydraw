import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SidebarAccount.module.scss';
import defaultImg from '@/assets/images/default.svg?url';
import type User from '@/types/User';

type SidebarAccountProps = Pick<User, 'username' | 'name' | 'image'>;

const SidebarAccount = ({ username, name, image }: SidebarAccountProps) => {
	return (
		<li className={styles.SidebarAccount}>
			<Link to={`/@${username}`} className={styles.AccountLink}>
				<div className={styles.AccountImgWr}>
					<img src={image || defaultImg} alt="Profile picture" className={styles.AccountImg} />
				</div>
				<div className={styles.AccountInfo}>
					<span className={styles.AccountUsername}>{username}</span>
					<span className={styles.AccountName}>{name}</span>
				</div>
			</Link>
		</li>
	);
};

export default SidebarAccount;
