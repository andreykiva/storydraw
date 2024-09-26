import styles from './ProfileInfoPlaceholder.module.scss';

const ProfileInfoPlaceholder = () => {
	return (
		<div className={styles.ProfileInfoPlaceholder}>
			<div className={styles.TopInfo}>
				<div className={styles.ProfileImg}></div>
				<div className={styles.InfoMain}>
					<div className={styles.Username}></div>
					<div className={styles.DisplayName}></div>
					<div className={styles.FollowBtn}></div>
				</div>
			</div>
			<div className={styles.BottomInfo}>
				<div className={styles.UserStatistics}></div>
				<div className={styles.UserBio}></div>
			</div>
		</div>
	);
};

export default ProfileInfoPlaceholder;
