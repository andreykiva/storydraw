import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './ForYou.module.scss';
import ForYouStory from './ForYouStory/ForYouStory';
import { useQuery } from '@apollo/client';
import { GET_FEED } from '@/graphql/stories/queries';
import Loader from '@/components/ui/Loader/Loader';
import { selectAuth } from '@/features/auth/authSlice';
import { ForYouStory as ForYouStoryType } from '@/types/Story';
import { selectUser } from '@/features/user/userSlice';

const ForYou = () => {
	const isAuth = useSelector(selectAuth);
	const currentUser = useSelector(selectUser);
	const [stories, setStories] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);

	const { error } = useQuery(GET_FEED, {
		variables: {
			isAuth,
		},
		fetchPolicy: 'no-cache',
		onCompleted(data) {
			setStories(data.getAllStories);
			setIsLoaded(true);
		},
		onError() {
			setIsLoaded(true);
		},
	});

	if (isLoaded && error) return <div>Error: {error.graphQLErrors[0]?.message || error.message}</div>;

	return (
		<div className={styles.ForYou}>
			{!isLoaded ? (
				<Loader className={styles.Loader} />
			) : (
				stories.map((story: ForYouStoryType) => (
					<ForYouStory key={story.id} isAuth={isAuth} story={story} currentUser={currentUser} />
				))
			)}
		</div>
	);
};

export default ForYou;
