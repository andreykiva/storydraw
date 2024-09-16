import { gql } from '@apollo/client';

export const NOTIFICATION_FIELDS = gql`
	fragment NotificationFields on Notification {
		id
		type
		createdAt
	}
`;

export const NOTIFICATION_USER_FIELDS = gql`
	fragment UserFields on User {
		id
		username
		displayName
		imageUrl
	}
`;

export const NOTIFICATION_STORY_FIELDS = gql`
	fragment StoryFields on Story {
		id
		user {
			username
		}
	}
`;
