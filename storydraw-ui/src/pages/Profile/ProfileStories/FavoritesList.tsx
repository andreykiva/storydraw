import { useState } from 'react';
import { useQuery } from '@apollo/client';
import profileSharedStyles from '@/pages/Profile/ProfileSharedStyles.module.scss';
import ProfileStory from './ProfileStory/ProfileStory';
import UserMessage from '@/pages/Profile/UserMessage/UserMessage';
import lockIcon from '@/assets/icons/profile/lock.svg';
import favoritesIcon from '@/assets/icons/favorites.svg';
import type { UserFavorite } from '@/types/Profile';
import StoriesPlaceholder from './StoriesPlaceholder/StoriesPlaceholder';
import { GET_USER_FAVORITES } from '@/graphql/stories/queries';
import { FAVORITE_STORIES_LIMIT } from '@/constants/pagination';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '@/components/ui/Loader/Loader';

type FavoritesListProps = {
	userId: string;
	username: string;
	isCurrentUser: boolean;
	active: boolean;
};

const FavoritesList = ({ userId, username, isCurrentUser, active }: FavoritesListProps) => {
	const [favorites, setFavorites] = useState<UserFavorite[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [cursor, setCursor] = useState(null);
	const [skip, setSkip] = useState(false);
	//test
	const isPrivate = false;

	const { error } = useQuery(GET_USER_FAVORITES, {
		variables: {
			getUserFavoritesInput: { userId },
			paginationInput: {
				limit: FAVORITE_STORIES_LIMIT,
				cursor,
			},
		},
		onCompleted(data) {
			const newFavorites = data.getUserFavorites || [];

			setFavorites((prevFavorites) => [...prevFavorites, ...newFavorites]);
			setIsLoaded(true);
			setSkip(true);

			if (newFavorites.length < FAVORITE_STORIES_LIMIT) {
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
		const lastFavorite = favorites[favorites.length - 1];
		setCursor(lastFavorite.createdAt);
		setSkip(false);
	};

	if (!active) return null;

	if (isPrivate && !isCurrentUser) {
		return (
			<UserMessage
				icon={lockIcon}
				title="This user's favorite posts are private"
				text={`${username}'s favorite posts are currently hidden`}
			/>
		);
	}

	if (!isLoaded) {
		return <StoriesPlaceholder length={8} />;
	}

	if (error) {
		return <div>Error...</div>;
	}

	if (favorites && favorites.length > 0) {
		return (
			<InfiniteScroll
				dataLength={favorites.length}
				next={handleChangeCursor}
				hasMore={hasMore}
				loader={<Loader className={profileSharedStyles.StoriesLoader} />}
				scrollableTarget="profileContainer"
				style={{ overflow: 'hidden' }}
			>
				<div className={profileSharedStyles.StoriesList}>
					{favorites.map((favorite) => (
						<ProfileStory key={favorite.story.id} story={favorite.story} />
					))}
				</div>
			</InfiniteScroll>
		);
	}

	//no content (me)
	if (isCurrentUser) {
		return <UserMessage icon={favoritesIcon} title="Favorite posts" text="Your favorite posts will appear here" />;
	}

	//no content (user)
	return <UserMessage icon={favoritesIcon} title="No content" text="This user has not added any stories to Favorites yet." />;
};

export default FavoritesList;
