import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { openAuthModal } from '@/features/auth/authSlice';
import useSyncState from '@/hooks/useSyncState';
import { LIKE_STORY, UNLIKE_STORY } from '@/graphql/stories/mutations';

type UseStoryLikeProps = {
	initLikesCount: number;
	initIsLiked: boolean;
	isAuth: boolean;
	storyId: string;
	likeCallback?: () => void;
	unlikeCallback?: () => void;
};

const useStoryLike = (props: UseStoryLikeProps) => {
	const dispatch = useDispatch();
	const { initLikesCount, initIsLiked, isAuth, storyId, likeCallback, unlikeCallback } = props;
	const [likesCount, setLikesCount] = useSyncState(initLikesCount);
	const [isLiked, setIsLiked] = useSyncState(initIsLiked);

	const [likeStory] = useMutation(LIKE_STORY, {
		variables: {
			likeStoryInput: {
				storyId,
			},
		},
		onCompleted() {
			if (likeCallback) {
				likeCallback();
			}
		},
		onError(error) {
			setIsLiked(false);
			setLikesCount(likesCount - 1);
			console.log(error.graphQLErrors);
		},
	});

	const [unlikeStory] = useMutation(UNLIKE_STORY, {
		variables: {
			unlikeStoryInput: {
				storyId,
			},
		},
		onCompleted() {
			if (unlikeCallback) {
				unlikeCallback();
			}
		},
		onError(error) {
			setIsLiked(true);
			setLikesCount(likesCount + 1);
			console.log(error.graphQLErrors);
		},
	});

	const handleLike = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
			return;
		}

		if (isLiked) {
			setIsLiked(false);
			setLikesCount(likesCount - 1);
			unlikeStory();
		} else {
			setIsLiked(true);
			setLikesCount(likesCount + 1);
			likeStory();
		}
	};

	return {
		handleLike,
		likesCount,
		isLiked,
	};
};

export default useStoryLike;
