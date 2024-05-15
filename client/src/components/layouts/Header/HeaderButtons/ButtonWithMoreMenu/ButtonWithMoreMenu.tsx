import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ButtonWithMoreMenu.module.scss';
import moreIcon from '@/assets/icons/more.svg?url';
import defaultImg from '@/assets/images/default.svg?url';
import MoreMenu from './MoreMenu/MoreMenu';
import ConfirmationModal from '@/components/ui/ConfirmationModal/ConfirmationModal';

type ButtonWithMoreMenuProps = {
	isAuth: boolean;
};

const ButtonWithMoreMenu = ({ isAuth }: ButtonWithMoreMenuProps) => {
	const navigate = useNavigate();
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

	const handleLogout = () => {
		navigate('/logout');
		setIsConfirmationModalOpen(false);
	};

	return (
		<div className={styles.ButtonWithMoreMenu}>
			<div className={styles.ButtonInner}>
				<img
					src={isAuth ? defaultImg : moreIcon}
					alt={isAuth ? 'User profile' : 'More'}
					className={styles.MoreIcon}
				/>
			</div>
			<MoreMenu
				className={[styles.MoreMenu, isConfirmationModalOpen && styles.Open].join(' ')}
				isAuth={isAuth}
				onOpenLogoutModal={setIsConfirmationModalOpen.bind(this, true)}
			/>
			{isConfirmationModalOpen && (
				<ConfirmationModal
					title="Are you sure you want to log out?"
					confirmAction="Log out"
					onClose={setIsConfirmationModalOpen.bind(this, false)}
					onConfirm={handleLogout}
				/>
			)}
		</div>
	);
};

export default ButtonWithMoreMenu;
