import styles from './ReportCategory.module.scss';
import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow.svg';
import { ReactComponent as CheckIcon } from '@/assets/icons/check.svg';

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
