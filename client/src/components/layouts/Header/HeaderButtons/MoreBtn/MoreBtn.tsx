import React from 'react';
import styles from './MoreBtn.module.css';
import moreIcon from '@/assets/icons/more.svg';
import defaultImg from '@/assets/icons/default.svg';
import MoreMenu from './MoreMenu/MoreMenu';

type MoreBtnProps = {
	isAuth: boolean;
};

const MoreBtn = ({ isAuth }: MoreBtnProps) => {
	return (
		<button className={styles.MoreBtn}>
			<img
				src={isAuth ? defaultImg : moreIcon}
				alt={isAuth ? 'User profile' : 'More'}
				className={styles.MoreBtnImg}
			/>
			<MoreMenu className={styles.MoreMenu} isAuth={isAuth} />
		</button>
	);
};

export default MoreBtn;
