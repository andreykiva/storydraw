import React from 'react';
import styles from './ForYouVideo.module.css';
import defaultImg from '../../assets/icons/default.svg';
import previewImg from '../../assets/images/preview.jpg';

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
						<span className={styles.DescrTags}>
							{tags.map((tag) => (
								<a key={tag} className={styles.Tag}>
									#{tag}
								</a>
							))}
						</span>
					</p>
					<div className={styles.InfoMusic}>{musicName}</div>
				</div>
				<button className={styles.FollowBtn}>Follow</button>
			</div>
			<div>
				<img src={video || previewImg} alt="Video" className={styles.Video} />
			</div>
		</div>
	);
};

export default ForYouVideo;
