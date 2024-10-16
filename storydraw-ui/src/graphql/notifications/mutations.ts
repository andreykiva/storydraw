import { gql } from '@/__generated__/gql';

export const UPDATE_LAST_NOTIFICATIONS_VIEWED = gql(`
	mutation UpdateLastNotificationsViewed {
		updateLastNotificationsViewed {
			success
		}
	}
`);
