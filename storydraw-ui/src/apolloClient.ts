import { ApolloClient, HttpLink, from, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { REFRESH_TOKEN } from './graphql/auth/mutations';

type CustomError = {
	message?: string;
};

const generateRefreshTokenLinkOnUnauthError = ({
	refreshTokenPathName,
	refreshTokenRequestFunc,
}: {
	refreshTokenPathName: string;
	refreshTokenRequestFunc: () => Promise<void>;
}) => {
	return [
		onError(({ graphQLErrors, operation, forward }) => {
			if (!graphQLErrors) return;

			for (const { path, extensions } of graphQLErrors) {
				const errors = extensions.errors as CustomError;
				if (!errors || !errors.message || errors.message !== 'Unauthorized' || !path) continue;
				if (path.includes(refreshTokenPathName)) break;

				const { getContext, setContext } = operation;
				const context = getContext();

				setContext({
					...context,
					headers: {
						...context?.headers,
						_needsRefresh: true,
					},
				});

				return forward(operation);
			}
		}),
		setContext(async (_, previousContext) => {
			if (previousContext?.headers?._needsRefresh) {
				await refreshTokenRequestFunc();
			}

			return previousContext;
		}),
	];
};

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' });

const authLink = setContext((_, previousContext) => {
	const token = localStorage.getItem('access_token');

	return {
		...previousContext,
		headers: {
			...previousContext?.headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const refreshTokenReq = async () => {
	const refreshToken = localStorage.getItem('refresh_token') || '';

	try {
		const { data } = await client.mutate({
			mutation: REFRESH_TOKEN,
			variables: {
				token: refreshToken,
			},
		});

		const { access_token } = data?.refreshToken || {};
		if (access_token) localStorage.setItem('access_token', access_token);
	} catch (error) {
		console.error('Error refreshing token:', error);
		throw error;
	}
};

const client = new ApolloClient({
	link: from([
		...generateRefreshTokenLinkOnUnauthError({
			refreshTokenPathName: 'refreshToken',
			refreshTokenRequestFunc: refreshTokenReq,
		}),
		authLink,
		httpLink,
	]),
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			errorPolicy: 'all',
		},
		query: {
			errorPolicy: 'all',
		},
		mutate: {
			errorPolicy: 'all',
		},
	},
});

export default client;
