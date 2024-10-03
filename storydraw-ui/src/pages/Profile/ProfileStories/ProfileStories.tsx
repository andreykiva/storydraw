import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ProfileStories.module.scss';
import UserMessage from '../UserMessage/UserMessage';
import { PROFILE_STORIES_TYPE } from '@/constants/profile';
import ViewsMenuItem from './ViewsMenuItem/ViewsMenuItem';
import personIcon from '@/assets/icons/profile/person.svg';
import UserStoriesList from './UserStoriesList';
import FavoritesList from './FavoritesList';
import LikedList from './LikedList';

// type PrivacySettings = Record<PROFILE_STORIES_TYPE, boolean>;

type ProfileStoriesProps = {
	userId: string;
	username: string;
	isCurrentUser: boolean;
	isPrivate: boolean;
	isFollowing: boolean;
	// privacySettings: PrivacySettings;
};

const ProfileStories = (props: ProfileStoriesProps) => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const tab = queryParams.get('tab');

	const { userId, username, isCurrentUser, isPrivate, isFollowing } = props;
	const [storiesView, setStoriesView] = useState<PROFILE_STORIES_TYPE>(
		tab === PROFILE_STORIES_TYPE.FAVORITES ? PROFILE_STORIES_TYPE.FAVORITES : PROFILE_STORIES_TYPE.STORIES,
	);

	useEffect(() => {
		if (tab && tab === PROFILE_STORIES_TYPE.FAVORITES) {
			setStoriesView(PROFILE_STORIES_TYPE.FAVORITES);
		}
	}, [tab]);

	useEffect(() => {
		if (!tab) {
			setStoriesView(PROFILE_STORIES_TYPE.STORIES);
		}
	}, [username, tab]);

	return (
		<div className={styles.ProfileStories}>
			<div className={styles.StoriesViewsMenu}>
				<ViewsMenuItem
					active={storiesView === PROFILE_STORIES_TYPE.STORIES}
					isPrivate={false}
					onClick={() => setStoriesView(PROFILE_STORIES_TYPE.STORIES)}
				>
					Stories
				</ViewsMenuItem>
				<ViewsMenuItem
					active={storiesView === PROFILE_STORIES_TYPE.FAVORITES}
					isPrivate={false}
					onClick={() => setStoriesView(PROFILE_STORIES_TYPE.FAVORITES)}
				>
					Favorites
				</ViewsMenuItem>
				<ViewsMenuItem
					active={storiesView === PROFILE_STORIES_TYPE.LIKED}
					isPrivate={false}
					onClick={() => setStoriesView(PROFILE_STORIES_TYPE.LIKED)}
				>
					Liked
				</ViewsMenuItem>
			</div>

			{!isCurrentUser && isPrivate && !isFollowing ? (
				<UserMessage icon={personIcon} title="This account is private" text="Follow this account to see their contents and likes" />
			) : (
				<>
					<UserStoriesList
						userId={userId}
						username={username}
						isCurrentUser={isCurrentUser}
						active={storiesView === PROFILE_STORIES_TYPE.STORIES}
					/>
					<FavoritesList
						userId={userId}
						username={username}
						isCurrentUser={isCurrentUser}
						active={storiesView === PROFILE_STORIES_TYPE.FAVORITES}
					/>
					<LikedList
						userId={userId}
						username={username}
						isCurrentUser={isCurrentUser}
						active={storiesView === PROFILE_STORIES_TYPE.LIKED}
					/>
				</>
			)}
		</div>
	);
};

export default ProfileStories;
