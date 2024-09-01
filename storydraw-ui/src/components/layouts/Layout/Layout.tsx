import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from './Layout.module.scss';
import Header from '@/components/layouts/Header/Header';
import Sidebar from '@/components/layouts/Sidebar/Sidebar';
import Auth from '@/auth/Auth';
import { selectAuthModalStatus } from '@/features/auth/authSlice';
import Report from '@/components/Report/Report';
import { selectReportStatus } from '@/features/report/reportSlice';

type LayoutProps = {
	children: React.ReactNode;
};

// add /create

const Layout = ({ children }: LayoutProps) => {
	const isAuthOpen = useSelector(selectAuthModalStatus);
	const isReportOpen = useSelector(selectReportStatus);
	const location = useLocation();
	const excludedSidebarPaths = ['/story/', '/messages', '/settings', '/subscribe'];
	const excludedHeaderPaths = ['/story/', '/subscribe'];
	const hideHeader = excludedHeaderPaths.some((path) => location.pathname.includes(path));
	const hideSidebar = excludedSidebarPaths.some((path) => location.pathname.includes(path));

	return (
		<>
			{isAuthOpen && <Auth />}
			{!hideHeader && <Header />}
			{isReportOpen && <Report />}
			<div className={cn(styles.LayoutContainer, !hideHeader && styles.WithHeader)}>
				{!hideSidebar && <Sidebar />}
				<main className={styles.Content}>{children}</main>
			</div>
		</>
	);
};

export default Layout;
