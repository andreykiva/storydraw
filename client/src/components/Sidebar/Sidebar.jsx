import React from 'react';
import styles from './Sidebar.module.css';
import Footer from '../Footer/Footer';
import Nav from './Nav/Nav';
import Suggested from './Suggested/Suggested';

const Sidebar = () => {
	return (
		<div className={styles.Sidebar}>
			<Nav />
			<div className={styles.LoginBtnWr}>
				<button className={styles.LoginBtn}>Log in</button>
			</div>
			<Suggested />
			<Footer />
		</div>
	);
};

export default Sidebar;
