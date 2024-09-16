import { useState, useRef } from 'react';
import cn from 'classnames';
import styles from './CountrySelector.module.scss';
import useClickOutside from '@/hooks/useClickOutside';
import SelectorHeader from './SelectorHeader/SelectorHeader';
import type Country from '@/types/Country';
import CountriesWithSearchBar from './CountriesWithSearchBar/CountriesWithSearchBar';

type CountrySelectorProps = {
	selectedOption: Country;
	selectOption: (option: Country) => void;
	showPhonePrefix?: boolean;
};

const CountrySelector = (props: CountrySelectorProps) => {
	const [isOptionsOpen, setIsOptionsOpen] = useState(false);
	const countrySelectorRef = useRef<HTMLDivElement>(null);
	const { selectedOption, selectOption, showPhonePrefix = false } = props;

	useClickOutside([countrySelectorRef], isOptionsOpen, () => {
		setIsOptionsOpen(false);
	});

	const handleChangeSelect = (option: Country) => {
		selectOption(option);
		setIsOptionsOpen(false);
	};

	const handleToggleSelect = () => {
		setIsOptionsOpen(!isOptionsOpen);
	};

	let showedValue = selectedOption.name;

	if (showPhonePrefix) {
		showedValue = `${selectedOption.abbreviation} ${selectedOption.phonePrefix}`;
	}

	return (
		<div className={cn(styles.CountrySelector, showPhonePrefix && styles.WithPhone)} ref={countrySelectorRef}>
			<SelectorHeader value={showedValue} isOpen={isOptionsOpen} onClick={handleToggleSelect} />
			{isOptionsOpen && (
				<CountriesWithSearchBar
					selectedOption={selectedOption}
					onSelectOption={handleChangeSelect}
					showPhonePrefix={showPhonePrefix}
				/>
			)}
		</div>
	);
};

export default CountrySelector;
