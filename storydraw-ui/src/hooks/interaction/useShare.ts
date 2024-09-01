import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { openAuthModal } from '@/features/auth/authSlice';
import useSyncState from '@/hooks/useSyncState';
import { SHARE } from '@/graphql/stories/mutations';

type UseShareProps = {
	initSharesCount: number;
	initIsShared: boolean;
	isAuth: boolean;
	storyId: string;
	shareCallback?: () => void;
};

const useShare = (props: UseShareProps) => {
	const dispatch = useDispatch();
	const { initSharesCount, initIsShared, isAuth, storyId, shareCallback } = props;
	const [sharesCount, setSharesCount] = useSyncState(initSharesCount);
	const [isShared, setIsShared] = useSyncState(initIsShared);

	const [share] = useMutation(SHARE, {
		variables: {
			shareInput: {
				storyId,
			},
		},
		onCompleted() {
			if (shareCallback) {
				shareCallback();
			}
		},
		onError(error) {
			setSharesCount(sharesCount - 1);
			console.log(error.graphQLErrors);
		},
	});

	const handleShare = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
		} else {
			setIsShared(true);
			setSharesCount(sharesCount + 1);
			share();
		}
	};

	return {
		handleShare,
		sharesCount,
		isShared,
	};
};

export default useShare;
