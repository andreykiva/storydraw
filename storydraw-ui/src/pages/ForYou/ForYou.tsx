import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './ForYou.module.scss';
import ForYouStory from './ForYouStory/ForYouStory';
import { GET_FEED } from '@/graphql/stories/queries';
import { selectAuth } from '@/features/auth/authSlice';
import { ForYouStory as ForYouStoryType } from '@/types/Story';
import { selectUser } from '@/features/user/userSlice';
import StoriesPlaceholder from './StoriesPlaceholder/StoriesPlaceholder';
import Loader from '@/components/ui/Loader/Loader';
import { FOR_YOU_STORIES_LIMIT } from '@/constants/pagination';

const ForYou = () => {
	const isAuth = useSelector(selectAuth);
	const currentUser = useSelector(selectUser);
	const [stories, setStories] = useState<ForYouStoryType[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [cursor, setCursor] = useState(null);

	const { error } = useQuery(GET_FEED, {
		variables: {
			isAuth,
			paginationInput: {
				limit: FOR_YOU_STORIES_LIMIT,
				cursor,
			},
		},
		onCompleted(data) {
			const newStories = data.getAllStories;

			setStories((prevStories) => [...prevStories, ...newStories]);
			setIsLoaded(true);

			if (newStories.length < FOR_YOU_STORIES_LIMIT) {
				setHasMore(false);
			}
		},
		onError() {
			setIsLoaded(true);
		},
		notifyOnNetworkStatusChange: true,
		fetchPolicy: 'no-cache',
	});

	useEffect(() => {
		setStories([]);
		setIsLoaded(false);
		setHasMore(true);
		setCursor(null);
	}, [isAuth]);

	const handleChangeCursor = () => {
		const lastStory = stories[stories.length - 1];
		setCursor(lastStory.createdAt);
	};

	if (isLoaded && error) return <div>Error: {error.graphQLErrors[0]?.message || error.message}</div>;

	if (!isLoaded) return <StoriesPlaceholder length={2} />;

	return (
		<div className={styles.ForYou} id="forYouContainer">
			<InfiniteScroll
				dataLength={stories.length || 0}
				next={handleChangeCursor}
				hasMore={hasMore}
				loader={<Loader className={styles.Loader} />}
				scrollableTarget="forYouContainer"
				style={{ overflow: 'hidden' }}
			>
				{stories.map((story) => (
					<ForYouStory key={story.id} isAuth={isAuth} story={story} currentUser={currentUser} />
				))}
			</InfiniteScroll>
		</div>
	);
};

export default ForYou;
