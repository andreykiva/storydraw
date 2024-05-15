import React from 'react';
import styles from './ReportCategory.module.scss';
import ArrowIcon from '@/assets/icons/arrow.svg';
import CheckIcon from '@/assets/icons/check.svg';

type ReportCategoryProps = {
	name: string;
	selected: boolean;
	hasSubcategories: boolean;
	onClick: () => void;
};

const ReportCategory = ({ name, hasSubcategories, selected, onClick }: ReportCategoryProps) => {
	return (
		<li className={styles.ReportCategory} onClick={onClick}>
			<span className={styles.CategoryName}>{name}</span>
			{hasSubcategories && !selected && <ArrowIcon className={styles.ArrowIcon} />}
			{selected && <CheckIcon className={styles.CheckIcon} />}
		</li>
	);
};

export default ReportCategory;
