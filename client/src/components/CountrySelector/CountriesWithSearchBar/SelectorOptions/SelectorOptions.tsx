import React from 'react';
import styles from './SelectorOptions.module.scss';
import SelectorOption from './SelectorOption/SelectorOption';
import { highlightText } from '@/utils/textUtils';
import type Country from '@/types/Country';

type SelectorOptionsProps = {
	options: Country[];
	selectedOptionId: string;
	searchValue: string;
	onChangeSelect: (option: Country) => void;
	showPhonePrefix: boolean;
};

const SelectorOptions = (props: SelectorOptionsProps) => {
	const { options, selectedOptionId, searchValue, showPhonePrefix, onChangeSelect } = props;

	return (
		<ul className={styles.SelectorOptions}>
			{options.length > 0 ? (
				options.map((option) => {
					let value = option.name;

					if (showPhonePrefix) {
						value = `${option.name} ${option.phonePrefix}`;
					}

					return (
						<SelectorOption
							key={option.id}
							selected={option.id === selectedOptionId}
							onClick={() => onChangeSelect(option)}
						>
							{highlightText(value, searchValue, styles.Highlight)}
						</SelectorOption>
					);
				})
			) : (
				<li className={styles.NoResultsMessage}>No results found</li>
			)}
		</ul>
	);
};

export default SelectorOptions;
