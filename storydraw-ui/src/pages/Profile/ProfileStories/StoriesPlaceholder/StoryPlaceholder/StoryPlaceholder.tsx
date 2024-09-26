import styles from './StoryPlaceholder.module.scss';

const StoryPlaceholder = () => {
	return (
		<div className={styles.StoryPlaceholder}>
			<div className={styles.ProfileStoryContent}></div>
			<div className={styles.InfoDescr}></div>
		</div>
	);
};

export default StoryPlaceholder;
