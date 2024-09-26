import styles from './StoryPlaceholder.module.scss';

const StoryPlaceholder = () => {
	return (
		<div className={styles.StoryPlaceholder}>
			<div className={styles.StoryHeader}>
				<div className={styles.ProfileImg}></div>
				<div className={styles.HeaderInfo}>
					<div className={styles.HeaderInfoUser}></div>
					<div className={styles.InfoDescr}></div>
					<div className={styles.InfoMusic}></div>
				</div>
			</div>
			<div className={styles.Story}></div>
		</div>
	);
};

export default StoryPlaceholder;
