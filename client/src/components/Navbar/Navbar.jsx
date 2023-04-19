import React from 'react';
import styles from './Navbar.module.css';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
// import NavItems from './NavigationItems/NavItems';

const Navbar = () => {
	return (
		<header className={styles.Navbar}>
			<Logo />
			<Search />
			<nav className={styles.Nav}>
				{/* <NavItems /> */}
			</nav>
		</header>
	);
};

export default Navbar;
