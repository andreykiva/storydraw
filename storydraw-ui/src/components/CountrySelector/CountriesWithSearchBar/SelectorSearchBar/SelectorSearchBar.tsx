import styles from './SelectorSearchBar.module.scss';
import searchIcon from '@/assets/icons/search.svg';

const SelectorSearchBar = (props: React.ComponentProps<'input'>) => {
	return (
		<div className={styles.SelectorSearchBar}>
			<img src={searchIcon} alt="Search" className={styles.SearchIcon} />
			<input className={styles.SearchInput} {...props} />
		</div>
	);
};

export default SelectorSearchBar;
