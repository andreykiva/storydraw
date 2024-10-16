import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';
import profileSharedStyles from '@/pages/Profile/ProfileSharedStyles.module.scss';
import { ProfileUser, RelationsFollowing } from '@/types/Profile';
import RelationsItem from './RelationsItem/RelationsItem';
import NoRelations from './NoRelations/NoRelations';
import personIcon from '@/assets/icons/profile/person.svg';
import lockIcon from '@/assets/icons/profile/lock.svg';
import { selectUser } from '@/features/user/userSlice';
import RelationsListPlaceholder from './RelationsListPlaceholder/RelationsListPlaceholder';
import { GET_FOLLOWING } from '@/graphql/users/queries';
import { FOLLOWING_LIMIT } from '@/constants/pagination';
import Loader from '@/components/ui/Loader/Loader';

type FollowingListProps = {
	user: ProfileUser;
	isFollowingPrivate: boolean;
	isAuth: boolean;
	active: boolean;
};

const FollowingList = ({ user, isFollowingPrivate, isAuth, active }: FollowingListProps) => {
	const currentUser = useSelector(selectUser);
	const [following, setFollowing] = useState<RelationsFollowing[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [cursor, setCursor] = useState(null);
	const [skip, setSkip] = useState(false);

	const { error } = useQuery(GET_FOLLOWING, {
		variables: {
			getFollowingInput: { userId: user.id },
			paginationInput: {
				limit: FOLLOWING_LIMIT,
				cursor,
			},
			isAuth,
		},
		onCompleted(data) {
			const newFollowing = data.getFollowing || [];

			setFollowing((prevFollowing) => [...prevFollowing, ...newFollowing]);
			setIsLoaded(true);
			setSkip(true);

			if (newFollowing.length < FOLLOWING_LIMIT) {
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
		const lastFollowing = following[following.length - 1];
		setCursor(lastFollowing.createdAt);
		setSkip(false);
	};

	if (!active) return null;

	const placeholderLength = user.followingCount === 0 ? FOLLOWING_LIMIT : Math.min(user.followingCount, FOLLOWING_LIMIT);

	if (!isLoaded) {
		return <RelationsListPlaceholder length={placeholderLength} />;
	}

	if (error) {
		return <div>Error...</div>;
	}

	if (isFollowingPrivate) {
		<NoRelations
			icon={lockIcon}
			title="This account's following list is private"
			text={`${user.username}'s following list is currently hidden`}
		/>;
	}

	if (following.length > 0) {
		return (
			<ul className={profileSharedStyles.RelationsList} id="relationsContainer">
				<InfiniteScroll
					dataLength={following.length}
					next={handleChangeCursor}
					hasMore={hasMore}
					loader={<Loader className={profileSharedStyles.RelationsLoader} />}
					scrollableTarget="relationsContainer"
					style={{ overflow: 'hidden' }}
				>
					{following.map((follow) => (
						<RelationsItem
							key={follow.following.id}
							user={follow.following}
							isAuth={isAuth}
							isFollowedBy={follow.following.isFollowedBy}
							isFollowing={follow.following.isFollowing}
							isCurrentUser={currentUser.id === follow.following.id}
						/>
					))}
				</InfiniteScroll>
			</ul>
		);
	}

	return <NoRelations icon={personIcon} title="Following" text="When you have followers that you follow back, you'll see them here" />;
};

export default FollowingList;
