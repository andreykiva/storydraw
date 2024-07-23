import { gql } from '@apollo/client';

export const UPDATE_USERNAME = gql`
	mutation UpdateUsername($usernameInput: UpdateUsernameInput!) {
		updateUsername(usernameInput: $usernameInput) {
			id
			username
			displayName
			imageUrl
		}
	}
`;
