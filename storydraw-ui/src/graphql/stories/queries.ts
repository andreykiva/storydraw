import { gql } from '@apollo/client';

export const GET_FEED = gql`
	query GetFeed($isAuth: Boolean!) {
		getAllStories {
			id
			title
			description
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
	query GetUserStories($getUserStoriesInput: GetUserStoriesInput!) {
		getUserStories(getUserStoriesInput: $getUserStoriesInput) {
			id
			description
		}
	}
`;

export const GET_FAVORITE_STORIES = gql`
	query GetFavoriteStories($getFavoriteStoriesInput: GetUserStoriesInput!) {
		getFavoriteStories(getFavoriteStoriesInput: $getFavoriteStoriesInput) {
			id
			description
		}
	}
`;

export const GET_LIKED_STORIES = gql`
	query GetLikedStories($getLikedStoriesInput: GetUserStoriesInput!) {
		getLikedStories(getLikedStoriesInput: $getLikedStoriesInput) {
			id
			description
		}
	}
`;