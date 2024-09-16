import { gql } from '@apollo/client';

export const UPDATE_LAST_NOTIFICATIONS_VIEWED = gql`
	mutation UpdateLastNotificationsViewed {
		updateLastNotificationsViewed {
			success
		}
	}
`;
