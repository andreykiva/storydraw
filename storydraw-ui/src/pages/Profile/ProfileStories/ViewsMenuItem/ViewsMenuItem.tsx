import React from 'react';
import cn from 'classnames';
import styles from './ViewsMenuItem.module.scss';
import { ReactComponent as LockIcon } from '@/assets/icons/profile/lock.svg';

type ViewsMenuItemProps = {
	children: React.ReactNode;
	active: boolean;
	isPrivate: boolean;
	onClick: () => void;
};

const ViewsMenuItem = ({ children, active, isPrivate, onClick }: ViewsMenuItemProps) => {
	return (
		<div className={cn(styles.ViewsMenuItem, active && styles.Active)} onClick={onClick}>
			{isPrivate && <LockIcon className={styles.LockIcon} />}
			<span>{children}</span>
		</div>
	);
};

export default ViewsMenuItem;
