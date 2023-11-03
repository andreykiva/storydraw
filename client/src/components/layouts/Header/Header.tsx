import React from 'react';
import styles from './Header.module.css';
import Logo from '@/components/ui/Logo/Logo';
import SearchBar from '@/components/SearchBar/SearchBar';
import HeaderButtons from './HeaderButtons/HeaderButtons';

//Test
import { setAuth } from '@/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '@/features/auth/authSlice';

const Header = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectAuth);

	return (
		<header className={styles.Header}>
			<Logo />
			<SearchBar />
			<HeaderButtons />
			<div
				className={styles.AuthBtnTest}
				onClick={() => {
					dispatch(setAuth(!isAuth));
				}}
			>
				auth: {isAuth.toString()}
			</div>
		</header>
	);
};

export default Header;
