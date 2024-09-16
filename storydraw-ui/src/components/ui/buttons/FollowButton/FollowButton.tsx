import cn from 'classnames';
import styles from './FollowButton.module.scss';
import Button from '@/components/ui/buttons/Button/Button';
import swapIcon from '@/assets/icons/notifications/swap.svg';

type FollowButtonProps = {
	className?: string;
	isFollowedBy: boolean;
	isFollowing: boolean;
	loading?: boolean;
	onFollow: () => void;
};

const FollowButton = (props: FollowButtonProps) => {
	const { className, isFollowedBy, isFollowing, loading = false, onFollow } = props;

	if (isFollowedBy && isFollowing) {
		return (
			<Button className={cn(styles.FollowButton, styles.FriendsBtn, className)} loading={loading} onClick={onFollow}>
				<img src={swapIcon} alt="Friends" className={styles.FriendsIcon} />
				Friends
			</Button>
		);
	}

	if (isFollowedBy) {
		return (
			<Button className={cn(styles.FollowButton, styles.FollowBackBtn, className)} loading={loading} onClick={onFollow}>
				Follow back
			</Button>
		);
	}

	if (isFollowing) {
		return (
			<Button className={cn(styles.FollowButton, styles.FollowingBtn, className)} loading={loading} onClick={onFollow}>
				Following
			</Button>
		);
	}

	return (
		<Button className={cn(styles.FollowButton, className)} loading={loading} onClick={onFollow}>
			Follow
		</Button>
	);
};

export default FollowButton;
