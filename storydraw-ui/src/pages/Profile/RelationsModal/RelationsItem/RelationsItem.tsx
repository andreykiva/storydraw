import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RelationsItem.module.scss';
import User from '@/types/User';
import defaultImg from '@/assets/images/default.svg?url';
import FriendshipBtn from './FriendshipBtn/FriendshipBtn';

type RelationsItemProps = {
	user: Pick<User, 'id' | 'username' | 'displayName' | 'imageUrl'> & {
		isFollowedByYou: boolean;
		isFollowedYou: boolean;
	};
};

const RelationsItem = ({ user }: RelationsItemProps) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/@${user.username}`);
	};

	return (
		<li className={styles.RelationsItem}>
			<div className={styles.UserLink} onClick={handleClick}>
				<div className={styles.UserImgWr}>
					<img src={user.imageUrl || defaultImg} alt="Profile picture" className={styles.UserImg} />
				</div>
				<div className={styles.UserInfo}>
					<span className={styles.DisplayName}>{user.displayName}</span>
					<span className={styles.Username}>{user.username}</span>
				</div>
			</div>
			<FriendshipBtn isFollowedByYou={user.isFollowedByYou} isFollowedYou={user.isFollowedYou} />
		</li>
	);
};

export default RelationsItem;
