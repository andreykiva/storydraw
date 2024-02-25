import React, { useState, useRef } from 'react';
import styles from './CountrySelector.module.css';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';
import { searchAndSortCountries } from '@/utils/countryUtils';
import useClickOutside from '@/hooks/useClickOutside';
import SelectorHeader from './SelectorHeader/SelectorHeader';
import SelectorSearchBar from './SelectorSearchBar/SelectorSearchBar';
import SelectorOptions from './SelectorOptions/SelectorOptions';
import type Country from '@/types/Country';

type CountrySelectorProps = {
	options: Country[];
	selectedOption: Country;
	selectOption: (option: Country) => void;
};

const CountrySelector = ({ options, selectedOption, selectOption }: CountrySelectorProps) => {
	const [isOptionsOpen, setIsOptionsOpen] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const countrySelectorRef = useRef<HTMLDivElement>(null);

	const sortedOptions = searchAndSortCountries(options, searchValue);

	useClickOutside(countrySelectorRef, () => {
		setIsOptionsOpen(false);
	});

	const handleSelectChange = (option: Country) => {
		selectOption(option);
		setIsOptionsOpen(false);
	};

	const handleSelectToggle = () => {
		setIsOptionsOpen(!isOptionsOpen);
		setSearchValue('');
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setSearchValue(value);
	};

	return (
		<div className={[authSharedStyles.Selector, styles.CountrySelector].join(' ')} ref={countrySelectorRef}>
			<SelectorHeader
				value={`${selectedOption.abbreviation} ${selectedOption.phonePrefix}`}
				isOpen={isOptionsOpen}
				onClick={handleSelectToggle}
			/>
			{isOptionsOpen && (
				<div className={[authSharedStyles.SelectorBody, styles.CountrySelectorBody].join(' ')}>
					<SelectorSearchBar
						type="text"
						value={searchValue}
						placeholder="Search"
						onChange={handleInputChange}
						autoFocus
					/>
					<SelectorOptions 
						options={sortedOptions}
						selectedOptionId={selectedOption.id}
						searchValue={searchValue}
						handleSelectChange={handleSelectChange}
					/>
				</div>
			)}
		</div>
	);
};

export default CountrySelector;
