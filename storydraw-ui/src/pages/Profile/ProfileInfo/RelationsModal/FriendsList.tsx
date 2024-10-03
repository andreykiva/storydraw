import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';
import profileSharedStyles from '@/pages/Profile/ProfileSharedStyles.module.scss';
import { ProfileUser, RelationsFollowing } from '@/types/Profile';
import RelationsItem from './RelationsItem/RelationsItem';
import NoRelations from './NoRelations/NoRelations';
import personIcon from '@/assets/icons/profile/person.svg';
import { selectUser } from '@/features/user/userSlice';
import RelationsListPlaceholder from './RelationsListPlaceholder/RelationsListPlaceholder';
import { GET_FRIENDS } from '@/graphql/users/queries';
import { FRIENDS_LIMIT } from '@/constants/pagination';
import Loader from '@/components/ui/Loader/Loader';

type FriendsListProps = {
	user: ProfileUser;
	isAuth: boolean;
	active: boolean;
};

const FriendsList = ({ user, isAuth, active }: FriendsListProps) => {
	const currentUser = useSelector(selectUser);
	const [friends, setFriends] = useState<RelationsFollowing[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [cursor, setCursor] = useState(null);
	const [skip, setSkip] = useState(false);

	const { error } = useQuery(GET_FRIENDS, {
		variables: {
			paginationInput: {
				limit: FRIENDS_LIMIT,
				cursor,
			},
		},
		onCompleted(data) {
			const newFriends = data.friends || [];

			setFriends((prevFriends) => [...prevFriends, ...newFriends]);
			setIsLoaded(true);
			setSkip(true);

			if (newFriends.length < FRIENDS_LIMIT) {
				setHasMore(false);
			}
		},
		onError() {
			setIsLoaded(true);
		},
		skip: !active || skip,
		notifyOnNetworkStatusChange: true,
		fetchPolicy: 'no-cache',
	});

	const handleChangeCursor = () => {
		const lastFriend = friends[friends.length - 1];
		setCursor(lastFriend.createdAt);
		setSkip(false);
	};

	if (!active) return null;

	const placeholderLength = user.friendsCount === 0 ? FRIENDS_LIMIT : Math.min(user.friendsCount, FRIENDS_LIMIT);

	if (!isLoaded) {
		return <RelationsListPlaceholder length={placeholderLength} />;
	}

	if (error) {
		return <div>Error...</div>;
	}

	if (friends.length > 0) {
		return (
			<ul className={profileSharedStyles.RelationsList} id="relationsContainer">
				<InfiniteScroll
					dataLength={friends.length}
					next={handleChangeCursor}
					hasMore={hasMore}
					loader={<Loader className={profileSharedStyles.RelationsLoader} />}
					scrollableTarget="relationsContainer"
					style={{ overflow: 'hidden' }}
				>
					{friends.map((follow) => (
						<RelationsItem
							key={follow.following.id}
							user={follow.following}
							isAuth={isAuth}
							isFollowedBy={true}
							isFollowing={true}
							isCurrentUser={currentUser.id === follow.following.id}
						/>
					))}
				</InfiniteScroll>
			</ul>
		);
	}

	return <NoRelations icon={personIcon} title="Friends" text="When you have followers that you follow back, you'll see them here" />;
};

export default FriendsList;
