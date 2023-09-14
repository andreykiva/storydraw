import React from 'react';
import styles from './Sidebar.module.css';
import Footer from '@/components/layouts/Footer/Footer';
import Nav from './Nav/Nav';
import Suggested from './Suggested/Suggested';
import Button from '@/components/ui/buttons/Button/Button';

const Sidebar = () => {
	return (
		<div className={styles.Sidebar}>
			<Nav />
			<div className={styles.LoginBtnWr}>
				<Button className={styles.LoginBtn}>Log in</Button>
			</div>
			<Suggested />
			<Footer />
		</div>
	);
};

export default Sidebar;
