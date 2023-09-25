import React from 'react';
import styles from './SelectorOptions.module.css';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';
import SelectorOption from './SelectorOption/SelectorOption';
import { highlightText } from '@/utils/textUtils';
import type Country from '@/types/Country';

type SelectorOptionsProps = {
	options: Country[];
	selectedOptionId: string;
	searchValue: string;
	handleSelectChange: (option: Country) => void;
};

const SelectorOptions = ({ options, selectedOptionId, searchValue, handleSelectChange }: SelectorOptionsProps) => {
	return (
		<ul className={[authSharedStyles.SelectorOptions, styles.SelectorOptions].join(' ')}>
			{options.length > 0 ? (
				options.map((option) => (
					<SelectorOption
						key={option.id}
						id={option.id}
						selectedOptionId={selectedOptionId}
						onClick={handleSelectChange.bind(this, option)}
					>
						{highlightText(`${option.name} ${option.phonePrefix}`, searchValue, styles.Highlight)}
					</SelectorOption>
				))
			) : (
				<li className={styles.NoResultsMessage}>No results found</li>
			)}
		</ul>
	);
};

export default SelectorOptions;
