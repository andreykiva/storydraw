import React from 'react';
import styles from './Sidebar.module.css';
import Footer from '../Footer/Footer';
import Nav from './Nav/Nav';
import Suggested from './Suggested/Suggested';
import Button from '../../ui/Button/Button';

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
