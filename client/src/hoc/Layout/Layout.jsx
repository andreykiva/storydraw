import React from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.module.css';
import Header from '../../components/Header/Header';

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<main className={styles.Content}>{children}</main>
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.any
}

export default Layout;
