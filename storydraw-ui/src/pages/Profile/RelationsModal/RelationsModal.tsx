import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
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
import { GET_FOLLOWERS, GET_FOLLOWING, GET_FRIENDS } from '@/graphql/users/queries';

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
	const [isFollowingPrivate, setIsFollowingPrivate] = useState(false);

	const { data: following, loading: followingLoading } = useQuery(GET_FOLLOWING, {
		variables: { followingInput: { userId: user.id }, isAuth },
		skip: view !== RELATIONS_TYPE.FOLLOWING,
		onError(error) {
			console.log(error);
		},
	});

	const { data: followers, loading: followersLoading } = useQuery(GET_FOLLOWERS, {
		variables: { followersInput: { userId: user.id }, isAuth },
		skip: view !== RELATIONS_TYPE.FOLLOWERS,
		onError(error) {
			console.log(error);
		},
	});

	const { data: friends, loading: friendsLoading } = useQuery(GET_FRIENDS, {
		skip: view !== RELATIONS_TYPE.FRIENDS,
		onError(error) {
			console.log(error);
		},
	});

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
				<ul className={styles.RelationsList}>
					{view === RELATIONS_TYPE.FOLLOWING && (
						<FollowingList
							following={following?.following}
							loading={followingLoading}
							isAuth={isAuth}
							username={user.username}
							isFollowingPrivate={isFollowingPrivate}
						/>
					)}
					{view === RELATIONS_TYPE.FOLLOWERS && (
						<FollowersList
							followers={followers?.followers}
							loading={followersLoading}
							isAuth={isAuth}
						/>
					)}
					{view === RELATIONS_TYPE.FRIENDS && (
						<FriendsList friends={friends?.friends} loading={friendsLoading} isAuth={isAuth} />
					)}
				</ul>
			</div>
		</ModalOverlay>
	);
};

export default RelationsModal;
