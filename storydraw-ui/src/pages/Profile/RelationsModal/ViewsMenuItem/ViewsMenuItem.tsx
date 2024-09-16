import cn from 'classnames';
import styles from './ViewsMenuItem.module.scss';

type ViewsMenuItemProps = {
	children: React.ReactNode;
	active: boolean;
	onClick: () => void;
};

const ViewsMenuItem = ({ children, active, onClick }: ViewsMenuItemProps) => {
	return (
		<div className={cn(styles.ViewsMenuItem, active && styles.Active)} onClick={onClick}>
			{children}
		</div>
	);
};

export default ViewsMenuItem;
