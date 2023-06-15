import React from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.module.css';
import Header from '../../layouts/Header/Header';
import Sidebar from '../../layouts/Sidebar/Sidebar';

const Layout = ({ children }) => {
	return (
		<>
			<Header />
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
