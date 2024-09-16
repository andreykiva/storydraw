import { useNavigate } from 'react-router-dom';
import styles from './RelationsItem.module.scss';
import defaultImg from '@/assets/images/default.svg';
import { RelationsUser } from '@/types/Profile';
import FollowButton from '@/components/ui/buttons/FollowButton/FollowButton';
import useFollow from '@/hooks/interaction/useFollow';

type RelationsItemProps = {
	user: RelationsUser;
	isCurrentUser: boolean;
	isAuth: boolean;
	isFollowedBy: boolean;
	isFollowing: boolean;
};

const RelationsItem = (props: RelationsItemProps) => {
	const navigate = useNavigate();
	const { user, isCurrentUser, isAuth } = props;

	const { handleFollow, loading, isFollowing } = useFollow({
		isAuth,
		userId: user.id,
		initIsFollowing: props.isFollowing,
	});

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
			{!isCurrentUser && (
				<FollowButton
					className={styles.FollowButton}
					isFollowedBy={props.isFollowedBy}
					isFollowing={isFollowing}
					onFollow={handleFollow}
					loading={loading}
				/>
			)}
		</li>
	);
};

export default RelationsItem;
