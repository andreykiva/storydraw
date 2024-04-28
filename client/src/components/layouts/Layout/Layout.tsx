import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
import Header from '@/components/layouts/Header/Header';
import Sidebar from '@/components/layouts/Sidebar/Sidebar';
import Auth from '@/auth/Auth';
import { selectAuthModalStatus } from '@/features/auth/authSlice';

type LayoutProps = {
	children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	const isAuthOpen = useSelector(selectAuthModalStatus);
	const location = useLocation();
	const excludedSidebarPaths = ['/story/', '/messages', '/settings'];
	const excludedHeaderPaths = ['/story/'];
	const hideHeader = excludedHeaderPaths.some((path) => location.pathname.includes(path));
	const hideSidebar = excludedSidebarPaths.some((path) => location.pathname.includes(path));

	return (
		<>
			{isAuthOpen && <Auth />}
			{!hideHeader && <Header />}
			<div className={styles.LayoutContainer}>
				{!hideSidebar && <Sidebar />}
				<main className={styles.Content}>{children}</main>
			</div>
		</>
	);
};

export default Layout;
