import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { openAuthModal } from '@/features/auth/authSlice';
import useSyncState from '@/hooks/useSyncState';
import { ADD_FAVORITE, REMOVE_FAVORITE } from '@/graphql/stories/mutations';

type UseFavoriteProps = {
	initfavoritesCount: number;
	initIsFavorited: boolean;
	isAuth: boolean;
	storyId: string;
	addFavoriteCallback?: () => void;
	removeFavoriteCallback?: () => void;
};

const useFavorite = (props: UseFavoriteProps) => {
	const dispatch = useDispatch();
	const { initfavoritesCount, initIsFavorited, isAuth, storyId, addFavoriteCallback, removeFavoriteCallback } = props;
	const [favoritesCount, setFavoritesCount] = useSyncState(initfavoritesCount);
	const [isFavorited, setIsFavorited] = useSyncState(initIsFavorited);

	const [addFavorite] = useMutation(ADD_FAVORITE, {
		variables: {
			addFavoriteInput: {
				storyId,
			},
		},
		onCompleted() {
			if (addFavoriteCallback) {
				addFavoriteCallback();
			}
		},
		onError(error) {
			setIsFavorited(false);
			setFavoritesCount(favoritesCount - 1);
			console.log(error.graphQLErrors);
		},
	});

	const [removeFavorite] = useMutation(REMOVE_FAVORITE, {
		variables: {
			removeFavoriteInput: {
				storyId,
			},
		},
		onCompleted() {
			if (removeFavoriteCallback) {
				removeFavoriteCallback();
			}
		},
		onError(error) {
			setIsFavorited(true);
			setFavoritesCount(favoritesCount + 1);
			console.log(error.graphQLErrors);
		},
	});

	const handleFavorite = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
			return;
		}

		if (isFavorited) {
			setIsFavorited(false);
			setFavoritesCount(favoritesCount - 1);
			removeFavorite();
		} else {
			setIsFavorited(true);
			setFavoritesCount(favoritesCount + 1);
			addFavorite();
		}
	};

	return {
		handleFavorite,
		favoritesCount,
		isFavorited,
	};
};

export default useFavorite;
