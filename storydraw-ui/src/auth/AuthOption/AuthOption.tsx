import styles from './AuthOption.module.scss';

type AuthOptionProps = {
	title: string;
	alt: string;
	icon: string;
	onClick: () => void;
};

const AuthOption = (props: AuthOptionProps) => {
	const { icon, alt, title, onClick } = props;

	return (
		<li className={styles.AuthOption} onClick={onClick}>
			<img src={icon} alt={alt} className={styles.OptionIcon} />
			<span className={styles.OptionTitle}>{title}</span>
		</li>
	);
};

export default AuthOption;
