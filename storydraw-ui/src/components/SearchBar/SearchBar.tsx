import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
// import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchBar.module.scss';
// import { openSearch, closeSearch } from '@/features/search/searchSlice';
import searchIcon from '@/assets/icons/search.svg';
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
	const [isResultsOpen, setIsResultsOpen] = useState(false);
	const searchInputRef = useRef<HTMLInputElement>(null);
	const param = searchParams.get('q');
	// const [trigger, { data, error, isLoading }] = searchAPI.useLazyFetchSearchResultQuery();

	useEffect(() => {
		if (param) {
			setValue(param);
		}
	}, [param]);

	useClickOutside([searchInputRef], isResultsOpen, () => {
		setIsResultsOpen(false);
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;

		if (newValue.trim()) {
			setValue(newValue);
			setIsResultsOpen(true);
		} else {
			setValue('');
			setIsResultsOpen(false);
		}
	};

	return (
		<div className={cn(styles.SearchBar, light && styles.Light)}>
			<form className={styles.SearchForm}>
				<input
					type="text"
					className={styles.SearchInput}
					value={value}
					onChange={handleChange}
					onFocus={() => setIsResultsOpen(true)}
					placeholder="Search"
					ref={searchInputRef}
				/>
				<Link to={value ? `/search?q=${value}` : window.location.href} className={styles.SearchBtn}>
					<img src={searchIcon} alt="Search" className={styles.SearchIcon} />
				</Link>
			</form>
			{isResultsOpen && <SearchResults results={testResults} />}
		</div>
	);
};

export default SearchBar;
