import React from 'react';
import styles from './ActionsMenu.module.css';
import WrapperWithTriangle from '@/components/ui/WrapperWithTriangle/WrapperWithTriangle';

type ActionsMenuProps = {
	onLike: () => void;
	onDelete: () => void;
	onReport?: () => void;
	likedByMe: boolean;
};

const ActionsMenu = ({ onLike, onDelete, onReport, likedByMe }: ActionsMenuProps) => {
	return (
		<WrapperWithTriangle position="topCenter" className={styles.ActionsMenu}>
			<span className={styles.Action} onClick={onLike}>
				{likedByMe ? 'Unlike' : 'Like'}
			</span>
			<span className={styles.Action} onClick={onDelete}>
				Delete
			</span>
			{onReport && (
				<span className={styles.Action} onClick={onReport}>
					Report
				</span>
			)}
		</WrapperWithTriangle>
	);
};

export default ActionsMenu;
