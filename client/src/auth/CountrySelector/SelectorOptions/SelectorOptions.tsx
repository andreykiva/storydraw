import React from 'react';
import cn from 'classnames';
import styles from './SelectorOptions.module.scss';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
import SelectorOption from './SelectorOption/SelectorOption';
import { highlightText } from '@/utils/textUtils';
import type Country from '@/types/Country';

type SelectorOptionsProps = {
	options: Country[];
	selectedOptionId: string;
	searchValue: string;
	onChangeSelect: (option: Country) => void;
};

const SelectorOptions = ({ options, selectedOptionId, searchValue, onChangeSelect }: SelectorOptionsProps) => {
	return (
		<ul className={cn(authSharedStyles.SelectorOptions, styles.SelectorOptions)}>
			{options.length > 0 ? (
				options.map((option) => (
					<SelectorOption
						key={option.id}
						selected={option.id === selectedOptionId}
						onClick={() => onChangeSelect(option)}
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
