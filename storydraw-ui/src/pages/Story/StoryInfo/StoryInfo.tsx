import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import styles from './StoryInfo.module.scss';
import defaultImg from '@/assets/images/default.svg';
import musicIcon from '@/assets/icons/music.svg';
import { ReactComponent as LikeIcon } from '@/assets/icons/like.svg';
import { ReactComponent as ShareIcon } from '@/assets/icons/share.svg';
import { ReactComponent as FavoriteIcon } from '@/assets/icons/favorites-filled.svg';
import { formatNumber } from '@/utils/formatUtils';
import type { ForYouStory } from '@/types/Story';
import { selectAuth } from '@/features/auth/authSlice';
import { displayDate } from '@/utils/dateUtils';
import FollowButton from '@/components/ui/buttons/FollowButton/FollowButton';
import useFollow from '@/hooks/interaction/useFollow';
import useStoryLike from '@/hooks/interaction/useStoryLike';
import useFavorite from '@/hooks/interaction/useFavorite';
import useShare from '@/hooks/interaction/useShare';
import { wrapMentions } from '@/utils/textUtils';

type StoryInfoProps = {
	story: ForYouStory;
	isCurrentUser: boolean;
};

const StoryInfo = ({ story, isCurrentUser }: StoryInfoProps) => {
	const isAuth = useSelector(selectAuth);
	const { description, createdAt } = story;
	const { username, displayName, imageUrl, isFollowedBy } = story.user;

	const { isFollowing, loading, handleFollow } = useFollow({
		initIsFollowing: story.user.isFollowing,
		isAuth,
		userId: story.user.id,
	});

	const { likesCount, isLiked, handleLike } = useStoryLike({
		initLikesCount: story.likesCount,
		initIsLiked: story.isLiked,
		isAuth,
		storyId: story.id,
	});

	const { favoritesCount, isFavorited, handleFavorite } = useFavorite({
		initfavoritesCount: story.favoritesCount,
		initIsFavorited: story.isFavorited,
		isAuth,
		storyId: story.id,
	});

	const { sharesCount, isShared, handleShare } = useShare({
		initSharesCount: story.sharesCount,
		initIsShared: story.isShared,
		isAuth,
		storyId: story.id,
	});

	return (
		<div className={styles.StoryInfo}>
			<div className={styles.StoryInfoTop}>
				<Link to={`/@${username}`} className={styles.ImgUserLink}>
					<img src={imageUrl || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
				</Link>
				<div className={styles.UserInfo}>
					<Link to={`/@${username}`} className={styles.UserLink}>
						<span className={styles.Username}>{username}</span>
					</Link>
					<div className={styles.UserInfoBottom}>
						<span className={styles.DisplayName}>{displayName}</span>
						<div className={styles.Dot}></div>
						<span className={styles.StoryDate}>{displayDate(createdAt)}</span>
					</div>
				</div>
				{!isCurrentUser && (
					<FollowButton
						className={styles.FollowBtn}
						isFollowedBy={isFollowedBy}
						isFollowing={isFollowing}
						onFollow={handleFollow}
						loading={loading}
					/>
				)}
			</div>
			<p className={styles.InfoDescr}>{wrapMentions(description, styles.Mention)}</p>
			<div className={styles.InfoMusic}>
				<img src={musicIcon} alt="Music" className={styles.MusicIcon} /> {'Orbital - Halcyon And On And On'}
			</div>
			<div className={styles.StoryInfoBottom}>
				<div className={styles.StoryInfoItem} onClick={handleLike}>
					<LikeIcon className={cn(styles.ItemIcon, isLiked && styles.Liked)} />
					<div className={styles.ItemNumber}>{formatNumber(likesCount)}</div>
				</div>
				<div className={styles.StoryInfoItem} onClick={handleFavorite}>
					<FavoriteIcon className={cn(styles.ItemIcon, isFavorited && styles.Favorited)} />
					<div className={styles.ItemNumber}>{formatNumber(favoritesCount)}</div>
				</div>
				<div className={styles.StoryInfoItem} onClick={handleShare}>
					<ShareIcon className={cn(styles.ItemIcon, isShared && styles.Shared)} />
					<div className={styles.ItemNumber}>{formatNumber(sharesCount)}</div>
				</div>
			</div>
		</div>
	);
};

export default StoryInfo;
