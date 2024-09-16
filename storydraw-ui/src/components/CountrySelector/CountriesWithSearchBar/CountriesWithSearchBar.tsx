import { useState } from 'react';
import styles from './CountriesWithSearchBar.module.scss';
import { searchAndSortCountries } from '@/utils/countriesUtils';
import SelectorSearchBar from './SelectorSearchBar/SelectorSearchBar';
import SelectorOptions from './SelectorOptions/SelectorOptions';
import type Country from '@/types/Country';
import countries from '@/data/countries';

type CountriesWithSearchBarProps = {
	selectedOption: Country;
	onSelectOption: (option: Country) => void;
	showPhonePrefix: boolean;
};

const CountriesWithSearchBar = (props: CountriesWithSearchBarProps) => {
	const { selectedOption, onSelectOption, showPhonePrefix } = props;
	const [searchValue, setSearchValue] = useState('');

	const sortedOptions = searchAndSortCountries(countries, searchValue);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setSearchValue(value);
	};

	return (
		<div className={styles.CountriesWithSearchBar}>
			<SelectorSearchBar
				type="text"
				value={searchValue}
				placeholder="Search"
				onChange={handleChangeInput}
				autoFocus
			/>
			<SelectorOptions
				options={sortedOptions}
				selectedOptionId={selectedOption.id}
				searchValue={searchValue}
				onChangeSelect={onSelectOption}
				showPhonePrefix={showPhonePrefix}
			/>
		</div>
	);
};

export default CountriesWithSearchBar;
