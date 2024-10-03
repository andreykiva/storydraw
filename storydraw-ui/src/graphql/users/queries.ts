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

export const GET_USER_PROFILE = gql`
	query GetUserProfile($usernameInput: FindOneByUsernameInput!, $isAuth: Boolean!, $isCurrentUser: Boolean!) {
		findOneByUsername(usernameInput: $usernameInput) {
			id
			username
			displayName
			bio
			imageUrl
			followingCount
			followersCount
			friendsCount @include(if: $isCurrentUser)
			likesCount
			isFollowedBy @include(if: $isAuth)
			isFollowing @include(if: $isAuth)
		}
	}
`;

export const GET_FOLLOWING = gql`
	query GetFollowing($followingInput: FollowInput!, $paginationInput: PaginationInput, $isAuth: Boolean!) {
		following(followingInput: $followingInput, paginationInput: $paginationInput) {
			createdAt
			following {
				id
				username
				displayName
				imageUrl
				isFollowing @include(if: $isAuth)
				isFollowedBy @include(if: $isAuth)
			}
		}
	}
`;

export const GET_FOLLOWERS = gql`
	query GetFollowers($followersInput: FollowInput!, $paginationInput: PaginationInput, $isAuth: Boolean!) {
		followers(followersInput: $followersInput, paginationInput: $paginationInput) {
			createdAt
			follower {
				id
				username
				displayName
				imageUrl
				isFollowing @include(if: $isAuth)
				isFollowedBy @include(if: $isAuth)
			}
		}
	}
`;

export const GET_FRIENDS = gql`
	query GetFriends($paginationInput: PaginationInput) {
		friends(paginationInput: $paginationInput) {
			createdAt
			following {
				id
				username
				displayName
				imageUrl
			}
		}
	}
`;
