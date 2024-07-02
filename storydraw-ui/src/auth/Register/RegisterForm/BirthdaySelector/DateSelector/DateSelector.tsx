import React, { useState, useRef } from 'react';
import cn from 'classnames';
import styles from './DateSelector.module.scss';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
import useClickOutside from '@/hooks/useClickOutside';
import SelectorHeader from './SelectorHeader/SelectorHeader';
import SelectorOptions from './SelectorOptions/SelectorOptions';
import { BIRTH_FIELD } from '@/constants/auth';

type DateSelectorProps = {
	options: string[];
	selectedOption: string;
	fieldName: BIRTH_FIELD;
	placeholder: string;
	onSelectOption: (fieldName: BIRTH_FIELD, option: string) => void;
};

const DateSelector = ({ options, selectedOption, fieldName, placeholder, onSelectOption }: DateSelectorProps) => {
	const [isOptionsOpen, setIsOptionsOpen] = useState(false);
	const dateSelectorRef = useRef<HTMLDivElement>(null);

	useClickOutside([dateSelectorRef], isOptionsOpen, () => {
		setIsOptionsOpen(false);
	});

	const handleChangeSelect = (option: string) => {
		onSelectOption(fieldName, option);
		setIsOptionsOpen(false);
	};

	const handleToggleSelect = () => {
		setIsOptionsOpen(!isOptionsOpen);
	};

	return (
		<div className={cn(authSharedStyles.Selector, styles.DateSelector)} ref={dateSelectorRef}>
			<SelectorHeader
				value={selectedOption}
				placeholder={placeholder}
				isOpen={isOptionsOpen}
				onClick={handleToggleSelect}
			/>
			{isOptionsOpen && (
				<div className={authSharedStyles.SelectorBody}>
					<SelectorOptions
						options={options}
						selectedOption={selectedOption}
						onChangeSelect={handleChangeSelect}
					/>
				</div>
			)}
		</div>
	);
};

export default DateSelector;
