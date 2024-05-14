import React from 'react';
import styles from './ButtonWithActionsMenu.module.css';
import moreIcon from '@/assets/icons/more-horizontal.svg?url';
import ActionItem from './ActionItem/ActionItem';
import WrapperWithTriangle from '../ui/WrapperWithTriangle/WrapperWithTriangle';

type Action = {
	name: string;
	iconComponent: React.ReactNode;
	onClick: () => void;
};

type MenuPosition =
	| 'topLeft'
	| 'topCenter'
	| 'topRight'
	| 'bottomLeft'
	| 'bottomCenter'
	| 'bottomRight'
	| 'leftTop'
	| 'leftCenter'
	| 'leftBottom'
	| 'rightTop'
	| 'rightCenter'
	| 'rightBottom';

type ButtonWithActionsMenuProps = {
	menuPosition: MenuPosition;
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
		<div className={[styles.ActionsBtn, buttonClassName].join(' ')}>
			<img src={moreIcon} alt="More" className={styles.MoreIcon} />
			<WrapperWithTriangle
				position={menuPosition}
				className={[styles.ActionsMenuWrapper, menuClassName].join(' ')}
			>
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
