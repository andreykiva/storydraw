import cn from 'classnames';
import styles from './NavItem.module.scss';

type NavItemProps = {
	title: string;
	active: boolean;
	iconComponent: React.ReactNode;
	onClick: () => void;
};

const NavItem = ({ title, active, iconComponent, onClick }: NavItemProps) => {
	return (
		<li className={cn(styles.NavItem, active && styles.Active)} onClick={onClick}>
			{iconComponent}
			<span>{title}</span>
		</li>
	);
};

export default NavItem;
