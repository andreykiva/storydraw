import styles from './CommentPlaceholder.module.scss';

const CommentPlaceholder = () => {
	return (
		<div className={styles.CommentPlaceholder}>
			<div className={styles.ProfileImg} />
			<div className={styles.CommentContent}>
				<div className={styles.DisplayName}></div>
				<div className={styles.CommentText}></div>
				<div className={styles.BottomInfo}></div>
			</div>
		</div>
	);
};

export default CommentPlaceholder;
