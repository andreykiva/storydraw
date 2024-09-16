import styles from './UserMessage.module.scss';
import HTag from '@/components/ui/HTag/HTag';

type UserMessageProps = {
	icon: string;
	title: string;
	text: string;
};

const UserMessage = ({ icon, title, text }: UserMessageProps) => {
	return (
		<div className={styles.UserMessage}>
			<img src={icon} className={styles.UserIcon} />
			<HTag tag="h3" className={styles.Title}>
				{title}
			</HTag>
			<p className={styles.Descr}>{text}</p>
		</div>
	);
};

export default UserMessage;
