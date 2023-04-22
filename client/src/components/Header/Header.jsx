import React from 'react';
import styles from './Header.module.css';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import HeaderBtns from './HeaderBtns/HeaderBtns';

const Header = () => {
	return (
		<header className={styles.Header}>
			<Logo />
			<Search />
			<HeaderBtns />
		</header>
	);
};

export default Header;
