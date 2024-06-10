import React from 'react';
import cn from 'classnames';
import styles from './FriendshipBtn.module.scss';
import Button from '@/components/ui/buttons/Button/Button';
import swapIcon from '@/assets/icons/notifications/swap.svg?url';

type FriendshipBtnProps = {
	isFollowedByYou: boolean;
	isFollowedYou: boolean;
};

const FriendshipBtn = ({ isFollowedByYou, isFollowedYou }: FriendshipBtnProps) => {
	if (isFollowedByYou && isFollowedYou) {
		return (
			<Button className={cn(styles.FriendshipBtn, styles.FriendsBtn)}>
				<img src={swapIcon} alt="Friends" className={styles.FriendsIcon} />
				Friends
			</Button>
		);
	} else if (isFollowedByYou && !isFollowedYou) {
		return <Button className={cn(styles.FriendshipBtn, styles.FollowingBtn)}>Following</Button>;
	} else if (!isFollowedByYou && isFollowedYou) {
		return <Button className={cn(styles.FriendshipBtn, styles.FollowBackBtn)}>Follow back</Button>;
	}

	return <Button className={cn(styles.FriendshipBtn, styles.FollowBtn)}>Follow</Button>;
};
export default FriendshipBtn;
