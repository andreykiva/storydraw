import { setupUserAndTokens, setupCreateUsername } from '@/utils/authUtils';
import { setTokens, login } from '@/features/auth/authSlice';
import { setUser, UserState } from '@/features/user/userSlice';

describe('setupUserAndTokens', () => {
	it('should dispatch setTokens and setUser actions with the correct parameters', () => {
		const mockDispatch = vi.fn();
		const accessToken = 'access-token';
		const refreshToken = 'refresh-token';
		const user: UserState = { id: '1', username: 'John Doe', displayName: 'John_Doe', imageUrl: '' };

		setupUserAndTokens(mockDispatch, accessToken, refreshToken, user);

		expect(mockDispatch).toHaveBeenCalledWith(setTokens({ access_token: accessToken, refresh_token: refreshToken }));
		expect(mockDispatch).toHaveBeenCalledWith(setUser(user));
	});
});

describe('setupCreateUsername', () => {
	it('should dispatch setUser and login actions with the correct parameters', () => {
		const mockDispatch = vi.fn();
		const user: UserState = { id: '1', username: 'John Doe', displayName: 'John_Doe', imageUrl: '' };

		setupCreateUsername(mockDispatch, user);

		expect(mockDispatch).toHaveBeenCalledWith(setUser(user));
		expect(mockDispatch).toHaveBeenCalledWith(login());
	});
});
