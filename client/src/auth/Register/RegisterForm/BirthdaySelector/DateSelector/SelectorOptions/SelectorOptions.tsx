import React from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
import SelectorOption from './SelectorOption/SelectorOption';

type SelectorOptionsProps = {
	options: string[];
	selectedOption: string;
	onChangeSelect: (option: string) => void;
};

const SelectorOptions = ({ options, selectedOption, onChangeSelect }: SelectorOptionsProps) => {
	return (
		<ul className={authSharedStyles.SelectorOptions}>
			{options.map((option) => (
				<SelectorOption
					key={option}
					selected={option === selectedOption}
					onClick={onChangeSelect.bind(this, option)}
				>
					{option}
				</SelectorOption>
			))}
		</ul>
	);
};

export default SelectorOptions;
