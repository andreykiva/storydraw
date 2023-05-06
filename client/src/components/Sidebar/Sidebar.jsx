import React from 'react';
import styles from './Sidebar.module.css';
import Footer from '../Footer/Footer';
import Nav from './Nav/Nav';
import RecList from './RecList/RecList';

const Sidebar = () => {
	return (
		<div className={styles.Sidebar}>
			<Nav />
			{/* <button className={styles.LoginBtn}>Login</button> */}
			{/* <RecList /> */}
			{/* <Footer /> */}
		</div>
	);
};

export default Sidebar;
