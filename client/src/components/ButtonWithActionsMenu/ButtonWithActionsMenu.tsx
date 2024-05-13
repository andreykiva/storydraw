import React from 'react';
import styles from './ButtonWithActionsMenu.module.css';
import moreIcon from '@/assets/icons/more-horizontal.svg?url';
import ActionItem from './ActionItem/ActionItem';

type Action = {
	name: string;
	iconComponent: React.ReactNode;
	onClick: () => void;
};

type ButtonWithActionsMenuProps = {
	menuPos?: 'left' | 'right';
	actions: Action[];
	className?: string;
};

const ButtonWithActionsMenu = ({ actions, menuPos = 'left', className }: ButtonWithActionsMenuProps) => {
	return (
		<div className={[styles.ActionsBtn, className].join(' ')}>
			<img src={moreIcon} alt="More" className={styles.MoreIcon} />
			<ul className={[styles.ActionsMenu, menuPos === 'right' && styles.Right].join(' ')}>
				<div className={styles.MenuTriangle}></div>
				{actions.map((action) => (
					<ActionItem
						key={action.name}
						name={action.name}
						iconComponent={action.iconComponent}
						onClick={action.onClick}
					/>
				))}
			</ul>
		</div>
	);
};

export default ButtonWithActionsMenu;
