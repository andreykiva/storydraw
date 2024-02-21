import React from 'react';
import styles from './FriendshipBtn.module.css';
import Button from '@/components/ui/buttons/Button/Button';
import swapIcon from '@/assets/icons/notifications/swap.svg?url';

type FriendshipBtnProps = {
	isFollowedByYou: boolean;
};

const FriendshipBtn = ({ isFollowedByYou }: FriendshipBtnProps) => {
	if (isFollowedByYou) {
		return (
			<Button className={[styles.FriendshipBtn, styles.FriendsBtn].join(' ')}>
				<img src={swapIcon} alt="Friends" className={styles.FriendsIcon} />
				Friends
			</Button>
		);
	}

	return <Button className={[styles.FriendshipBtn, styles.FollowBackBtn].join(' ')}>Follow back</Button>;
};
export default FriendshipBtn;
