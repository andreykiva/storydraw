import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Follow.module.css';
import type User from '@/types/User';
import defaultImg from '@/assets/icons/default.svg';
import FriendshipBtn from './FriendshipBtn/FriendshipBtn';

type FollowProps = {
	id: string;
	date: string;
	user: Pick<User, 'id' | 'username' | 'title' | 'image'> & {
		isFollowingYou: boolean;
		isFollowedByYou: boolean;
	};
	closeNotifTest: () => void;
};

const Follow = (props: FollowProps) => {
	const navigate = useNavigate();
	const {
		date,
		closeNotifTest,
		user: { username, title, image, isFollowingYou, isFollowedByYou },
	} = props;

	const handleFollowClick = () => {
		closeNotifTest();
		navigate(`/@${username}`);
	};

	return (
		<div className={styles.Follow}>
			<div className={styles.UserLink} onClick={handleFollowClick}>
				<div className={styles.UserImgWr}>
					<img src={image || defaultImg} alt="Profile picture" className={styles.UserImg} />
				</div>
				<div className={styles.UserInfo}>
					<span className={styles.UserTitle}>{title}</span>
					<span className={styles.FollowDate}>
						{isFollowingYou && 'Follows you. '}
						{date}
					</span>
				</div>
			</div>
			<FriendshipBtn isFollowingYou={isFollowingYou} isFollowedByYou={isFollowedByYou} />
		</div>
	);
};

export default Follow;
