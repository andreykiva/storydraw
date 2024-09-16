import styles from './ActionsMenu.module.scss';
import WrapperWithTriangle from '@/components/ui/WrapperWithTriangle/WrapperWithTriangle';
import { MENU_POSITION } from '@/constants/ui';

type ActionsMenuProps = {
	onLike: () => void;
	onDelete: () => void;
	onReport?: () => void;
	likedByMe: boolean;
};

const ActionsMenu = ({ onLike, onDelete, onReport, likedByMe }: ActionsMenuProps) => {
	return (
		<WrapperWithTriangle position={MENU_POSITION.TOP_CENTER} className={styles.ActionsMenu}>
			<span className={styles.Action} onClick={onLike}>
				{likedByMe ? 'Unlike' : 'Like'}
			</span>
			<span className={styles.Action} onClick={onDelete}>
				Delete
			</span>
			{onReport && (
				<span className={styles.Action} onClick={onReport}>
					Report
				</span>
			)}
		</WrapperWithTriangle>
	);
};

export default ActionsMenu;
