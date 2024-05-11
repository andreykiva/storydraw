import React from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';
import CheckIcon from '@/assets/icons/check.svg';

type SelectorOptionProps = {
	selected: boolean;
	children: React.ReactNode;
	onClick: () => void;
};

const SelectorOption = ({ selected, children, onClick }: SelectorOptionProps) => {
	return (
		<li
			className={[authSharedStyles.SelectorOption, selected && authSharedStyles.Selected].join(' ')}
			onClick={onClick}
		>
			<span>{children}</span>
			{selected && <CheckIcon className={authSharedStyles.SelectedIcon} />}
		</li>
	);
};

export default SelectorOption;
