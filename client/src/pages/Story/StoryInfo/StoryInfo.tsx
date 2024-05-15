import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './StoryInfo.module.scss';
import Button from '@/components/ui/buttons/Button/Button';
import defaultImg from '@/assets/images/default.svg?url';
import musicIcon from '@/assets/icons/music.svg?url';
import LikeIcon from '@/assets/icons/like.svg';
import ShareIcon from '@/assets/icons/share.svg';
import FavoriteIcon from '@/assets/icons/favorites-filled.svg';
import { formatNumber } from '@/utils/numberUtils';
import type Story from '@/types/Story';
import type User from '@/types/User';
import { openAuthModal } from '@/features/auth/authSlice';
import { selectAuth } from '@/features/auth/authSlice';

type StoryInfoProps = Pick<Story, 'description' | 'date' | 'musicName' | 'likes' | 'favorites' | 'share'> & {
	user: Pick<User, 'username' | 'title' | 'image'>;
};

const StoryInfo = (props: StoryInfoProps) => {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectAuth);
	const {
		user: { username, title, image },
		description,
		date,
		musicName,
		likes,
		favorites,
		share,
	} = props;

	const handleFollow = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
		} else {
			// Follow
		}
	};

	const handleLike = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
		} else {
			// Like
		}
	};

	const handleFavorite = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
		} else {
			// Fav
		}
	};

	return (
		<div className={styles.StoryInfo}>
			<div className={styles.StoryInfoTop}>
				<Link to={`/@${username}`} className={styles.ImgUserLink}>
					<img src={image || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
				</Link>
				<div className={styles.UserInfo}>
					<Link to={`/@${username}`} className={styles.UserLink}>
						<span className={styles.Username}>{username}</span>
					</Link>
					<div className={styles.UserInfoBottom}>
						<span className={styles.UserTitle}>{title}</span>
						<div className={styles.Dot}></div>
						<span className={styles.StoryDate}>{date}</span>
					</div>
				</div>
				<Button className={styles.FollowBtn} onClick={handleFollow}>
					Follow
				</Button>
			</div>
			<p className={styles.InfoDescr}>{description}</p>
			<div className={styles.InfoMusic}>
				<img src={musicIcon} alt="Music" className={styles.MusicIcon} /> {musicName}
			</div>
			<div className={styles.StoryInfoBottom}>
				<div className={styles.StoryInfoItem} onClick={handleLike}>
					<LikeIcon className={styles.ItemIcon} />
					<div className={styles.ItemNumber}>{formatNumber(likes)}</div>
				</div>
				<div className={styles.StoryInfoItem} onClick={handleFavorite}>
					<FavoriteIcon className={styles.ItemIcon} />
					<div className={styles.ItemNumber}>{formatNumber(favorites)}</div>
				</div>
				<div className={styles.StoryInfoItem}>
					<ShareIcon className={styles.ItemIcon} />
					<div className={styles.ItemNumber}>{formatNumber(share)}</div>
				</div>
			</div>
		</div>
	);
};

export default StoryInfo;
