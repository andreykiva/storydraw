/**
 * Enumeration of notification types for user activities.
 */
export enum NotificationType {
	/**
	 * Notification type for comments made on stories.
	 */
	COMMENT = 'comment',

	/**
	 * Notification type for likes received on stories or comments.
	 */
	LIKE = 'like',

	/**
	 * Notification type for mentions in comments or stories.
	 */
	MENTION = 'mention',

	/**
	 * Notification type for new followers.
	 */
	FOLLOW = 'follow',
}
