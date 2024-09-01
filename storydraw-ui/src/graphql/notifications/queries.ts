import { gql } from '@apollo/client';

export const GET_NOTIFICATIONS = gql`
	query GetNotifications($notificationsInput: GetNotificationsInput!) {
		notifications(notificationsInput: $notificationsInput) {
			type
			createdAt
			isRead
			... on LikeNotification {
				like {
					user {
						id
						username
						displayName
						imageUrl
					}
					story {
						id
					}
					comment {
						content
						user {
							displayName
						}
					}
				}
			}
		}
	}
`;

//  # ... on MentionNotification {
// 	# 	content
// 	# 	entityType
// 	# 	user {
// 	# 		id
// 	# 		username
// 	# 		displayName
// 	# 		imageUrl
// 	# 	}
// 	# 	story {
// 	# 		id
// 	# 		description
// 	# 	}
// 	# 	comment {
// 	# 		content
// 	# 	}
// 	# }

// ... on FollowerNotification {
// 	user {
// 		id
// 		username
// 		displayName
// 		imageUrl
// 		isFollowing
// 	}
// }
// ... on LikeNotification {
// 	user {
// 		id
// 		username
// 		displayName
// 		imageUrl
// 	}
// 	story {
// 		id
// 	}
// 	comment {
// 		content
// 		user {
// 			displayName
// 		}
// 	}
// }
// ... on CommentNotification {
// 	content
// 	user {
// 		id
// 		username
// 		displayName
// 		imageUrl
// 	}
// 	story {
// 		id
// 	}
// 	parentReply {
// 		content
// 		user {
// 			displayName
// 		}
// 	}
// }
