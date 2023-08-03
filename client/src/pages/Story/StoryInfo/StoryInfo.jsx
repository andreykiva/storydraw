import React from 'react';
import styles from './StoryInfo.module.css';
import Button from '../../../UI/Button/Button';
import defaultImg from '../../../assets/icons/default.svg';
import musicImg from '../../../assets/icons/music.svg';
import LikeIcon from '../../../UI/icons/LikeIcon';
import CommentIcon from '../../../UI/icons/CommentIcon';
import FavoriteIcon from '../../../UI/icons/FavoriteIcon';
import { formatNumber } from '../../../utils/numberUtils';

const StoryInfo = (props) => {
	const { user: { username, title, image }, description, date, musicName, likes, comments, favorites } = props;

	return (
		<div className={styles.StoryInfo}>
			<div className={styles.StoryInfoTop}>
				<img src={image || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
				<div className={styles.UserInfo}>
					<h6 className={styles.Username}>{username}</h6>
					<div className={styles.UserInfoBottom}>
						<span className={styles.UserTitle}>{title}</span>
						<div className={styles.Dot}></div>
						<span className={styles.StoryDate}>{date}</span>
					</div>
				</div>
				<Button className={styles.FollowBtn}>Follow</Button>
			</div>
			<p className={styles.InfoDescr}>{description}</p>
			<div className={styles.InfoMusic}>
				<img src={musicImg} alt="Music" className={styles.MusicIcon} /> {musicName}
			</div>
			<div className={styles.StoryInfoBottom}>
				<div className={styles.StoryInfoItem}>
					<LikeIcon className={styles.ItemIcon} />
					<div className={styles.ItemNumber}>{formatNumber(likes)}</div>
				</div>
				<div className={styles.StoryInfoItem}>
					<CommentIcon className={styles.ItemIcon} />
					<div className={styles.ItemNumber}>{formatNumber(comments)}</div>
				</div>
				<div className={styles.StoryInfoItem}>
					<FavoriteIcon className={styles.ItemIcon} />
					<div className={styles.ItemNumber}>{formatNumber(favorites)}</div>
				</div>
			</div>
		</div>
	);
};

export default StoryInfo;
