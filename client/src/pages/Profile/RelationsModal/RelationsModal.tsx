import React, { useEffect, useState } from 'react';
import styles from './RelationsModal.module.scss';
import ModalOverlay from '@/components/ui/ModalOverlay/ModalOverlay';
import { RELATIONS_TYPE } from '@/constants/profile';
import User from '@/types/User';
import type { RelationsUser } from '@/types/Profile';
import HTag from '@/components/ui/HTag/HTag';
import CloseButton from '@/components/ui/buttons/CloseButton/CloseButton';
import ViewsMenuItem from './ViewsMenuItem/ViewsMenuItem';
import { formatNumber } from '@/utils/formatUtils';
import FollowingList from './FollowingList';
import FollowersList from './FollowersList';
import FriendsList from './FriendsList';

type RelationsModalProps = {
	user: User;
	view: RELATIONS_TYPE;
	isCurrentUser: boolean;
	onClose: () => void;
	onChangeView: (view: RELATIONS_TYPE) => void;
};

const testFollowing: RelationsUser[] = [
	{
		id: '123',
		username: 'andriydd21123',
		name: 'андрій',
		image: '',
		isFollowedByYou: true,
		isFollowedYou: false,
	},
	{
		id: '1qd3',
		username: 'viktodwd12d',
		name: 'віктор',
		image: '',
		isFollowedByYou: true,
		isFollowedYou: true,
	},
];
const testFollowers: RelationsUser[] = [
	{
		id: '12124214',
		username: 'dimaasdasd',
		name: 'діма',
		image: '',
		isFollowedByYou: false,
		isFollowedYou: true,
	},
	{
		id: 'kfk2',
		username: 'pavlowdqwd',
		name: 'павло',
		image: '',
		isFollowedByYou: true,
		isFollowedYou: true,
	},
];
const testFriends: RelationsUser[] = [
	{
		id: '12124214',
		username: 'dimaqwdqd',
		name: 'діма',
		image: '',
		isFollowedByYou: true,
		isFollowedYou: true,
	},
];

type LoadedData = Record<RELATIONS_TYPE, boolean>;

const RelationsModal = (props: RelationsModalProps) => {
	const { user, view, isCurrentUser, onClose, onChangeView } = props;

	const [following, setFollowing] = useState<RelationsUser[]>([]);
	const [followers, setFollowers] = useState<RelationsUser[]>([]);
	const [friends, setFriends] = useState<RelationsUser[]>([]);
	const [isFollowingPrivate, setIsFollowingPrivate] = useState(false);

	const [loadedData, setLoadedData] = useState<LoadedData>({
		[RELATIONS_TYPE.FOLLOWING]: false,
		[RELATIONS_TYPE.FOLLOWERS]: false,
		[RELATIONS_TYPE.FRIENDS]: false,
	});

	useEffect(() => {
		if (loadedData[view]) {
			return;
		}

		const timeoutId = setTimeout(() => {
			if (view === RELATIONS_TYPE.FOLLOWING) {
				setFollowing(testFollowing);
				if (testFollowing.length === 0 && user.following > 0) {
					setIsFollowingPrivate(true);
				}
				setLoadedData({ ...loadedData, [RELATIONS_TYPE.FOLLOWING]: true });
			} else if (view === RELATIONS_TYPE.FOLLOWERS) {
				setFollowers(testFollowers);
				setLoadedData({ ...loadedData, [RELATIONS_TYPE.FOLLOWERS]: true });
			} else if (view === RELATIONS_TYPE.FRIENDS) {
				setFriends(testFriends);
				setLoadedData({ ...loadedData, [RELATIONS_TYPE.FRIENDS]: true });
			}
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [view, user, loadedData]);

	if (!user || !Object.keys(user).length) return null;

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
					<ViewsMenuItem
						active={view === RELATIONS_TYPE.FOLLOWING}
						onClick={() => onChangeView(RELATIONS_TYPE.FOLLOWING)}
					>
						Following {formatNumber(user.following)}
					</ViewsMenuItem>
					<ViewsMenuItem
						active={view === RELATIONS_TYPE.FOLLOWERS}
						onClick={() => onChangeView(RELATIONS_TYPE.FOLLOWERS)}
					>
						Followers {formatNumber(user.followers)}
					</ViewsMenuItem>
					{isCurrentUser && (
						<ViewsMenuItem
							active={view === RELATIONS_TYPE.FRIENDS}
							onClick={() => onChangeView(RELATIONS_TYPE.FRIENDS)}
						>
							Friends {formatNumber(user.followers)}
						</ViewsMenuItem>
					)}
				</div>
				<ul className={styles.RelationsList}>
					{view === RELATIONS_TYPE.FOLLOWING && (
						<FollowingList
							following={following}
							isFollowingLoaded={loadedData[RELATIONS_TYPE.FOLLOWING]}
							isFollowingPrivate={isFollowingPrivate}
							username={user.username}
						/>
					)}
					{view === RELATIONS_TYPE.FOLLOWERS && (
						<FollowersList followers={followers} isFollowersLoaded={loadedData[RELATIONS_TYPE.FOLLOWERS]} />
					)}
					{view === RELATIONS_TYPE.FRIENDS && (
						<FriendsList friends={friends} isFriendsLoaded={loadedData[RELATIONS_TYPE.FRIENDS]} />
					)}
				</ul>
			</div>
		</ModalOverlay>
	);
};

export default RelationsModal;
