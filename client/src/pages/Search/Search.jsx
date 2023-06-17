import React, { useEffect } from 'react';
import { useSearchParams, Routes, Route, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Search.module.css';
import { search } from '../../store/reducers/search/searchSlice';
import SearchTop from './SearchTop/SearchTop';
import SearchAccounts from './SearchAccounts/SearchAccounts';
import SearchVideos from './SearchVideos/SearchVideos';

const Search = () => {
	const [searchParams] = useSearchParams();
	const searchParam = searchParams.get('q') || '';
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(search(searchParam));
	}, [searchParam]);

	const links = [
		{
			title: 'Best',
			to: `/search?q=${searchParam}`,
		},
		{
			title: 'Accounts',
			to: `/search/user?q=${searchParam}`,
		},
		{
			title: 'Video',
			to: `/search/video?q=${searchParam}`,
		},
	];

	return (
		<div className={styles.Search}>
			<div className={styles.SearchTypes}>
				{links.map((link) => (
					<NavLink
						key={link.title}
						to={link.to}
						end
						className={(isActive) => styles.SearchType + (isActive.isActive ? ` ${styles.ActiveType}` : '')}
					>
						{link.title}
					</NavLink>
				))}
			</div>
			<div className={styles.SearchContent}>
				<Routes>
					<Route path="/" element={<SearchTop />} />
					<Route path="/user" element={<SearchAccounts />} />
					<Route path="/video" element={<SearchVideos />} />
				</Routes>
			</div>
		</div>
	);
};

export default Search;
