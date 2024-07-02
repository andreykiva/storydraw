import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Sidebar.module.scss';
import Footer from '@/components/layouts/Footer/Footer';
import Nav from './Nav/Nav';
import SidebarAccounts from './SidebarAccounts/SidebarAccounts';
import Button from '@/components/ui/buttons/Button/Button';
import { openAuthModal } from '@/features/auth/authSlice';
import { selectAuth } from '@/features/auth/authSlice';

const Sidebar = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectAuth);

	const handleLogin = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
		} else {
			// Login
		}
	};

	return (
		<div className={styles.Sidebar}>
			<Nav />
			{isAuth ? (
				<div className={styles.SidebarDivider}></div>
			) : (
				<div className={styles.LoginBtnWr}>
					<Button className={styles.LoginBtn} onClick={handleLogin}>
						Log in
					</Button>
				</div>
			)}
			<SidebarAccounts isAuth={isAuth} />
			<Footer />
		</div>
	);
};

export default Sidebar;
