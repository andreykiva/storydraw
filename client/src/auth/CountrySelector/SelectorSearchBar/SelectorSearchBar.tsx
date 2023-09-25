import React from 'react';
import styles from './SelectorSearchBar.module.css';
import searchImg from '@/assets/icons/search.svg';

const SelectorSearchBar = (props: React.ComponentProps<'input'>) => {
	return (
		<div className={styles.SelectorSearchBar}>
			<img src={searchImg} alt="Search" className={styles.SearchIcon} />
			<input className={styles.SearchInput} {...props} />
		</div>
	);
};

export default SelectorSearchBar;
