import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/features/auth/authSlice';

const Logout = (): null => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(logout());
		navigate('/');
	}, [dispatch, navigate]);

	return null;
};

export default Logout;
