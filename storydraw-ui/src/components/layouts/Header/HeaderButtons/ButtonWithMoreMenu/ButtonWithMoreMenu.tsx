import { useState } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import styles from './ButtonWithMoreMenu.module.scss';
import moreIcon from '@/assets/icons/more.svg';
import defaultImg from '@/assets/images/default.svg';
import MoreMenu from './MoreMenu/MoreMenu';
import ConfirmationModal from '@/components/ui/ConfirmationModal/ConfirmationModal';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/user/userSlice';

type ButtonWithMoreMenuProps = {
	isAuth: boolean;
};

const ButtonWithMoreMenu = ({ isAuth }: ButtonWithMoreMenuProps) => {
	const navigate = useNavigate();
	const user = useSelector(selectUser);
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

	const handleLogout = () => {
		navigate('/logout');
		setIsConfirmationModalOpen(false);
	};

	return (
		<div className={styles.ButtonWithMoreMenu}>
			<div className={styles.ButtonInner}>
				<img
					src={isAuth ? user.imageUrl || defaultImg : moreIcon}
					alt={isAuth ? 'User profile' : 'More'}
					className={styles.MoreIcon}
				/>
			</div>
			<MoreMenu
				className={cn(styles.MoreMenu, isConfirmationModalOpen && styles.Open)}
				isAuth={isAuth}
				onOpenLogoutModal={() => setIsConfirmationModalOpen(true)}
			/>
			{isConfirmationModalOpen && (
				<ConfirmationModal
					title="Are you sure you want to log out?"
					confirmAction="Log out"
					onClose={() => setIsConfirmationModalOpen(false)}
					onConfirm={handleLogout}
				/>
			)}
		</div>
	);
};

export default ButtonWithMoreMenu;
