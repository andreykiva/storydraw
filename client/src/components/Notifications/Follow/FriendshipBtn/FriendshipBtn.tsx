import React from 'react';
import styles from './FriendshipBtn.module.css';
import Button from '@/components/ui/buttons/Button/Button';
import swapIcon from '@/assets/icons/notifications/swap.svg';

type FriendshipBtnProps = {
	isFollowingYou: boolean;
	isFollowedByYou: boolean;
};

const FriendshipBtn = ({ isFollowingYou, isFollowedByYou }: FriendshipBtnProps) => {
	if (isFollowingYou && isFollowedByYou) {
		return (
			<Button className={[styles.FriendshipBtn, styles.FriendsBtn].join(' ')}>
				<img src={swapIcon} alt="Friends" className={styles.FriendsIcon} />
				Friends
			</Button>
		);
	} else if (isFollowingYou) {
		return <Button className={[styles.FriendshipBtn, styles.FollowBackBtn].join(' ')}>Follow back</Button>;
	} else if (isFollowedByYou) {
		return <Button className={[styles.FriendshipBtn, styles.FollowingBtn].join(' ')}>Following</Button>;
	} else {
		return <Button className={[styles.FriendshipBtn, styles.FollowBtn].join(' ')}>Follow</Button>;
	}
};
export default FriendshipBtn;
