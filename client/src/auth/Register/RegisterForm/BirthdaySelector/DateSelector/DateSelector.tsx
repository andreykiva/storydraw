import React, { useState, useRef } from 'react';
import styles from './DateSelector.module.css';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';
import useClickOutside from '@/hooks/useClickOutside';
import SelectorHeader from './SelectorHeader/SelectorHeader';
import SelectorOptions from './SelectorOptions/SelectorOptions';

type DateSelectorProps = {
	options: string[];
	selectedOption: string;
	fieldName: string;
	placeholder: string;
	selectOption: (fieldName: string, option: string) => void;
};

const DateSelector = ({ options, selectedOption, fieldName, placeholder, selectOption }: DateSelectorProps) => {
	const [isOptionsOpen, setIsOptionsOpen] = useState(false);
	const dateSelectorRef = useRef<HTMLDivElement>(null);

	useClickOutside(dateSelectorRef, () => {
		setIsOptionsOpen(false);
	});

	const handleSelectChange = (option: string) => {
		selectOption(fieldName, option);
		setIsOptionsOpen(false);
	};

	const handleSelectToggle = () => {
		setIsOptionsOpen(!isOptionsOpen);
	};

	return (
		<div className={[authSharedStyles.Selector, styles.DateSelector].join(' ')} ref={dateSelectorRef}>
			<SelectorHeader
				value={selectedOption}
				placeholder={placeholder}
				isOpen={isOptionsOpen}
				onClick={handleSelectToggle}
			/>
			{isOptionsOpen && (
				<div className={authSharedStyles.SelectorBody}>
					<SelectorOptions
						options={options}
						selectedOption={selectedOption}
						handleSelectChange={handleSelectChange}
					/>
				</div>
			)}
		</div>
	);
};

export default DateSelector;
