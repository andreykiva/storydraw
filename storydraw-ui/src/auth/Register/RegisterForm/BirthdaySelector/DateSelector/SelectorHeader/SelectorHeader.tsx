import cn from 'classnames';
import styles from './SelectorHeader.module.scss';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
import arrowDownIcon from '@/assets/icons/arrow-down.svg';

type SelectorHeaderProps = {
	value: string | number;
	placeholder: string;
	isOpen: boolean;
	onClick: () => void;
};

const SelectorHeader = ({ value, placeholder, isOpen, onClick }: SelectorHeaderProps) => {
	return (
		<div className={authSharedStyles.SelectorHeader} onClick={onClick}>
			{value ? (
				<span className={styles.SelectorValue}>{value}</span>
			) : (
				<span className={styles.SelectorPlaceholder}>{placeholder}</span>
			)}
			<img src={arrowDownIcon} alt="Arrow down" className={cn(authSharedStyles.SelectorArrow, isOpen && authSharedStyles.ArrowUp)} />
		</div>
	);
};

export default SelectorHeader;
