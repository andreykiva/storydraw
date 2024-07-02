import React, { useState, useEffect } from 'react';
import styles from './ProfileStories.module.scss';
import UserMessage from '../UserMessage/UserMessage';
import type { ProfileStory as ProfileStoryType } from '@/types/Profile';
import { PROFILE_STORIES_TYPE } from '@/constants/profile';
import ViewsMenuItem from './ViewsMenuItem/ViewsMenuItem';
import personIcon from '@/assets/icons/profile/person.svg?url';
import StoriesList from './StoriesList';
import FavoritesList from './FavoritesList';
import LikedList from './LikedList';

const testStories: ProfileStoryType[] = [
	{
		id: '1',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '2',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '3',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '4',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '5',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '6',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '7',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '8',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '9',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '10',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '11',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '12',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '13',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '14',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '15',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '16',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '17',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '18',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '19',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '20',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
];
// const testFavorites: ProfileStoryType[] = [
// 	{
// 		id: '1',
// 		story: '',
// 		description: 'yo yo yo',
// 		tags: ['music', 'song'],
// 		views: 1412,
// 	},
// 	{
// 		id: '2',
// 		story: '',
// 		description: 'yo yo yo',
// 		tags: ['music', 'song'],
// 		views: 1412,
// 	},
// 	{
// 		id: '3',
// 		story: '',
// 		description: 'yo yo yo',
// 		tags: ['music', 'song'],
// 		views: 1412,
// 	},
// 	{
// 		id: '4',
// 		story: '',
// 		description: 'yo yo yo',
// 		tags: ['music', 'song'],
// 		views: 1412,
// 	},
// 	{
// 		id: '5',
// 		story: '',
// 		description: 'yo yo yo',
// 		tags: ['music', 'song'],
// 		views: 1412,
// 	},
// 	{
// 		id: '6',
// 		story: '',
// 		description: 'yo yo yo',
// 		tags: ['music', 'song'],
// 		views: 1412,
// 	},
// 	{
// 		id: '7',
// 		story: '',
// 		description: 'yo yo yo',
// 		tags: ['music', 'song'],
// 		views: 1412,
// 	},
// 	{
// 		id: '8',
// 		story: '',
// 		description: 'yo yo yo',
// 		tags: ['music', 'song'],
// 		views: 1412,
// 	},
// 	{
// 		id: '9',
// 		story: '',
// 		description: 'yo yo yo',
// 		tags: ['music', 'song'],
// 		views: 1412,
// 	},
// 	{
// 		id: '10',
// 		story: '',
// 		description: 'yo yo yo',
// 		tags: ['music', 'song'],
// 		views: 1412,
// 	},
// 	{
// 		id: '11',
// 		story: '',
// 		description: 'yo yo yo',
// 		tags: ['music', 'song'],
// 		views: 1412,
// 	},
// 	{
// 		id: '12',
// 		story: '',
// 		description: 'yo yo yo',
// 		tags: ['music', 'song'],
// 		views: 1412,
// 	},
// 	{
// 		id: '13',
// 		story: '',
// 		description: 'yo yo yo',
// 		tags: ['music', 'song'],
// 		views: 1412,
// 	},
// 	{
// 		id: '14',
// 		story: '',
// 		description: 'yo yo yo',
// 		tags: ['music', 'song'],
// 		views: 1412,
// 	},
// 	{
// 		id: '15',
// 		story: '',
// 		description: 'yo yo yo',
// 		tags: ['music', 'song'],
// 		views: 1412,
// 	},
// 	{
// 		id: '16',
// 		story: '',
// 		description: 'yo yo yo',
// 		tags: ['music', 'song'],
// 		views: 1412,
// 	},
// 	{
// 		id: '17',
// 		story: '',
// 		description: 'yo yo yo',
// 		tags: ['music', 'song'],
// 		views: 1412,
// 	},
// 	{
// 		id: '18',
// 		story: '',
// 		description: 'yo yo yo',
// 		tags: ['music', 'song'],
// 		views: 1412,
// 	},
// 	{
// 		id: '19',
// 		story: '',
// 		description: 'yo yo yo',
// 		tags: ['music', 'song'],
// 		views: 1412,
// 	},
// 	{
// 		id: '20',
// 		story: '',
// 		description: 'yo yo yo',
// 		tags: ['music', 'song'],
// 		views: 1412,
// 	},
// ];
const testLiked: ProfileStoryType[] = [
	{
		id: '1',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '2',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '3',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '4',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '5',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '6',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '7',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '8',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '9',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '10',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '11',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '12',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '13',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '14',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '15',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '16',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '17',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '18',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '19',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '20',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
];

const testFavorites: ProfileStoryType[] = [];

type StoriesData = Record<PROFILE_STORIES_TYPE, ProfileStoryType[]>;
type LoadedData = Record<PROFILE_STORIES_TYPE, boolean>;
type PrivacySettings = Record<PROFILE_STORIES_TYPE, boolean>;

type ProfileStoriesProps = {
	username: string;
	isCurrentUser: boolean;
	isPrivate: boolean;
	isFollowedByYou: boolean;
	privacySettings: PrivacySettings;
};

const ProfileStories = (props: ProfileStoriesProps) => {
	const { username, isCurrentUser, isPrivate, isFollowedByYou, privacySettings } = props;
	const [storiesView, setStoriesView] = useState<PROFILE_STORIES_TYPE>(PROFILE_STORIES_TYPE.STORIES);
	const [storiesData, setStoriesData] = useState<StoriesData>({
		[PROFILE_STORIES_TYPE.STORIES]: null,
		[PROFILE_STORIES_TYPE.FAVORITES]: null,
		[PROFILE_STORIES_TYPE.LIKED]: null,
	});

	const [loadedData, setLoadedData] = useState<LoadedData>({
		[PROFILE_STORIES_TYPE.STORIES]: false,
		[PROFILE_STORIES_TYPE.FAVORITES]: false,
		[PROFILE_STORIES_TYPE.LIKED]: false,
	});

	useEffect(() => {
		setLoadedData({
			[PROFILE_STORIES_TYPE.STORIES]: false,
			[PROFILE_STORIES_TYPE.FAVORITES]: false,
			[PROFILE_STORIES_TYPE.LIKED]: false,
		});
	}, [username]);

	useEffect(() => {
		if (loadedData[storiesView]) {
			return;
		}

		const timeoutId = setTimeout(() => {
			if (storiesView === PROFILE_STORIES_TYPE.STORIES) {
				setStoriesData((prev) => ({ ...prev, [PROFILE_STORIES_TYPE.STORIES]: testStories }));
				setLoadedData({ ...loadedData, [PROFILE_STORIES_TYPE.STORIES]: true });
			} else if (storiesView === PROFILE_STORIES_TYPE.FAVORITES) {
				setStoriesData((prev) => ({ ...prev, [PROFILE_STORIES_TYPE.FAVORITES]: testFavorites }));
				setLoadedData({ ...loadedData, [PROFILE_STORIES_TYPE.FAVORITES]: true });
			} else if (storiesView === PROFILE_STORIES_TYPE.LIKED) {
				setStoriesData((prev) => ({ ...prev, [PROFILE_STORIES_TYPE.LIKED]: testLiked }));
				setLoadedData({ ...loadedData, [PROFILE_STORIES_TYPE.LIKED]: true });
			}
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [storiesView, loadedData]);

	return (
		<div className={styles.ProfileStories}>
			<div className={styles.StoriesViewsMenu}>
				<ViewsMenuItem
					active={storiesView === PROFILE_STORIES_TYPE.STORIES}
					isPrivate={privacySettings[PROFILE_STORIES_TYPE.STORIES]}
					onClick={() => setStoriesView(PROFILE_STORIES_TYPE.STORIES)}
				>
					Stories
				</ViewsMenuItem>
				<ViewsMenuItem
					active={storiesView === PROFILE_STORIES_TYPE.FAVORITES}
					isPrivate={privacySettings[PROFILE_STORIES_TYPE.FAVORITES]}
					onClick={() => setStoriesView(PROFILE_STORIES_TYPE.FAVORITES)}
				>
					Favorites
				</ViewsMenuItem>
				<ViewsMenuItem
					active={storiesView === PROFILE_STORIES_TYPE.LIKED}
					isPrivate={privacySettings[PROFILE_STORIES_TYPE.LIKED]}
					onClick={() => setStoriesView(PROFILE_STORIES_TYPE.LIKED)}
				>
					Liked
				</ViewsMenuItem>
			</div>

			{!isCurrentUser && isPrivate && !isFollowedByYou ? (
				<UserMessage
					icon={personIcon}
					title="This account is private"
					text="Follow this account to see their contents and likes"
				/>
			) : (
				<div className={styles.StoriesList}>
					{storiesView === PROFILE_STORIES_TYPE.STORIES && (
						<StoriesList
							stories={storiesData[PROFILE_STORIES_TYPE.STORIES]}
							username={username}
							isCurrentUser={isCurrentUser}
							isPrivate={privacySettings[PROFILE_STORIES_TYPE.STORIES]}
							isStoriesLoaded={loadedData[PROFILE_STORIES_TYPE.STORIES]}
						/>
					)}
					{storiesView === PROFILE_STORIES_TYPE.FAVORITES && (
						<FavoritesList
							favorites={storiesData[PROFILE_STORIES_TYPE.FAVORITES]}
							username={username}
							isCurrentUser={isCurrentUser}
							isPrivate={privacySettings[PROFILE_STORIES_TYPE.FAVORITES]}
							isFavoritesLoaded={loadedData[PROFILE_STORIES_TYPE.FAVORITES]}
						/>
					)}
					{storiesView === PROFILE_STORIES_TYPE.LIKED && (
						<LikedList
							liked={storiesData[PROFILE_STORIES_TYPE.LIKED]}
							username={username}
							isCurrentUser={isCurrentUser}
							isPrivate={privacySettings[PROFILE_STORIES_TYPE.LIKED]}
							isLikedLoaded={loadedData[PROFILE_STORIES_TYPE.LIKED]}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default ProfileStories;
