import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchBar.module.css';
import { changeSearchValue } from '../../store/reducers/search/searchSlice';
import searchImg from '../../assets/icons/search.svg';
import SearchResults from './SearchResults/SearchResults';
// import { searchAPI } from '../../services/searchService';

const testResults = [
	{
		id: 1,
		title: 'result 1',
	},
	{
		id: 2,
		title: 'result 2',
	},
	{
		id: 3,
		title: 'result 3',
	},
	{
		id: 4,
		title: 'result 4',
	},
	{
		id: 5,
		title: 'result 5',
	},
];

const SearchBar = () => {
	const { isOpen, value } = useSelector((state) => state.search);
	const dispatch = useDispatch();
	// const [trigger, { data, error, isLoading }] = searchAPI.useLazyFetchSearchResultQuery();

	const handlerChange = (e) => {
		dispatch(changeSearchValue(e.target.value));
	};

	return (
		<div className={styles.SearchBar}>
			<form className={styles.SearchForm}>
				<input
					type="text"
					className={styles.SearchInput}
					value={value}
					onChange={handlerChange}
					placeholder="Search"
				/>
				<Link to={value ? `/search?q=${value}` : window.location.href} className={styles.SearchBtn}>
					<img src={searchImg} alt="Search" className={styles.SearchIcon} />
				</Link>
			</form>
			{isOpen && <SearchResults results={testResults} />}
		</div>
	);
};

export default SearchBar;
