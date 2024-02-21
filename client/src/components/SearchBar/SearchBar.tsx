import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchBar.module.css';
// import { openSearch, closeSearch } from '@/features/search/searchSlice';
import searchIcon from '@/assets/icons/search.svg?url';
import SearchResults from './SearchResults/SearchResults';
import useClickOutside from '@/hooks/useClickOutside';
// import { searchAPI } from '@/services/searchService';

const testResults = [
	{
		id: '1',
		title: 'result 1',
	},
	{
		id: '2',
		title: 'result 2',
	},
	{
		id: '3',
		title: 'result 3',
	},
	{
		id: '4',
		title: 'result 4',
	},
	{
		id: '5',
		title: 'result 5',
	},
];

const SearchBar = ({ light = false }) => {
	// const dispatch = useDispatch();
	// const { isSearchOpen } = useSelector((state) => state.search);
	const [searchParams] = useSearchParams();
	const [value, setValue] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const searchInputRef = useRef<HTMLInputElement>(null);
	const param = searchParams.get('q');
	// const [trigger, { data, error, isLoading }] = searchAPI.useLazyFetchSearchResultQuery();

	useEffect(() => {
		if (param && value !== param) {
			setValue(param);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [param]);

	useClickOutside(searchInputRef, () => {
		setIsOpen(false);
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;

		if (newValue.trim()) {
			setValue(newValue);
			setIsOpen(true);
		} else {
			setValue('');
			setIsOpen(false);
		}
	};

	return (
		<div className={[styles.SearchBar, light ? styles.Light : ''].join(' ')}>
			<form className={styles.SearchForm}>
				<input
					type="text"
					className={styles.SearchInput}
					value={value}
					onChange={handleChange}
					placeholder="Search"
					ref={searchInputRef}
				/>
				<Link to={value ? `/search?q=${value}` : window.location.href} className={styles.SearchBtn}>
					<img src={searchIcon} alt="Search" className={styles.SearchIcon} />
				</Link>
			</form>
			{isOpen && <SearchResults results={testResults} />}
		</div>
	);
};

export default SearchBar;
