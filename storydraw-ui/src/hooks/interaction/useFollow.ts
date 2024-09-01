import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { FOLLOW, UNFOLLOW } from '@/graphql/users/mutations';
import { openAuthModal } from '@/features/auth/authSlice';
import useSyncState from '@/hooks/useSyncState';

type UseFollowProps = {
	initIsFollowing: boolean;
	isAuth: boolean;
	userId: string;
	followCallback?: () => void;
	unfollowCallback?: () => void;
};

const useFollow = (props: UseFollowProps) => {
	const dispatch = useDispatch();
	const { isAuth, userId, initIsFollowing, followCallback, unfollowCallback } = props;
	const [isFollowing, setIsFollowing] = useSyncState(initIsFollowing);

	const [follow, { loading: followLoading }] = useMutation(FOLLOW, {
		variables: {
			followInput: {
				userId,
			},
		},
		onCompleted() {
			setIsFollowing(true);
			if (followCallback) {
				followCallback();
			}
		},
		onError(error) {
			console.log(error.graphQLErrors);
		},
	});

	const [unfollow, { loading: unfollowLoading }] = useMutation(UNFOLLOW, {
		variables: {
			unfollowInput: {
				userId,
			},
		},
		onCompleted() {
			setIsFollowing(false);
			if (unfollowCallback) {
				unfollowCallback();
			}
		},
		onError(error) {
			console.log(error.graphQLErrors);
		},
	});

	const handleFollow = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
			return;
		}

		if (isFollowing) {
			unfollow();
		} else {
			follow();
		}
	};

	return {
		handleFollow,
		loading: followLoading || unfollowLoading,
		isFollowing,
	};
};

export default useFollow;
