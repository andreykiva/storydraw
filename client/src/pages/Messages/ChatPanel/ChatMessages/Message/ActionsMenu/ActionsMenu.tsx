import React from 'react';
import styles from './ActionsMenu.module.css';

type ActionsMenuProps = {
	onLike: () => void;
	onDelete: () => void;
	onReport?: () => void;
};

const ActionsMenu = ({ onLike, onDelete, onReport }: ActionsMenuProps) => {
	return (
		<div className={styles.ActionsMenu}>
			<div className={styles.PromptTriangle}></div>
			<span className={styles.Action} onClick={onLike}>Like</span>
			<span className={styles.Action} onClick={onDelete}>Delete</span>
			{onReport && <span className={styles.Action} onClick={onReport}>Report</span>}
		</div>
	);
};

export default ActionsMenu;
