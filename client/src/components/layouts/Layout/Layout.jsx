import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Layout.module.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Auth from '../../../auth/Auth';

const Layout = ({ children }) => {
	const { isAuthOpen } = useSelector((state) => state.auth);
	const location = useLocation();
	const hideHeader = location.pathname.includes('/story/');

	return (
		<>
			{isAuthOpen && <Auth />}
			{!hideHeader && <Header />}
			<div className={styles.LayoutContainer}>
				<Sidebar />
				<main className={styles.Content}>{children}</main>
			</div>
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.any,
};

export default Layout;
