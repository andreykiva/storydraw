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

export const FOLLOW = gql`
	mutation Follow($followInput: FollowInput!) {
		follow(followInput: $followInput) {
			id
		}
	}
`;

export const UNFOLLOW = gql`
	mutation Unfollow($unfollowInput: FollowInput!) {
		unfollow(unfollowInput: $unfollowInput) {
			success
		}
	}
`;

export const UPDATE_USER = gql`
mutation UpdateUser($updateUserInput: UpdateUserInput!) {
	updateUser(updateUserInput: $updateUserInput) {
		id
		username
		displayName
		imageUrl
		bio
	}
}
`;