import { gql } from '@apollo/client';

export const GET_FEED = gql`
	query GetFeed($paginationInput: PaginationInput, $isAuth: Boolean!) {
		getAllStories(paginationInput: $paginationInput) {
			id
			title
			description
			createdAt
			musicId
			likesCount
			commentsCount
			favoritesCount
			sharesCount
			user {
				id
				username
				displayName
				imageUrl
				isFollowing @include(if: $isAuth)
				isFollowedBy @include(if: $isAuth)
			}
			isLiked @include(if: $isAuth)
			isFavorited @include(if: $isAuth)
			isShared @include(if: $isAuth)
		}
	}
`;

export const GET_STORY = gql`
	query GetStory($getStoryInput: GetStoryInput!, $isAuth: Boolean!) {
		getStory(getStoryInput: $getStoryInput) {
			id
			title
			description
			createdAt
			likesCount
			commentsCount
			favoritesCount
			sharesCount
			user {
				id
				username
				displayName
				imageUrl
				isFollowing @include(if: $isAuth)
				isFollowedBy @include(if: $isAuth)
			}
			isLiked @include(if: $isAuth)
			isFavorited @include(if: $isAuth)
			isShared @include(if: $isAuth)
		}
	}
`;

export const GET_USER_STORIES = gql`
	query GetUserStories($getUserStoriesInput: GetUserStoriesInput!, $paginationInput: PaginationInput) {
		getUserStories(getUserStoriesInput: $getUserStoriesInput, paginationInput: $paginationInput) {
			id
			description
			createdAt
		}
	}
`;

export const GET_USER_FAVORITES = gql`
	query GetUserFavorites($getUserFavoritesInput: GetUserFavoritesInput!, $paginationInput: PaginationInput) {
		getUserFavorites(getUserFavoritesInput: $getUserFavoritesInput, paginationInput: $paginationInput) {
			createdAt
			story {
				id
				description
			}
		}
	}
`;

export const GET_USER_STORY_LIKES = gql`
	query GetUserStoryLikes($getUserStoryLikesInput: GetUserStoryLikesInput!, $paginationInput: PaginationInput) {
		getUserStoryLikes(getUserStoryLikesInput: $getUserStoryLikesInput, paginationInput: $paginationInput) {
			createdAt
			story {
				id
				description
			}
		}
	}
`;
