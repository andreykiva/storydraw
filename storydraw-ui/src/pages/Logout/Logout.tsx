import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/features/auth/authSlice';
import { clearUser } from '@/features/user/userSlice';


const Logout = (): null => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(logout());
		dispatch(clearUser());
		navigate('/');
	}, [dispatch, navigate]);

	return null;
};

export default Logout;
