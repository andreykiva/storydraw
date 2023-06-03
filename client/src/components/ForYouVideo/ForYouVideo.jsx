import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ForYouVideo.module.css';
import defaultImg from '../../assets/icons/default.svg';
import previewImg from '../../assets/images/preview.jpg';
import musicImg from '../../assets/icons/music.svg';
import Button from '../../UI/Button/Button';
import LikeIcon from '../../UI/icons/LikeIcon';
import CommentIcon from '../../UI/icons/CommentIcon';
import FavoriteIcon from '../../UI/icons/FavoriteIcon';
import ShareIcon from '../../UI/icons/ShareIcon';

const ForYouVideo = (props) => {
	const {
		userId,
		username,
		userTitle,
		userImage,
		video,
		description,
		musicName,
		musicId,
		tags,
		likes,
		comments,
		favorites,
		share,
	} = props;

	return (
		<div className={styles.ForYouVideo}>
			<div className={styles.VideoHeader}>
				<div className={styles.HeaderImg}>
					<img src={userImage || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
				</div>
				<div className={styles.HeaderInfo}>
					<div className={styles.HeaderInfoTop}>
						<div className={styles.InfoUsername}>{username}</div>
						<div className={styles.InfoTitle}>{userTitle}</div>
					</div>
					<p className={styles.InfoDescr}>
						<span className={styles.DescrText}>{description}</span>
						{tags.map((tag) => (
							<Link to={'/tag/' + tag} key={tag} className={styles.Tag}>
								#{tag}
							</Link>
						))}
					</p>
					<div className={styles.InfoMusic}>
						<img src={musicImg} alt="Music" className={styles.MusicIcon} /> {musicName}
					</div>
				</div>
				<Button className={styles.FollowBtn}>Follow</Button>
			</div>
			<div className={styles.VideoWrapper}>
				<img src={video || previewImg} alt="Video" className={styles.Video} />
				<div className={styles.VideoInfo}>
					<div className={styles.VideoInfoItem}>
						<LikeIcon className={styles.ItemIcon} />
						<div className={styles.ItemNumber}>99k</div>
					</div>
					<div className={styles.VideoInfoItem}>
						<CommentIcon className={styles.ItemIcon} />
						<div className={styles.ItemNumber}>{comments}</div>
					</div>
					<div className={styles.VideoInfoItem}>
						<FavoriteIcon className={styles.ItemIcon} />
						<div className={styles.ItemNumber}>{favorites}</div>
					</div>
					<div className={styles.VideoInfoItem}>
						<ShareIcon className={styles.ItemIcon} />
						<div className={styles.ItemNumber}>{share}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ForYouVideo;
