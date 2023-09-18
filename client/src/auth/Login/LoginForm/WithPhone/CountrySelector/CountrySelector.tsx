import React, { useState, useEffect, useRef } from 'react';
import styles from './CountrySelector.module.css';
import arrowDownImg from '@/assets/icons/auth/arrow-down.svg';
import searchImg from '@/assets/icons/search.svg';
import checkImg from '@/assets/icons/auth/check.svg';

type Option = {
	id: string;
	name: string;
	phonePrefix: string;
	abbreviation: string;
};

type CountrySelectorProps = {
	options: Option[];
	selectedOption: Option;
	selectOption: (option: Option) => void;
};

const searchAndSortCountries = (searchArr: Option[], searchTerm: string) => {
	const searchTermLower = searchTerm.toLowerCase();

	const filteredCountries = searchArr.filter((country) => {
		const fullName = `${country.name} ${country.phonePrefix}`.toLowerCase();
		return fullName.includes(searchTermLower);
	});

	const sortedCountries = filteredCountries.sort(
		(a, b) => a.name.toLowerCase().indexOf(searchTermLower) - b.name.toLowerCase().indexOf(searchTermLower),
	);

	return sortedCountries;
};

const escapeRegExp = (str: string) => {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const highlightText = (text: string, searchTerm: string) => {
	if (!searchTerm) {
		return <>{text}</>;
	}

	const escapedSearchTerm = escapeRegExp(searchTerm);
	const regex = new RegExp(`(${escapedSearchTerm})`, 'ig');
	const parts = text.split(regex);

	return parts.map((part, index) =>
		regex.test(part) ? (
			<span key={index} className={styles.Highlight}>
				{part}
			</span>
		) : (
			part
		),
	);
};

const CountrySelector = ({ options, selectedOption, selectOption }: CountrySelectorProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [value, setValue] = useState('');
	const selectHeaderRef = useRef(null);
	const selectBodyRef = useRef(null);

	const sortedOptions = searchAndSortCountries(options, value);

	const handleSelectChange = (option: Option) => {
		selectOption(option);
		setIsOpen(false);
	};

	const toggleSelect = () => {
		setIsOpen(!isOpen);
		setValue('');
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setValue(value);
	};

	const handleClickOutside = (e: MouseEvent) => {
		if (
			selectBodyRef.current &&
			!selectBodyRef.current.contains(e.target) &&
			!selectHeaderRef.current.contains(e.target)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.CountrySelector}>
			<div className={styles.CountrySelectorHeader} onClick={toggleSelect} ref={selectHeaderRef}>
				<span className={styles.SelectorValue}>
					{`${selectedOption.abbreviation} ${selectedOption.phonePrefix}`}
				</span>
				<img
					src={arrowDownImg}
					alt="Arrow down"
					className={[styles.SelectorArrow, isOpen && styles.ArrowUp].join(' ')}
				/>
			</div>
			{isOpen && (
				<div className={styles.CountrySelectorBody} ref={selectBodyRef}>
					<div className={styles.SearchBar}>
						<img src={searchImg} alt="Search" className={styles.SearchIcon} />
						<input
							type="text"
							value={value}
							className={styles.SearchInput}
							placeholder="Search"
							onChange={handleInputChange}
							autoFocus
						/>
					</div>
					<ul className={styles.Options}>
						{sortedOptions.length > 0 ? (
							sortedOptions.map((option) => (
								<li
									className={styles.Option}
									key={option.id}
									onClick={handleSelectChange.bind(this, option)}
								>
									<span>{highlightText(`${option.name} ${option.phonePrefix}`, value)}</span>
									{option.id === selectedOption.id && (
										<img src={checkImg} alt="Check" className={styles.SelectedIcon} />
									)}
								</li>
							))
						) : (
							<li className={styles.NoResultsMessage}>No results found</li>
						)}
					</ul>
				</div>
			)}
		</div>
	);
};

export default CountrySelector;
