import { Link } from 'react-router-dom';
import styles from './SidebarAccount.module.scss';
import defaultImg from '@/assets/images/default.svg';
import type User from '@/types/User';

type SidebarAccountProps = Pick<User, 'username' | 'displayName' | 'imageUrl'>;

const SidebarAccount = ({ username, displayName, imageUrl }: SidebarAccountProps) => {
	return (
		<li className={styles.SidebarAccount}>
			<Link to={`/@${username}`} className={styles.AccountLink}>
				<div className={styles.AccountImgWr}>
					<img src={imageUrl || defaultImg} alt="Profile picture" className={styles.AccountImg} />
				</div>
				<div className={styles.AccountInfo}>
					<span className={styles.AccountUsername}>{username}</span>
					<span className={styles.AccountDisplayName}>{displayName}</span>
				</div>
			</Link>
		</li>
	);
};

export default SidebarAccount;
