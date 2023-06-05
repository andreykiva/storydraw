import React from 'react';
import styles from './Header.module.css';
import Logo from '../Logo/Logo';
import SearchBar from '../SearchBar/SearchBar';
import HeaderBtns from './HeaderBtns/HeaderBtns';

const Header = () => {
	return (
		<header className={styles.Header}>
			<Logo />
			<SearchBar />
			<HeaderBtns />
		</header>
	);
};

export default Header;
