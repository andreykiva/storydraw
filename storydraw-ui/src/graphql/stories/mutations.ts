import { gql } from '@apollo/client';

export const CREATE_STORY = gql`
	mutation CreateStory($createStoryInput: CreateStoryInput!) {
		createStory(createStoryInput: $createStoryInput) {
			id
			title
		}
	}
`;

export const LIKE_STORY = gql`
	mutation LikeStory($likeStoryInput: LikeStoryInput!) {
		likeStory(likeStoryInput: $likeStoryInput) {
			id
		}
	}
`;

export const UNLIKE_STORY = gql`
	mutation UnlikeStory($unlikeStoryInput: LikeStoryInput!) {
		unlikeStory(unlikeStoryInput: $unlikeStoryInput) {
			success
		}
	}
`;

export const ADD_FAVORITE = gql`
	mutation AddFavorite($addFavoriteInput: AddFavoriteInput!) {
		addFavorite(addFavoriteInput: $addFavoriteInput) {
			id
		}
	}
`;

export const REMOVE_FAVORITE = gql`
	mutation RemoveFavorite($removeFavoriteInput: AddFavoriteInput!) {
		removeFavorite(removeFavoriteInput: $removeFavoriteInput) {
			success
		}
	}
`;

export const SHARE = gql`
	mutation Share($shareInput: ShareInput!) {
		share(shareInput: $shareInput) {
			id
		}
	}
`;
