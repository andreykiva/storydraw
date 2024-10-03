import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import styles from './Story.module.scss';
import StoryInfo from './StoryInfo/StoryInfo';
import Comments from './Comments/Comments';
import { selectAuth } from '@/features/auth/authSlice';
import { GET_STORY } from '@/graphql/stories/queries';
import { selectUser } from '@/features/user/userSlice';
import StoryContent from './StoryContent/StoryContent';
import StoryInfoPlaceholder from './StoryInfo/StoryInfoPlaceholder/StoryInfoPlaceholder';
import { ForYouStory } from '@/types/Story';

const Story = () => {
	const isAuth = useSelector(selectAuth);
	const currentUser = useSelector(selectUser);
	const params = useParams();
	const storyId = params.storyId;

	const [story, setStory] = useState<ForYouStory>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	let isCurrentUser = false;

	if (isLoaded && currentUser.id === story?.user.id) {
		isCurrentUser = true;
	}

	const { error } = useQuery(GET_STORY, {
		variables: {
			getStoryInput: {
				storyId,
			},
			isAuth,
		},
		onCompleted(data) {
			setStory(data.getStory);
			setIsLoaded(true);
		},
	});

	useEffect(() => {
		setIsLoaded(false);
		setStory(null);
	}, [storyId]);

	if (error) return <div>Error...</div>;

	if (isLoaded && !story) return <div>Story not found!</div>;

	return (
		<div className={styles.Story}>
			<StoryContent isCurrentUser={isCurrentUser} storyId={story?.id} isLoaded={isLoaded} />
			<div className={styles.StoryPanel}>
				{isLoaded ? <StoryInfo story={story} isCurrentUser={isCurrentUser} /> : <StoryInfoPlaceholder />}
				<Comments storyId={storyId} isAuth={isAuth} currentUserId={currentUser.id} />
			</div>
		</div>
	);
};

export default Story;
