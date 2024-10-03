import styles from './RelationsItemPlaceholder.module.scss';

const RelationsItemPlaceholder = () => {
	return (
		<div className={styles.RelationsItemPlaceholder}>
			<div className={styles.UserImg} />
			<div className={styles.UserInfo}>
				<div className={styles.DisplayName}></div>
				<div className={styles.Username}></div>
			</div>
		</div>
	);
};

export default RelationsItemPlaceholder;
