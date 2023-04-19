import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Search.module.css';
import { openSearch, changeSearchValue } from '../../store/reducers/search/searchSlice';
import searchImg from '../../assets/icons/search.svg';
// import { searchAPI } from '../../services/searchService'; 

const Search = () => {
	const { isOpen, value } = useSelector((state) => state.search);
	const dispatch = useDispatch();
	// const [trigger, { data, error, isLoading }] = searchAPI.useLazyFetchSearchResultQuery();

	const handlerChange = (e) => {
		dispatch(changeSearchValue(e.target.value));
	};

	return (
		<div className={styles.Search}>
			<form className={styles.SearchForm}>
				<input type="text" className={styles.SearchInput} value={value} onChange={handlerChange} placeholder='Search' />
				<button className={styles.SearchBtn}>
					<img src={searchImg} alt="Search" className={styles.SearchIcon} />
				</button>
			</form>
		</div>
	);
};

export default Search;
