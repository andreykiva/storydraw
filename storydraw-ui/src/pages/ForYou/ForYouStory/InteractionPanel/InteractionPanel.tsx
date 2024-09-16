import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import styles from './InteractionPanel.module.scss';
import { ReactComponent as LikeIcon } from '@/assets/icons/like.svg';
import { ReactComponent as CommentIcon } from '@/assets/icons/comment.svg';
import { ReactComponent as FavoriteIcon } from '@/assets/icons/favorites-filled.svg';
import { ReactComponent as ShareIcon } from '@/assets/icons/share.svg';
import { formatNumber } from '@/utils/formatUtils';
import { ReactComponent as ReportIcon } from '@/assets/icons/report.svg';
import { openReport } from '@/features/report/reportSlice';
import ButtonWithActionsMenu from '@/components/ButtonWithActionsMenu/ButtonWithActionsMenu';
import { MENU_POSITION } from '@/constants/ui';
import { openAuthModal } from '@/features/auth/authSlice';
import useStoryLike from '@/hooks/interaction/useStoryLike';
import useFavorite from '@/hooks/interaction/useFavorite';
import useShare from '@/hooks/interaction/useShare';

type InteractionPanelProps = {
	storyId: string;
	username: string;
	isAuth: boolean;
	likesCount: number;
	commentsCount: number;
	favoritesCount: number;
	sharesCount: number;
	isLiked: boolean;
	isFavorited: boolean;
	isShared: boolean;
};

const InteractionPanel = (props: InteractionPanelProps) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { storyId, username, commentsCount, isAuth } = props;

	const { likesCount, isLiked, handleLike } = useStoryLike({
		initLikesCount: props.likesCount,
		initIsLiked: props.isLiked,
		isAuth,
		storyId,
	});

	const { favoritesCount, isFavorited, handleFavorite } = useFavorite({
		initfavoritesCount: props.favoritesCount,
		initIsFavorited: props.isFavorited,
		isAuth,
		storyId,
	});

	const { sharesCount, isShared, handleShare } = useShare({
		initSharesCount: props.sharesCount,
		initIsShared: props.isShared,
		isAuth,
		storyId,
	});

	const handleComment = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
		} else {
			navigate(`/@${username}/story/${storyId}`);
		}
	};

	const handleOpenReport = () => {
		dispatch(openReport({ type: 'story', targetId: storyId }));
	};

	const actions = [
		{
			name: 'Report',
			iconComponent: <ReportIcon />,
			onClick: handleOpenReport,
		},
	];

	return (
		<div className={styles.InteractionPanel}>
			<div className={styles.PanelItem} onClick={handleLike}>
				<LikeIcon className={cn(styles.ItemIcon, isLiked && styles.Liked)} />
				<div className={styles.ItemCount}>{formatNumber(likesCount)}</div>
			</div>
			<div className={styles.PanelItem} onClick={handleComment}>
				<CommentIcon className={styles.ItemIcon} />
				<div className={styles.ItemCount}>{formatNumber(commentsCount)}</div>
			</div>
			<div className={styles.PanelItem} onClick={handleFavorite}>
				<FavoriteIcon className={cn(styles.ItemIcon, isFavorited && styles.Favorited)} />
				<div className={styles.ItemCount}>{formatNumber(favoritesCount)}</div>
			</div>
			<div className={styles.PanelItem} onClick={handleShare}>
				<ShareIcon className={cn(styles.ItemIcon, isShared && styles.Shared)} />
				<div className={styles.ItemCount}>{formatNumber(sharesCount)}</div>
			</div>
			<ButtonWithActionsMenu actions={actions} menuPosition={MENU_POSITION.BOTTOM_LEFT} menuClassName={styles.ActionsMenu} />
		</div>
	);
};

export default InteractionPanel;
