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
			{isAuth ? (
				<img src={defaultImg} alt="User profile" className={styles.ProfileImg} />
			) : (
				<img src={moreIcon} alt="More" className={styles.MoreDots} />
			)}
			<MoreMenu className={styles.MoreMenu} isAuth={isAuth} />
		</button>
	);
};

export default MoreBtn;
