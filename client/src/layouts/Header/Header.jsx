import React from 'react';
import styles from './Header.module.css';
import Logo from '../../components/Logo/Logo';
import SearchBar from '../../components/SearchBar/SearchBar';
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
