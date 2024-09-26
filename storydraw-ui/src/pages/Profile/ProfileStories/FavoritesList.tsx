import ProfileStory from './ProfileStory/ProfileStory';
import UserMessage from '@/pages/Profile/UserMessage/UserMessage';
import lockIcon from '@/assets/icons/profile/lock.svg';
import favoritesIcon from '@/assets/icons/favorites.svg';
import type { ProfileStory as ProfileStoryType } from '@/types/Profile';
import StoriesPlaceholder from './StoriesPlaceholder/StoriesPlaceholder';

type FavoritesListProps = {
	favorites: ProfileStoryType[];
	username: string;
	isCurrentUser: boolean;
	isPrivate: boolean;
	loading: boolean;
};

const FavoritesList = (props: FavoritesListProps) => {
	const { favorites, username, isCurrentUser, isPrivate, loading } = props;

	if (isPrivate && !isCurrentUser) {
		return (
			<UserMessage
				icon={lockIcon}
				title="This user's favorite posts are private"
				text={`${username}'s favorite posts are currently hidden`}
			/>
		);
	}

	if (loading) {
		return <StoriesPlaceholder length={8} />;
	}

	if (favorites && favorites.length > 0) {
		return (
			<>
				{favorites.map((story) => (
					<ProfileStory key={story.id} {...story} />
				))}
			</>
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
