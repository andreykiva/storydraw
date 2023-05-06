import React from 'react';
import styles from './Nav.module.css';
import { NavLink } from 'react-router-dom';

const Nav = () => {
	return (
		<nav className={styles.Nav}>
			<ul>
				<li className={styles.NavItem}>
					<NavLink
						to="/"
						className={(isActive) => styles.NavLink + (isActive.isActive ? ` ${styles.ActiveLink}` : '')}
					>
						<svg
							className={styles.NavLinkIcon}
							width="24px"
							height="24px"
							viewBox="0 0 24 24"
							fill="#ffffff"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12.39 20.87a.696.696 0 0 1-.78 0C9.764 19.637 2 14.15 2 8.973c0-6.68 7.85-7.75 10-3.25 2.15-4.5 10-3.43 10 3.25 0 5.178-7.764 10.664-9.61 11.895z"
							/>
						</svg>
						<span>For You</span>
					</NavLink>
				</li>
				<li className={styles.NavItem}>
					<NavLink
						to="/following"
						className={(isActive) => styles.NavLink + (isActive.isActive ? ` ${styles.ActiveLink}` : '')}
					>
						<svg
							className={styles.NavLinkIcon}
							fill="#ffffff"
							width="24px"
							height="24px"
							viewBox="0 0 56 56"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M 28.0117 27.3672 C 33.0508 27.3672 37.3867 22.8672 37.3867 17.0078 C 37.3867 11.2187 33.0274 6.9297 28.0117 6.9297 C 22.9961 6.9297 18.6367 11.3125 18.6367 17.0547 C 18.6367 22.8672 22.9961 27.3672 28.0117 27.3672 Z M 13.2930 49.0703 L 42.7305 49.0703 C 46.4101 49.0703 47.7226 48.0156 47.7226 45.9531 C 47.7226 39.9062 40.1523 31.5625 28.0117 31.5625 C 15.8477 31.5625 8.2774 39.9062 8.2774 45.9531 C 8.2774 48.0156 9.5898 49.0703 13.2930 49.0703 Z" />
						</svg>
						<span>Following</span>
					</NavLink>
				</li>
				<li className={styles.NavItem}>
					<NavLink
						to="/explore"
						className={(isActive) => styles.NavLink + (isActive.isActive ? ` ${styles.ActiveLink}` : '')}
					>
						<svg
							className={styles.NavLinkIcon}
							fill="#ffffff"
							width="24px"
							height="24px"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M17.9842695,7.39078625 C18.1985588,6.64477525 17.4973604,5.9435768 16.7513494,6.1578661 L16.6494246,6.19284365 L9.57835679,9.02127078 L9.47282273,9.07079854 C9.30957453,9.15937167 9.17428758,9.29167162 9.08209683,9.45256344 L9.02127078,9.57835679 L6.19284365,16.6494246 L6.1578661,16.7513494 C5.9435768,17.4973604 6.64477525,18.1985588 7.39078625,17.9842695 L7.49271102,17.949292 L14.5637788,15.1208648 L14.6693129,15.0713371 C14.8325611,14.982764 14.967848,14.850464 15.0600388,14.6895722 L15.1208648,14.5637788 L17.949292,7.49271102 L17.9842695,7.39078625 Z M12,10 C13.1045695,10 14,10.8954305 14,12 C14,13.1045695 13.1045695,14 12,14 C10.8954305,14 10,13.1045695 10,12 C10,10.8954305 10.8954305,10 12,10 Z"
							/>
						</svg>
						<span>Explore</span>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
