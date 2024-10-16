import { gql } from '@/__generated__/gql';

export const GET_CURRENT_USER = gql(`
	query GetCurrentUser {
		getCurrentUser {
			id
			username
			displayName
			imageUrl
		}
	}
`);

export const ENSURE_USERNAME_NOT_EXISTS = gql(`
	query EnsureUsernameNotExists($usernameInput: GetUserByUsernameInput!) {
		ensureUsernameNotExists(usernameInput: $usernameInput) {
			exists
		}
	}
`);

export const GET_USER_PROFILE = gql(`
	query GetUserProfile($usernameInput: GetUserByUsernameInput!, $isAuth: Boolean!, $isCurrentUser: Boolean!) {
		getUserByUsername(usernameInput: $usernameInput) {
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
`);

export const GET_FOLLOWING = gql(`
	query GetFollowing($getFollowingInput: FollowInput!, $paginationInput: PaginationInput, $isAuth: Boolean!) {
		getFollowing(getFollowingInput: $getFollowingInput, paginationInput: $paginationInput) {
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
`);

export const GET_FOLLOWERS = gql(`
	query GetFollowers($getFollowersInput: FollowInput!, $paginationInput: PaginationInput, $isAuth: Boolean!) {
		getFollowers(getFollowersInput: $getFollowersInput, paginationInput: $paginationInput) {
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
`);

export const GET_FRIENDS = gql(`
	query GetFriends($paginationInput: PaginationInput) {
		getFriends(paginationInput: $paginationInput) {
			createdAt
			following {
				id
				username
				displayName
				imageUrl
			}
		}
	}
`);
