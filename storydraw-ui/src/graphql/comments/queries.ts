import { gql } from '@/__generated__/gql';

export const GET_COMMENTS = gql(`
	query GetComments($getCommentsInput: GetCommentsInput!, $paginationInput: PaginationInput, $isAuth: Boolean!) {
		getComments(getCommentsInput: $getCommentsInput, paginationInput: $paginationInput) {
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
`);

export const GET_REPLIES = gql(`
	query GetReplies($getRepliesInput: GetRepliesInput!, $paginationInput: RepliesPaginationInput, $isAuth: Boolean!) {
		getReplies(getRepliesInput: $getRepliesInput, paginationInput: $paginationInput) {
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
`);
