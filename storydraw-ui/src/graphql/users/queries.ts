import { gql } from '@apollo/client';

export const GET_ME = gql`
	query GetMe {
		getMe {
			id
			username
			displayName
			imageUrl
		}
	}
`;

export const FIND_USER_BY_USERNAME = gql`
	query FindOneByUsername {
		findOneByUsername {
			id
			username
		}
	}
`;

export const ENSURE_USERNAME_NOT_EXISTS = gql`
	query EnsureUsernameNotExists($usernameInput: FindOneByUsernameInput!) {
		ensureUsernameNotExists(usernameInput: $usernameInput) {
			exists
		}
	}
`;
