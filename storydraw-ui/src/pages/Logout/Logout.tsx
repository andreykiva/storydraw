import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { logout } from '@/features/auth/authSlice';
import { clearUser } from '@/features/user/userSlice';

const Logout = (): null => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const client = useApolloClient();

	useEffect(() => {
		client.cache.reset().then(() => {
			dispatch(logout());
			dispatch(clearUser());
			navigate('/');
		});
	}, [dispatch, navigate, client]);

	return null;
};

export default Logout;
