import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import styles from './ProfileStories.module.scss';
import UserMessage from '../UserMessage/UserMessage';
import { PROFILE_STORIES_TYPE } from '@/constants/profile';
import ViewsMenuItem from './ViewsMenuItem/ViewsMenuItem';
import personIcon from '@/assets/icons/profile/person.svg?url';
import StoriesList from './StoriesList';
import FavoritesList from './FavoritesList';
import LikedList from './LikedList';
import { GET_FAVORITE_STORIES, GET_LIKED_STORIES, GET_USER_STORIES } from '@/graphql/stories/queries';

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

	const { data: userStories, loading: userStoriesLoading } = useQuery(GET_USER_STORIES, {
		variables: { getUserStoriesInput: { userId } },
		skip: storiesView !== PROFILE_STORIES_TYPE.STORIES,
		onError(error) {
			console.log(error);
		},
	});

	const { data: favoriteStories, loading: favoriteStoriesLoading } = useQuery(GET_FAVORITE_STORIES, {
		variables: { getFavoriteStoriesInput: { userId } },
		skip: storiesView !== PROFILE_STORIES_TYPE.FAVORITES,
		onError(error) {
			console.log(error);
		},
	});

	const { data: likedStories, loading: likedStoriesLoading } = useQuery(GET_LIKED_STORIES, {
		variables: { getLikedStoriesInput: { userId } },
		skip: storiesView !== PROFILE_STORIES_TYPE.LIKED,
		onError(error) {
			console.log(error);
		},
	});

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
				<div className={styles.StoriesList}>
					{storiesView === PROFILE_STORIES_TYPE.STORIES && (
						<StoriesList
							stories={userStories?.getUserStories}
							username={username}
							isCurrentUser={isCurrentUser}
							isPrivate={false}
							loading={userStoriesLoading}
						/>
					)}
					{storiesView === PROFILE_STORIES_TYPE.FAVORITES && (
						<FavoritesList
							favorites={favoriteStories?.getFavoriteStories}
							username={username}
							isCurrentUser={isCurrentUser}
							isPrivate={false}
							loading={favoriteStoriesLoading}
						/>
					)}
					{storiesView === PROFILE_STORIES_TYPE.LIKED && (
						<LikedList
							liked={likedStories?.getLikedStories}
							username={username}
							isCurrentUser={isCurrentUser}
							isPrivate={false}
							loading={likedStoriesLoading}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default ProfileStories;
