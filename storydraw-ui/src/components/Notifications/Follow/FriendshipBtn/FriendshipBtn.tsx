import React from 'react';
import cn from 'classnames';
import styles from './FriendshipBtn.module.scss';
import Button from '@/components/ui/buttons/Button/Button';
import swapIcon from '@/assets/icons/notifications/swap.svg?url';

type FriendshipBtnProps = {
	isFollowedByYou: boolean;
};

const FriendshipBtn = ({ isFollowedByYou }: FriendshipBtnProps) => {
	if (isFollowedByYou) {
		return (
			<Button className={cn(styles.FriendshipBtn, styles.FriendsBtn)}>
				<img src={swapIcon} alt="Friends" className={styles.FriendsIcon} />
				Friends
			</Button>
		);
	}

	return <Button className={cn(styles.FriendshipBtn, styles.FollowBackBtn)}>Follow back</Button>;
};
export default FriendshipBtn;
