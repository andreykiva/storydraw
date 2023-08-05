import React from 'react';
import { Link } from 'react-router-dom';
import styles from './StoryInfo.module.css';
import Button from '../../../UI/Button/Button';
import defaultImg from '../../../assets/icons/default.svg';
import musicImg from '../../../assets/icons/music.svg';
import LikeIcon from '../../../UI/icons/LikeIcon';
import ShareIcon from '../../../UI/icons/ShareIcon';
import FavoriteIcon from '../../../UI/icons/FavoriteIcon';
import { formatNumber } from '../../../utils/numberUtils';

const StoryInfo = (props) => {
	const {
		user: { username, title, image },
		description,
		date,
		musicName,
		likes,
		favorites,
		share,
	} = props;

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
