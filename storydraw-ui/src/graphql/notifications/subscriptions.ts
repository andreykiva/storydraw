import { gql } from '@/__generated__/gql';

export const NEW_NOTIFICATIONS_COUNT_SUBSCRIPTION = gql(`
	subscription NnewNotificationsCountSubscription {
		newNotificationsCountUpdated {
			count
		}
	}
`);
