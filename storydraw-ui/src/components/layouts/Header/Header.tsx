import React from 'react';
import styles from './Header.module.scss';
import Logo from '@/components/ui/Logo/Logo';
import SearchBar from '@/components/SearchBar/SearchBar';
import HeaderButtons from './HeaderButtons/HeaderButtons';

const Header = () => {
	return (
		<header className={styles.Header}>
			<Logo />
			<SearchBar />
			<HeaderButtons />
		</header>
	);
};

export default Header;
