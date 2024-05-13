import React from 'react';
import styles from './ButtonWithMoreMenu.module.css';
import moreIcon from '@/assets/icons/more.svg?url';
import defaultImg from '@/assets/images/default.svg?url';
import MoreMenu from './MoreMenu/MoreMenu';

type ButtonWithMoreMenuProps = {
	isAuth: boolean;
};

const ButtonWithMoreMenu = ({ isAuth }: ButtonWithMoreMenuProps) => {
	return (
		<div className={styles.ButtonWithMoreMenu}>
			<div className={styles.ButtonInner}>
				<img
					src={isAuth ? defaultImg : moreIcon}
					alt={isAuth ? 'User profile' : 'More'}
					className={styles.MoreIcon}
				/>
			</div>
			<MoreMenu className={styles.MoreMenu} isAuth={isAuth} />
		</div>
	);
};

export default ButtonWithMoreMenu;
