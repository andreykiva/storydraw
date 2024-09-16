import { NavLink } from 'react-router-dom';
import styles from './MessagesBtn.module.scss';
import { ReactComponent as SendIcon } from '@/assets/icons/send.svg';
import Prompt from '@/components/ui/Prompt/Prompt';
import { MENU_POSITION } from '@/constants/ui';

const MessagesBtn = () => {
	return (
		<div className={styles.MessagesBtn}>
			<NavLink to="/messages" className={(isActive) => styles.MessagesLink + (isActive.isActive ? ` ${styles.Active}` : '')}>
				<SendIcon className={styles.SendIcon} />
			</NavLink>
			<Prompt position={MENU_POSITION.BOTTOM_CENTER} className={styles.Prompt}>
				Messages
			</Prompt>
		</div>
	);
};

export default MessagesBtn;
