import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MoreBtn.module.css';
import languageIcon from '@/assets/icons/language.svg';
import helpIcon from '@/assets/icons/help.svg';
import darkModeIcon from '@/assets/icons/mode-dark.svg';
import moreIcon from '@/assets/icons/more.svg';
import defaultImg from '@/assets/icons/default.svg';

type MoreBtnProps = {
	isAuth: boolean;
};

const loggedInUserLinks = [
	{
		title: 'View profile',
		icon: defaultImg,
		to: '/',
	},
	{
		title: 'Favorites',
		icon: defaultImg,
		to: '/',
	},
	{
		title: 'Get Coins',
		icon: defaultImg,
		to: '/',
	},
	{
		title: 'Settings',
		icon: defaultImg,
		to: '/',
	},
];

const MoreBtn = ({ isAuth }: MoreBtnProps) => {
	return (
		<button className={styles.MoreBtn}>
			{isAuth ? (
				<img src={defaultImg} alt="User profile" className={styles.ProfileImg} />
			) : (
				<img src={moreIcon} alt="More" className={styles.MoreDots} />
			)}
			<div className={styles.MoreMenu}>
				<div className={styles.MenuTriangle}></div>
				{isAuth &&
					loggedInUserLinks.map((link) => (
						<Link to={link.to} className={styles.MoreMenuItem}>
							<img src={link.icon} alt={link.title} className={styles.ItemIcon} />
							<span className={styles.ItemText}>{link.title}</span>
						</Link>
					))}
				<div className={styles.MoreMenuItem}>
					<img src={languageIcon} alt="Language" className={styles.ItemIcon} />
					<span className={styles.ItemText}>English</span>
				</div>
				<a className={styles.MoreMenuItem}>
					<img src={helpIcon} alt="Help" className={styles.ItemIcon} />
					<span className={styles.ItemText}>Help</span>
				</a>
				<div className={styles.MoreMenuItem}>
					<img src={darkModeIcon} alt="Dark Mode" className={styles.ItemIcon} />
					<span className={styles.ItemText}>Dark Mode</span>
				</div>
				{isAuth && (
					<div className={[styles.MoreMenuItem, styles.Logout].join(' ')}>
						<img src={languageIcon} alt="Language" className={styles.ItemIcon} />
						<span className={styles.ItemText}>Log out</span>
					</div>
				)}
			</div>
		</button>
	);
};

export default MoreBtn;
