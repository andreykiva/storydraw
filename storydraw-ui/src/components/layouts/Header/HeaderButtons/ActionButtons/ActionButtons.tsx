import styles from './ActionButtons.module.scss';
import MessagesBtn from './MessagesBtn/MessagesBtn';
import InboxSection from './InboxSection/InboxSection';

const ActionButtons = () => {
	return (
		<div className={styles.ActionButtons}>
			<MessagesBtn />
			<InboxSection />
		</div>
	);
};

export default ActionButtons;
