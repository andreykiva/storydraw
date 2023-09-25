import React, { useState, useRef } from 'react';
import styles from './DateSelector.module.css';
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
	const [isOpen, setIsOpen] = useState(false);
	const dateSelectorRef = useRef(null);

	useClickOutside(dateSelectorRef, () => {
		setIsOpen(false);
	});

	const handleSelectChange = (option: string) => {
		selectOption(fieldName, option);
		setIsOpen(false);
	};

	const toggleSelect = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={styles.DateSelector} ref={dateSelectorRef}>
			<SelectorHeader
				value={selectedOption}
				placeholder={placeholder}
				isOpen={isOpen}
				onClick={toggleSelect}
			/>
			{isOpen && (
				<div className={styles.DateSelectorBody}>
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
