import { gql } from '@/__generated__/gql';

export const GET_LIKES_NOTIFICATIONS = gql(`
	query GetLikesNotifications($paginationInput: PaginationInput) {
		getLikesNotifications(paginationInput: $paginationInput) {
			id
			type
			createdAt
			story {
				id
				user {
					username
				}
			}
			initiator {
				id
				username
				displayName
				imageUrl
			}
			like {
				comment {
					content
				}
			}
		}
	}
`);

export const GET_COMMENTS_NOTIFICATIONS = gql(`
	query GetCommentsNotifications($paginationInput: PaginationInput) {
		getCommentsNotifications(paginationInput: $paginationInput) {
			id
			type
			createdAt
			story {
				id
				user {
					username
				}
			}
			initiator {
				id
				username
				displayName
				imageUrl
			}
			comment {
				content
				parentComment {
					content
					user {
						id
					}
				}
				parentReply {
					content
					user {
						id
					}
				}
			}
		}
	}
`);

export const GET_MENTIONS_NOTIFICATIONS = gql(`
	query GetMentionsNotifications($paginationInput: PaginationInput) {
		getMentionsNotifications(paginationInput: $paginationInput) {
			id
			type
			createdAt
			story {
				id
				description
				user {
					username
				}
			}
			initiator {
				id
				username
				displayName
				imageUrl
			}
			comment {
				content
			}
		}
	}
`);

export const GET_FOLLOWS_NOTIFICATIONS = gql(`
	query GetFollowsNotifications($paginationInput: PaginationInput) {
		getFollowsNotifications(paginationInput: $paginationInput) {
			id
			type
			createdAt
			initiator {
				id
				username
				displayName
				imageUrl
				isFollowing
			}
		}
	}
`);

export const GET_ALL_NOTIFICATIONS = gql(`
	query GetAllNotifications($paginationInput: PaginationInput) {
		getAllNotifications(paginationInput: $paginationInput) {
			... on LikeNotification {
				id
				type
				createdAt
				story {
					id
					user {
						username
					}
				}
				initiator {
					id
					username
					displayName
					imageUrl
				}
				like {
					comment {
						content
					}
				}
			}
			... on CommentNotification {
				id
				type
				createdAt
				story {
					id
					user {
						username
					}
				}
				initiator {
					id
					username
					displayName
					imageUrl
				}
				comment {
					content
					parentComment {
						content
						user {
							id
						}
					}
					parentReply {
						content
						user {
							id
						}
					}
				}
			}
			... on MentionNotification {
				id
				type
				createdAt
				story {
					id
					description
					user {
						username
					}
				}
				initiator {
					id
					username
					displayName
					imageUrl
				}
				comment {
					content
				}
			}
			... on FollowNotification {
				id
				type
				createdAt
				initiator {
					id
					username
					displayName
					imageUrl
					isFollowing
				}
			}
		}
	}
`);

export const GET_NEW_NOTIFICATIONS_COUNT = gql(`
	query GetNewNotificationsCount {
		getNewNotificationsCount
	}
`);
