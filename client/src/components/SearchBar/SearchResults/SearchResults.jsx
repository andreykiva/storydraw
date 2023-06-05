import React from 'react';
import styles from './SearchResults.module.css';
import searchImg from '../../../assets/icons/search.svg';

const SearchResults = ({ results }) => {
	return (
		<ul className={styles.SearchResults}>
			{results.map((res) => (
				<li className={styles.SearchResult} key={res.id}>
					<img src={searchImg} alt="Result" className={styles.ResultIcon} />
					<span className={styles.ResultTitle}>{res.title}</span>
				</li>
			))}
		</ul>
	);
};

export default SearchResults;
