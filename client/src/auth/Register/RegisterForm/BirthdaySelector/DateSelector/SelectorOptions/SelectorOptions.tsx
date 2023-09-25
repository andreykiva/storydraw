import React from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';
import SelectorOption from './SelectorOption/SelectorOption';

type SelectorOptionsProps = {
	options: string[];
	selectedOption: string;
	handleSelectChange: (option: string) => void;
};

const SelectorOptions = ({ options, selectedOption, handleSelectChange }: SelectorOptionsProps) => {
	return (
		<ul className={authSharedStyles.SelectorOptions}>
			{options.map((option) => (
				<SelectorOption
					key={option}
					selectedOption={selectedOption}
					onClick={handleSelectChange.bind(this, option)}
				>
					{option}
				</SelectorOption>
			))}
		</ul>
	);
};

export default SelectorOptions;
