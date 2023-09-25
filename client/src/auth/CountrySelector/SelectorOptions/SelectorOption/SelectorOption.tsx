import React from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';
import CheckIcon from '@/components/ui/icons/CheckIcon';

type SelectorOptionProps = {
	id: string;
	selectedOptionId: string;
	children: React.ReactNode;
	onClick: () => void;
};

const SelectorOption = ({ id, selectedOptionId, children, onClick }: SelectorOptionProps) => {
	return (
		<li
			className={[authSharedStyles.SelectorOption, id === selectedOptionId && authSharedStyles.Selected].join(
				' ',
			)}
			onClick={onClick}
		>
			<span>{children}</span>
			{id === selectedOptionId && <CheckIcon className={authSharedStyles.SelectedIcon} />}
		</li>
	);
};

export default SelectorOption;
