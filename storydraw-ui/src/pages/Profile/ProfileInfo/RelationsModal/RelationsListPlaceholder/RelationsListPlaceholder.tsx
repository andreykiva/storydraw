import styles from './RelationsListPlaceholder.module.scss';
import RelationsItemPlaceholder from './RelationsItemPlaceholder/RelationsItemPlaceholder';

type RelationsListPlaceholderProps = {
	length: number;
};

const RelationsListPlaceholder = ({ length }: RelationsListPlaceholderProps) => {
	return (
		<div className={styles.RelationsListPlaceholder}>
			{Array.from({ length: length > 0 ? length : 5 }).map((_, index) => (
				<RelationsItemPlaceholder key={index} />
			))}
		</div>
	);
};

export default RelationsListPlaceholder;
