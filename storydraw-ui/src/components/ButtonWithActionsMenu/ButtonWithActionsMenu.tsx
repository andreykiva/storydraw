import React from 'react';
import cn from 'classnames';
import styles from './ButtonWithActionsMenu.module.scss';
import moreIcon from '@/assets/icons/more-horizontal.svg?url';
import ActionItem from './ActionItem/ActionItem';
import WrapperWithTriangle from '../ui/WrapperWithTriangle/WrapperWithTriangle';
import { MENU_POSITION } from '@/constants/ui';

type Action = {
	name: string;
	iconComponent: React.ReactNode;
	onClick: () => void;
};

type ButtonWithActionsMenuProps = {
	menuPosition: MENU_POSITION;
	actions: Action[];
	buttonClassName?: string;
	menuClassName?: string;
};

const ButtonWithActionsMenu = ({
	actions,
	menuPosition,
	buttonClassName,
	menuClassName,
}: ButtonWithActionsMenuProps) => {
	return (
		<div className={cn(styles.ActionsBtn, buttonClassName)}>
			<img src={moreIcon} alt="More" className={styles.MoreIcon} />
			<WrapperWithTriangle position={menuPosition} className={cn(styles.ActionsMenuWrapper, menuClassName)}>
				<ul className={styles.ActionsMenu}>
					{actions.map((action) => (
						<ActionItem
							key={action.name}
							name={action.name}
							iconComponent={action.iconComponent}
							onClick={action.onClick}
						/>
					))}
				</ul>
			</WrapperWithTriangle>
		</div>
	);
};

export default ButtonWithActionsMenu;
