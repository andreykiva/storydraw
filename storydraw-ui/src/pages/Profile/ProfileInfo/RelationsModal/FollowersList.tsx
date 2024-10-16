import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';
import profileSharedStyles from '@/pages/Profile/ProfileSharedStyles.module.scss';
import { ProfileUser, RelationsFollower } from '@/types/Profile';
import RelationsItem from './RelationsItem/RelationsItem';
import NoRelations from './NoRelations/NoRelations';
import personIcon from '@/assets/icons/profile/person.svg';
import { selectUser } from '@/features/user/userSlice';
import RelationsListPlaceholder from './RelationsListPlaceholder/RelationsListPlaceholder';
import { GET_FOLLOWERS } from '@/graphql/users/queries';
import { FOLLOWERS_LIMIT } from '@/constants/pagination';
import Loader from '@/components/ui/Loader/Loader';

type FollowersListProps = {
	user: ProfileUser;
	isAuth: boolean;
	active: boolean;
};

const FollowersList = ({ user, isAuth, active }: FollowersListProps) => {
	const currentUser = useSelector(selectUser);
	const [followers, setFollowers] = useState<RelationsFollower[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [cursor, setCursor] = useState(null);
	const [skip, setSkip] = useState(false);

	const { error } = useQuery(GET_FOLLOWERS, {
		variables: {
			getFollowersInput: { userId: user.id },
			paginationInput: {
				limit: FOLLOWERS_LIMIT,
				cursor,
			},
			isAuth,
		},
		onCompleted(data) {
			const newFollowers = data.getFollowers || [];

			setFollowers((prevFollowers) => [...prevFollowers, ...newFollowers]);
			setIsLoaded(true);
			setSkip(true);

			if (newFollowers.length < FOLLOWERS_LIMIT) {
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
		const lastFollower = followers[followers.length - 1];
		setCursor(lastFollower.createdAt);
		setSkip(false);
	};

	if (!active) return null;

	const placeholderLength = user.followersCount === 0 ? FOLLOWERS_LIMIT : Math.min(user.followersCount, FOLLOWERS_LIMIT);

	if (!isLoaded) {
		return <RelationsListPlaceholder length={placeholderLength} />;
	}

	if (error) {
		return <div>Error...</div>;
	}

	if (followers.length > 0) {
		return (
			<ul className={profileSharedStyles.RelationsList} id="relationsContainer">
				<InfiniteScroll
					dataLength={followers.length}
					next={handleChangeCursor}
					hasMore={hasMore}
					loader={<Loader className={profileSharedStyles.RelationsLoader} />}
					scrollableTarget="relationsContainer"
					style={{ overflow: 'hidden' }}
				>
					{followers.map((follow) => (
						<RelationsItem
							key={follow.follower.id}
							user={follow.follower}
							isAuth={isAuth}
							isFollowedBy={follow.follower.isFollowedBy}
							isFollowing={follow.follower.isFollowing}
							isCurrentUser={currentUser.id === follow.follower.id}
						/>
					))}
				</InfiniteScroll>
			</ul>
		);
	}

	return <NoRelations icon={personIcon} title="Followers" text="When people start following this user, you'll see them here" />;
};

export default FollowersList;
