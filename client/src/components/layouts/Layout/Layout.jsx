import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Layout.module.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const Layout = ({ children }) => {
	const location = useLocation();
	const hideHeader = location.pathname.includes('/story/');

	return (
		<>
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
