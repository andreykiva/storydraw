import styles from './StoryInfoPlaceholder.module.scss';

const StoryInfoPlaceholder = () => {
	return (
		<div className={styles.StoryInfoPlaceholder}>
			<div className={styles.StoryInfoTop}>
				<div className={styles.ProfileImg}></div>
				<div className={styles.UserInfo}>
					<div className={styles.Username}></div>
					<div className={styles.UserInfoBottom}></div>
				</div>
			</div>
			<p className={styles.InfoDescr}></p>
			<div className={styles.InfoMusic}></div>
			<div className={styles.StoryInfoBottom}></div>
		</div>
	);
};

export default StoryInfoPlaceholder;
