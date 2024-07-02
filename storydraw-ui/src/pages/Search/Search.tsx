import React, { useEffect } from 'react';
import { useSearchParams, Routes, Route, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Search.module.scss';
import { search } from '@/features/search/searchSlice';
import SearchTop from './SearchTop/SearchTop';
import SearchAccounts from './SearchAccounts/SearchAccounts';
import SearchStories from './SearchStories/SearchStories';

const Search = () => {
	const [searchParams] = useSearchParams();
	const searchParam = searchParams.get('q') || '';
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(search(searchParam));
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
			title: 'Stories',
			to: `/search/story?q=${searchParam}`,
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
					<Route path="/story" element={<SearchStories />} />
				</Routes>
			</div>
		</div>
	);
};

export default Search;
