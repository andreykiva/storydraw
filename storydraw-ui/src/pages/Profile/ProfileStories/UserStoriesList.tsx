import { useState } from 'react';
import { useQuery } from '@apollo/client';
import profileSharedStyles from '@/pages/Profile/ProfileSharedStyles.module.scss';
import ProfileStory from './ProfileStory/ProfileStory';
import UserMessage from '@/pages/Profile/UserMessage/UserMessage';
import personIcon from '@/assets/icons/profile/person.svg';
import lockIcon from '@/assets/icons/profile/lock.svg';
import StoriesPlaceholder from './StoriesPlaceholder/StoriesPlaceholder';
import { GET_USER_STORIES } from '@/graphql/stories/queries';
import type { ProfileStory as ProfileStoryType } from '@/types/Profile';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '@/components/ui/Loader/Loader';
import { USER_STORIES_LIMIT } from '@/constants/pagination';

type UserStoriesListProps = {
	userId: string;
	username: string;
	isCurrentUser: boolean;
	active: boolean;
};

const UserStoriesList = ({ userId, username, isCurrentUser, active }: UserStoriesListProps) => {
	const [stories, setStories] = useState<ProfileStoryType[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [cursor, setCursor] = useState(null);
	const [skip, setSkip] = useState(false);
	//test
	const isPrivate = false;

	const { error } = useQuery(GET_USER_STORIES, {
		variables: {
			getUserStoriesInput: { userId },
			paginationInput: {
				limit: USER_STORIES_LIMIT,
				cursor,
			},
		},
		onCompleted(data) {
			const newStories = data.getUserStories || [];

			setStories((prevStories) => [...prevStories, ...newStories]);
			setIsLoaded(true);
			setSkip(true);

			if (newStories.length < USER_STORIES_LIMIT) {
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
		const lastStory = stories[stories.length - 1];
		setCursor(lastStory.createdAt);
		setSkip(false);
	};


	if (!active) return null;

	if (isPrivate && !isCurrentUser) {
		return (
			<UserMessage
				icon={lockIcon}
				title="This user's stories are private"
				text={`Stories published by ${username} are currently hidden`}
			/>
		);
	}

	if (!isLoaded) {
		return <StoriesPlaceholder length={8} />;
	}

	if (error) {
		return <div>Error...</div>;
	}

	if (stories && stories.length > 0) {
		return (
			<InfiniteScroll
				dataLength={stories.length}
				next={handleChangeCursor}
				hasMore={hasMore}
				loader={<Loader className={profileSharedStyles.StoriesLoader} />}
				scrollableTarget="profileContainer"
				style={{ overflow: 'hidden' }}
			>
				<div className={profileSharedStyles.StoriesList}>
					{stories.map((story) => (
						<ProfileStory key={story.id} story={story} />
					))}
				</div>
			</InfiniteScroll>
		);
	}

	//no content (me)
	if (isCurrentUser) {
		return <UserMessage icon={personIcon} title="Upload your first story" text="Your stories will appear here" />;
	}

	//no content (user)
	return <UserMessage icon={personIcon} title="No content" text="This user has not published any stories" />;
};

export default UserStoriesList;
