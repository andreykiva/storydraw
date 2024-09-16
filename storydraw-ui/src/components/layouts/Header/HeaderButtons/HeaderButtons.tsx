import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './HeaderButtons.module.scss';
import createIcon from '@/assets/icons/create.svg';
import ButtonWithMoreMenu from './ButtonWithMoreMenu/ButtonWithMoreMenu';
import Button from '@/components/ui/buttons/Button/Button';
import { openAuthModal } from '@/features/auth/authSlice';
import { selectAuth } from '@/features/auth/authSlice';
import ActionButtons from './ActionButtons/ActionButtons';

const HeaderButtons = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAuth = useSelector(selectAuth);

	const handleLogin = () => {
		dispatch(openAuthModal());
	};

	const handleCreate = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
		} else {
			navigate('/create');
		}
	};

	return (
		<div className={styles.HeaderButtons}>
			<Button className={styles.CreateBtn} onClick={handleCreate}>
				<img src={createIcon} alt="Create" className={styles.CreateIcon} />
				<span className={styles.CreateText}>Create</span>
			</Button>
			{isAuth ? (
				<ActionButtons />
			) : (
				<Button className={styles.LoginBtn} onClick={handleLogin}>
					Log in
				</Button>
			)}
			<ButtonWithMoreMenu isAuth={isAuth} />
		</div>
	);
};

export default HeaderButtons;
