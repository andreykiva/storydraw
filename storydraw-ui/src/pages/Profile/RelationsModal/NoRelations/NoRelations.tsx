import styles from './NoRelations.module.scss';

type NoRelationsProps = {
	icon: string;
	title: string;
	text: string;
};

const NoRelations = ({ icon, title, text }: NoRelationsProps) => {
	return (
		<div className={styles.NoRelations}>
			<img src={icon} className={styles.Icon} />
			<span className={styles.Title}>{title}</span>
			<p className={styles.Text}>{text}</p>
		</div>
	);
};

export default NoRelations;
