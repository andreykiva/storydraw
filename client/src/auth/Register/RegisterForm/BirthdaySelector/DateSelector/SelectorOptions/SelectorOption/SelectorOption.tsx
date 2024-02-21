import React from 'react';
import styles from './SelectorOption.module.css';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';
import CheckIcon from '@/assets/icons/check.svg';

type SelectorOptionProps = {
	children: React.ReactNode;
	selectedOption: string;
	onClick: () => void;
};

const SelectorOption = ({ children, selectedOption, onClick }: SelectorOptionProps) => {
	return (
		<li
			className={[
				styles.SelectorOption,
				authSharedStyles.SelectorOption,
				children === selectedOption && authSharedStyles.Selected,
			].join(' ')}
			onClick={onClick}
		>
			<span>{children}</span>
			{children === selectedOption && <CheckIcon className={authSharedStyles.SelectedIcon} />}
		</li>
	);
};

export default SelectorOption;
