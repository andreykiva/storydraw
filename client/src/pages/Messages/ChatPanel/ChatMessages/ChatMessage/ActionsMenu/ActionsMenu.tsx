import React from 'react';
import styles from './ActionsMenu.module.css';

type ActionsMenuProps = {
	onLike: () => void;
	onDelete: () => void;
	onReport?: () => void;
	likedByMe: boolean;
};

const ActionsMenu = ({ onLike, onDelete, onReport, likedByMe }: ActionsMenuProps) => {
	return (
		<div className={styles.ActionsMenu}>
			<div className={styles.PromptTriangle}></div>
			<span className={styles.Action} onClick={onLike}>{likedByMe ? 'Unlike' : 'Like'}</span>
			<span className={styles.Action} onClick={onDelete}>Delete</span>
			{onReport && <span className={styles.Action} onClick={onReport}>Report</span>}
		</div>
	);
};

export default ActionsMenu;
