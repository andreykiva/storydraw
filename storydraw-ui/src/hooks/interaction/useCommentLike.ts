import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { openAuthModal } from '@/features/auth/authSlice';
import { LIKE_COMMENT, UNLIKE_COMMENT } from '@/graphql/comments/mutations';

type UseCommentLikeProps = {
	isAuth: boolean;
	commentId: string;
	isLiked: boolean;
	likeCallback: () => void;
	unlikeCallback: () => void;
};

const useCommentLike = (props: UseCommentLikeProps) => {
	const dispatch = useDispatch();
	const { isLiked, isAuth, commentId, likeCallback, unlikeCallback } = props;

	const [likeComment] = useMutation(LIKE_COMMENT, {
		variables: {
			likeCommentInput: {
				commentId,
			},
		},
		onCompleted() {
			likeCallback();
		},
		onError(error) {
			unlikeCallback();
			console.log(error.graphQLErrors);
		},
	});

	const [unlikeComment] = useMutation(UNLIKE_COMMENT, {
		variables: {
			unlikeCommentInput: {
				commentId,
			},
		},
		onCompleted() {
			unlikeCallback();
		},
		onError(error) {
			likeCallback();
			console.log(error.graphQLErrors);
		},
	});

	const handleLike = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
			return;
		}

		if (isLiked) {
			unlikeComment();
		} else {
			likeComment();
		}
	};

	return {
		handleLike,
	};
};

export default useCommentLike;
