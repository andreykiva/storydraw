import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SearchResults.module.scss';
import searchIcon from '@/assets/icons/search.svg?url';

type SearchResult = {
	id: string;
	title: string;
};

type SearchResultsProps = {
	results: SearchResult[];
};

const SearchResults = ({ results }: SearchResultsProps) => {
	return (
		<div className={styles.SearchResults}>
			{results.map((res) => (
				<Link to={`/search?q=${res.title}`} className={styles.SearchResult} key={res.id}>
					<img src={searchIcon} alt="Result" className={styles.ResultIcon} />
					<span className={styles.ResultTitle}>{res.title}</span>
				</Link>
			))}
		</div>
	);
};

export default SearchResults;
