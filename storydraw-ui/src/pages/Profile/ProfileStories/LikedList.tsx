import { useState } from 'react';
import { useQuery } from '@apollo/client';
import profileSharedStyles from '@/pages/Profile/ProfileSharedStyles.module.scss';
import ProfileStory from './ProfileStory/ProfileStory';
import UserMessage from '@/pages/Profile/UserMessage/UserMessage';
import personIcon from '@/assets/icons/profile/person.svg';
import lockIcon from '@/assets/icons/profile/lock.svg';
import type { UserStoryLike } from '@/types/Profile';
import StoriesPlaceholder from './StoriesPlaceholder/StoriesPlaceholder';
import { GET_USER_STORY_LIKES } from '@/graphql/stories/queries';
import { LIKED_STORIES_LIMIT } from '@/constants/pagination';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '@/components/ui/Loader/Loader';

type LikedListProps = {
	userId: string;
	username: string;
	isCurrentUser: boolean;
	active: boolean;
};

const LikedList = ({ userId, username, isCurrentUser, active }: LikedListProps) => {
	const [likes, setLikes] = useState<UserStoryLike[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [cursor, setCursor] = useState(null);
	const [skip, setSkip] = useState(false);
	//test
	const isPrivate = false;

	const { error } = useQuery(GET_USER_STORY_LIKES, {
		variables: {
			getUserStoryLikesInput: { userId },
			paginationInput: {
				limit: LIKED_STORIES_LIMIT,
				cursor,
			},
		},
		onCompleted(data) {
			const newLikes = data.getUserStoryLikes || [];

			setLikes((prevLikes) => [...prevLikes, ...newLikes]);
			setIsLoaded(true);
			setSkip(true);

			if (newLikes.length < LIKED_STORIES_LIMIT) {
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
		const lastLike = likes[likes.length - 1];
		setCursor(lastLike.createdAt);
		setSkip(false);
	};

	if (!active) return null;

	if (isPrivate && !isCurrentUser) {
		return (
			<UserMessage
				icon={lockIcon}
				title="This user's liked stories are private"
				text={`Stories liked by ${username} are currently hidden`}
			/>
		);
	}

	if (!isLoaded) {
		return <StoriesPlaceholder length={8} />;
	}

	if (error) {
		return <div>Error...</div>;
	}

	if (likes && likes.length > 0) {
		return (
			<InfiniteScroll
				dataLength={likes.length}
				next={handleChangeCursor}
				hasMore={hasMore}
				loader={<Loader className={profileSharedStyles.StoriesLoader} />}
				scrollableTarget="profileContainer"
				style={{ overflow: 'hidden' }}
			>
				<div className={profileSharedStyles.StoriesList}>
					{likes.map((like) => (
						<ProfileStory key={like.story.id} story={like.story} />
					))}
				</div>
			</InfiniteScroll>
		);
	}

	//no content (me)
	if (isCurrentUser) {
		return <UserMessage icon={personIcon} title="No liked stories yet" text="Stories you liked will appear here" />;
	}

	//no content (user)
	return <UserMessage icon={personIcon} title="No content" text="This user has not liked any stories" />;
};

export default LikedList;
