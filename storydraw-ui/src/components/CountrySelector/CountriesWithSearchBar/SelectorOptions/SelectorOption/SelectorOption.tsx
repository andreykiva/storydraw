import React from 'react';
import cn from 'classnames';
import styles from './SelectorOption.module.scss';
import CheckIcon from '@/assets/icons/check.svg';

type SelectorOptionProps = {
	selected: boolean;
	children: React.ReactNode;
	onClick: () => void;
};

const SelectorOption = ({ selected, children, onClick }: SelectorOptionProps) => {
	return (
		<li className={cn(styles.SelectorOption, selected && styles.Selected)} onClick={onClick}>
			<span>{children}</span>
			{selected && <CheckIcon className={styles.SelectedIcon} />}
		</li>
	);
};

export default SelectorOption;
