import React from 'react';
import styles from './SelectorOption.module.scss';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
import CheckIcon from '@/assets/icons/check.svg';

type SelectorOptionProps = {
	children: React.ReactNode;
	selected: boolean;
	onClick: () => void;
};

const SelectorOption = ({ children, selected, onClick }: SelectorOptionProps) => {
	return (
		<li
			className={[
				styles.SelectorOption,
				authSharedStyles.SelectorOption,
				selected && authSharedStyles.Selected,
			].join(' ')}
			onClick={onClick}
		>
			<span>{children}</span>
			{selected && <CheckIcon className={authSharedStyles.SelectedIcon} />}
		</li>
	);
};

export default SelectorOption;
