import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ForYouStory.module.scss';
import defaultImg from '@/assets/images/default.svg?url';
import previewImg from '@/assets/images/preview.jpg';
import musicIcon from '@/assets/icons/music.svg?url';
import Button from '@/components/ui/buttons/Button/Button';
import LikeIcon from '@/assets/icons/like.svg';
import CommentIcon from '@/assets/icons/comment.svg';
import FavoriteIcon from '@/assets/icons/favorites-filled.svg';
import ShareIcon from '@/assets/icons/share.svg';
import { formatNumber } from '@/utils/formatUtils';
import type Story from '@/types/Story';
import type User from '@/types/User';
import { openAuthModal } from '@/features/auth/authSlice';
import { selectAuth } from '@/features/auth/authSlice';
import ReportIcon from '@/assets/icons/report.svg';
import { openReport } from '@/features/report/reportSlice';
import ButtonWithActionsMenu from '@/components/ButtonWithActionsMenu/ButtonWithActionsMenu';
import { MENU_POSITION } from '@/constants/position';

type ForYouStoryProps = Omit<Story, 'date' | 'views'> & {
	user: Omit<User, 'description' | 'followers'>;
};

const ForYouStory = (props: ForYouStoryProps) => {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectAuth);
	const { id, user, story, description, musicName, tags, likes, comments, favorites, share } = props; // + musicId

	const handleFollow = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
		} else {
			// Login
		}
	};

	const handleLike = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
		} else {
			// Like
		}
	};

	const handleComment = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
		} else {
			// Comment
		}
	};

	const handleFavorite = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
		} else {
			// Fav
		}
	};

	const handleOpenReport = () => {
		dispatch(openReport({ type: 'story', targetId: id }));
	};

	const actions = [
		{
			name: 'Report',
			iconComponent: <ReportIcon />,
			onClick: handleOpenReport,
		},
	];

	return (
		<div className={styles.ForYouStory}>
			<div className={styles.StoryHeader}>
				<Link to={`/@${user.username}`} className={styles.UserLink}>
					<img src={user.image || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
				</Link>
				<div className={styles.HeaderInfo}>
					<Link to={`/@${user.username}`} className={styles.HeaderInfoUser}>
						<span className={styles.InfoUsername}>{user.username}</span>
						<span className={styles.InfoTitle}>{user.title}</span>
					</Link>
					<p className={styles.InfoDescr}>
						<span className={styles.DescrText}>{description}</span>
						{tags.map((tag) => (
							<Link to={'/tag/' + tag} key={tag} className={styles.Tag}>
								#{tag}
							</Link>
						))}
					</p>
					<div className={styles.InfoMusic}>
						<img src={musicIcon} alt="Music" className={styles.MusicIcon} /> {musicName}
					</div>
				</div>
				<Button className={styles.FollowBtn} onClick={handleFollow}>
					Follow
				</Button>
			</div>
			<div className={styles.StoryWrapper}>
				<Link to={`/@${user.username}/story/${id}`} className={styles.StoryLink}>
					<img src={story || previewImg} alt="Story" className={styles.Story} />
				</Link>
				<div className={styles.StoryPanel}>
					<div className={styles.PanelItem} onClick={handleLike}>
						<LikeIcon className={styles.ItemIcon} />
						<div className={styles.ItemNumber}>{formatNumber(likes)}</div>
					</div>
					<div className={styles.PanelItem} onClick={handleComment}>
						<CommentIcon className={styles.ItemIcon} />
						<div className={styles.ItemNumber}>{formatNumber(comments)}</div>
					</div>
					<div className={styles.PanelItem} onClick={handleFavorite}>
						<FavoriteIcon className={styles.ItemIcon} />
						<div className={styles.ItemNumber}>{formatNumber(favorites)}</div>
					</div>
					<div className={styles.PanelItem}>
						<ShareIcon className={styles.ItemIcon} />
						<div className={styles.ItemNumber}>{formatNumber(share)}</div>
					</div>
					<ButtonWithActionsMenu
						actions={actions}
						menuPosition={MENU_POSITION.BOTTOM_LEFT}
						menuClassName={styles.ActionsMenu}
					/>
				</div>
			</div>
		</div>
	);
};

export default ForYouStory;
