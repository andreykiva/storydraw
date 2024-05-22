import React from 'react';
import cn from 'classnames';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
import CheckIcon from '@/assets/icons/check.svg';

type SelectorOptionProps = {
	selected: boolean;
	children: React.ReactNode;
	onClick: () => void;
};

const SelectorOption = ({ selected, children, onClick }: SelectorOptionProps) => {
	return (
		<li className={cn(authSharedStyles.SelectorOption, selected && authSharedStyles.Selected)} onClick={onClick}>
			<span>{children}</span>
			{selected && <CheckIcon className={authSharedStyles.SelectedIcon} />}
		</li>
	);
};

export default SelectorOption;
