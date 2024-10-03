import styles from './RelationsModal.module.scss';
import ModalOverlay from '@/components/ui/ModalOverlay/ModalOverlay';
import { RELATIONS_TYPE } from '@/constants/profile';
import type { ProfileUser } from '@/types/Profile';
import HTag from '@/components/ui/HTag/HTag';
import CloseButton from '@/components/ui/buttons/CloseButton/CloseButton';
import ViewsMenuItem from './ViewsMenuItem/ViewsMenuItem';
import { formatNumber } from '@/utils/formatUtils';
import FollowingList from './FollowingList';
import FollowersList from './FollowersList';
import FriendsList from './FriendsList';

type RelationsModalProps = {
	isAuth: boolean;
	user: ProfileUser;
	view: RELATIONS_TYPE;
	isCurrentUser: boolean;
	onClose: () => void;
	onChangeView: (view: RELATIONS_TYPE) => void;
};

const RelationsModal = (props: RelationsModalProps) => {
	const { isAuth, user, view, isCurrentUser, onClose, onChangeView } = props;
	//temp
	const isFollowingPrivate = false;

	return (
		<ModalOverlay>
			<div className={styles.RelationsModal}>
				<div className={styles.ModalHeader}>
					<HTag tag="h3" className={styles.ModalTitle}>
						{user?.username}
					</HTag>
					<CloseButton className={styles.CloseBtn} onClick={onClose} />
				</div>
				<div className={styles.ModalViewsMenu}>
					<ViewsMenuItem active={view === RELATIONS_TYPE.FOLLOWING} onClick={() => onChangeView(RELATIONS_TYPE.FOLLOWING)}>
						Following {formatNumber(user.followingCount)}
					</ViewsMenuItem>
					<ViewsMenuItem active={view === RELATIONS_TYPE.FOLLOWERS} onClick={() => onChangeView(RELATIONS_TYPE.FOLLOWERS)}>
						Followers {formatNumber(user.followersCount)}
					</ViewsMenuItem>
					{isCurrentUser && (
						<ViewsMenuItem active={view === RELATIONS_TYPE.FRIENDS} onClick={() => onChangeView(RELATIONS_TYPE.FRIENDS)}>
							Friends {formatNumber(user.friendsCount)}
						</ViewsMenuItem>
					)}
				</div>
				<div className={styles.RelationsListWrapper}>
					<FollowingList
						isAuth={isAuth}
						user={user}
						isFollowingPrivate={isFollowingPrivate}
						active={view === RELATIONS_TYPE.FOLLOWING}
					/>
					<FollowersList isAuth={isAuth} user={user} active={view === RELATIONS_TYPE.FOLLOWERS} />
					<FriendsList isAuth={isAuth} user={user} active={view === RELATIONS_TYPE.FRIENDS} />
				</div>
			</div>
		</ModalOverlay>
	);
};

export default RelationsModal;
