import { gql } from '@apollo/client';

export const LIKE_COMMENT = gql`
	mutation LikeComment($likeCommentInput: LikeCommentInput!) {
		likeComment(likeCommentInput: $likeCommentInput) {
			id
		}
	}
`;

export const UNLIKE_COMMENT = gql`
	mutation UnlikeComment($unlikeCommentInput: LikeCommentInput!) {
		unlikeComment(unlikeCommentInput: $unlikeCommentInput) {
			success
		}
	}
`;

export const CREATE_COMMENT = gql`
	mutation CreateComment($createCommentInput: CreateCommentInput!) {
		createComment(createCommentInput: $createCommentInput) {
			id
			content
			createdAt
			user {
				id
				username
				displayName
				imageUrl
			}
		}
	}
`;

export const CREATE_REPLY = gql`
	mutation CreateReply($createReplyInput: CreateReplyInput!) {
		createReply(createReplyInput: $createReplyInput) {
			id
			content
			createdAt
			user {
				id
				username
				displayName
				imageUrl
			}
		}
	}
`;

export const DELETE_COMMENT = gql`
	mutation DeleteComment($deleteCommentInput: DeleteCommentInput!) {
		deleteComment(deleteCommentInput: $deleteCommentInput) {
			success
		}
	}
`;
