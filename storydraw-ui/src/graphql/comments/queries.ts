import { gql } from '@apollo/client';

export const GET_COMMENTS = gql`
	query GetComments($getCommentsInput: GetCommentsInput!, $isAuth: Boolean!) {
		getComments(getCommentsInput: $getCommentsInput) {
			id
			content
			createdAt
			likesCount
			repliesCount
			user {
				id
				username
				displayName
				imageUrl
			}
			isLiked @include(if: $isAuth)
		}
	}
`;

export const GET_REPLIES = gql`
	query GetReplies($getRepliesInput: GetRepliesInput!, $isAuth: Boolean!) {
		getReplies(getRepliesInput: $getRepliesInput) {
			id
			content
			createdAt
			likesCount
			user {
				id
				username
				displayName
				imageUrl
			}
			isLiked @include(if: $isAuth)
		}
	}
`;
